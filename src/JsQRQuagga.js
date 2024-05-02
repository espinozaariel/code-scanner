import React, { useState } from 'react';
import jsQR from 'jsqr';
import Quagga from 'quagga';

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
        context.drawImage(imageData, 0, 0, imageData.width, imageData.height);

        // Decode QR code
        const qrCode = jsQR(context.getImageData(0, 0, imageData.width, imageData.height).data, imageData.width, imageData.height);
        if (qrCode) {
          setQRCodeValue(qrCode.data);
        }

        console.log(reader.result, 'reader result')

        // Decode barcode
        Quagga.decodeSingle({
          src: reader.result,
          numOfWorkers: 0,
          locate: true,
          inputStream: {
            size: 800 // restrict input-size to be considered to reduce CPU load
          },
          decoder: {
            readers: [
              'code_128_reader',
              'ean_reader',
              'ean_8_reader',
              'code_39_reader',
              'code_39_vin_reader',
              'codabar_reader',
              'upc_reader',
              'upc_e_reader',
              'i2of5_reader',
              '2of5_reader',
              'code_93_reader',
            ] // specify barcode format if known, otherwise use 'ean_reader'
          },
          locator: {
            patchSize: 'medium',
            halfSample: true
          },
          locate: true
        }, (result) => {
          console.log(result, 'result')
          if (result && result.codeResult) {
            setBarcodeValue(result.codeResult.code);
          }
        });
      };
      imageData.src = reader.result;
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      {qrCodeValue && <p>QR Code Value: {qrCodeValue}</p>}
      {barcodeValue && <p>Barcode Value: {barcodeValue}</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
      <div id='reader'></div>
    </div>
  );
}

export default App;
