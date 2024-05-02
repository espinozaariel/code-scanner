import './App.css';
import React, { useState } from 'react';
import jsQR from 'jsqr';
import { BrowserBarcodeReader } from '@zxing/library';

function App() {
  const [qrCodeValue, setQRCodeValue] = useState('');
  const [barcodeValue, setBarcodeValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageData = new Image();
      imageData.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        context.drawImage(imageData, 0, 0);

        const imageDataUrl = canvas.toDataURL('image/png');
        
        // Decode QR code
        const qrCode = jsQR(context.getImageData(0, 0, imageData.width, imageData.height).data, imageData.width, imageData.height);
        if (qrCode) {
          setQRCodeValue(qrCode.data);
        }

        // Decode barcode
        const codeReader = new BrowserBarcodeReader();
        codeReader
          .decodeFromImageUrl(imageDataUrl)
          .then((result) => {
            setBarcodeValue(result.text);
            setErrorMessage('');
          })
          .catch((error) => {
            console.error('Barcode decoding error:', error);
            setBarcodeValue('Barcode not detected');
            setErrorMessage('Barcode not detected');
          });
      };
      imageData.src = reader.result;
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className='App'>
      <div className='App-header'>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        {qrCodeValue && <p>QR Code Value: {qrCodeValue}</p>}
        {barcodeValue && <p>Barcode Value: {barcodeValue}</p>}
        {errorMessage && <p>Error: {errorMessage}</p>}
      </div>
    </div>
  );
}

export default App;
