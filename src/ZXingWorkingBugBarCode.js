import './App.css';
import React, { useState } from 'react';
import { BarcodeFormat, BrowserBarcodeReader } from '@zxing/library';

function BarcodeDecoder() {
  const [barcodeValue, setBarcodeValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const imageDataUrl = reader.result;
      const imageUrl = event.target.result;
      console.log(reader.result, 'readerresult')
      console.log(event.target.result, 'eventtarget')
      try {
        const barcodeValue = await decodeBarcodeFromImage(imageDataUrl);
        const otherValue = await decodeBarcodeFromImage(imageUrl);
        setErrorMessage('');
        setBarcodeValue('')
      } catch (error) {
      }
    };

    reader.readAsDataURL(file);
  };

  const decodeBarcodeFromImage = async (imageDataUrl) => {
    const codeReader = new BrowserBarcodeReader();
    const result = await codeReader.decodeFromImageUrl(imageDataUrl, undefined, BarcodeFormat.ALL);
    setBarcodeValue(result.text)
    return result.text;
  };

  return (
    <div className='App'>
      <div className='App-header'>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        <p>Barcode Value: {barcodeValue}</p>
        {errorMessage && <p>Error: {errorMessage}</p>}
      </div>
    </div>
  );
}

export default BarcodeDecoder;
