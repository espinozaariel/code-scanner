import './App.css';
import React, { useState } from 'react';
import { BarcodeFormat, BrowserBarcodeReader } from '@zxing/library';

function BarcodeDecoder() {
  const [barcodeValue, setBarcodeValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    console.log(file, 'file')
    const reader = new FileReader();

    reader.onload = async () => {
      const imageDataUrl = reader.result;
        console.log(imageDataUrl, 'imagedataURL')
      try {
        const barcodeValue = await decodeBarcodeFromImage(imageDataUrl);
        setBarcodeValue(barcodeValue);
        setErrorMessage('');
      } catch (error) {
        console.error('Barcode decoding error:', error);
        setBarcodeValue('Barcode not detected');
        setErrorMessage('Barcode not detected');
      }
    };

    reader.readAsDataURL(file);
  };

  const decodeBarcodeFromImage = async (imageDataUrl) => {
    const codeReader = new BrowserBarcodeReader();
    const result = await codeReader.decodeFromImageUrl(imageDataUrl, undefined, BarcodeFormat.ALL);
    console.log(result, 'result')
    return result.text;
  };

  return (
    <div className='App'>
      <div className='App-header'>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        {barcodeValue && <p>Barcode Value: {barcodeValue}</p>}
        {errorMessage && <p>Error: {errorMessage}</p>}
      </div>
    </div>
  );
}

export default BarcodeDecoder;
