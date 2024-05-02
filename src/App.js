// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Quagga from 'quagga';
import jsQR from 'jsqr';

function App() {

  const [result, setResult] = useState('');

  // Quaqua and jsqr
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file, 'file')
    if (file) {
      const reader = new FileReader();
      console.log(reader, 'reader')
      reader.onload = (event) => {
        console.log(event, 'event')
        const imageUrl = event.target.result;
        decodeBarcodeQRCode(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const decodeBarcodeQRCode = (imageUrl) => {
    console.log(imageUrl)
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);
      const imageData = context.getImageData(0, 0, image.width, image.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        setResult(code.data);
      } else {
        Quagga.decodeSingle({
          src: imageUrl,
          numOfWorkers: 0,
          inputStream: {
            size: 800,
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
            ],
          },
        }, (result) => {
          if (result && result.codeResult) {
            setResult(result.codeResult.code);
          } else {
            setResult('Unable to decode barcode or QR code');
          }
        });
      }
    };
    image.src = imageUrl;
  };



  return (
    <div className="App">
      <header className="App-header">
      <h1>Barcode and QR Code Reader</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {result && (
        <div>
          <h2>Scanned Code:</h2>
          <p>{result}</p>
        </div>
      )}
      </header>
    </div>
  );
}

export default App;
