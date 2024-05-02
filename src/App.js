// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import FileInput from './components/FileInput';
import BarcodeReader from './components/BarcodeReader';
import Quagga from 'quagga';
import jsQR from 'jsqr';
// import useScanDetection from 'use-scan-detection';
// import jsQR from "jsqr";
// import Html5QrcodePlugin from './Html5QrcodePlugin'

function App() {
  // var imageURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAAEiAQMAAABncE31AAAABlBMVEX///8AAABVwtN+AAABA0lEQVRoge3ZUQ6CMAzG8SYcwCNx9R2JA5jU0a6ARKIP60z0/z0wZD+fmm1siBBCCPmfaMu93t/sEk8KKlv5jwrq3VT7jO4dqEy1lsT65mVS92vBUAOVKupbKmYm1DhljffpB/MXqp/aVmQfIuXNuo3qp46p4KIHlaFiTKzXRdrS4GszKlnJHCPBhkgF2z9RyWqvkNWlUdWrOqL6qZiP2kuoVWivGipT+cAosfsNOqHy1cm34txOuwBUhtKW2Hf52Zu8XLdRnVWxZtt3+duQ3gU1QD2d+kSFBDVUFX8ytZcj1Eh1OHMWQQ1Q1kSF2hb4ev5CdVTHFVl1/86FSleEEEJ+PQ/ANYzwx13NHQAAAABJRU5ErkJggg==";

  const [qrCode, setQRCode] = useState();
  const [text, setDecodedText] = useState();
  // const [result, setDecodedResult] = useState();
  const [barcode, setBarcode] = useState('');
  const [barcodeValue, setBarcodeValue] = useState('');
  const [result, setResult] = useState('');
  // const initializeQrcode = () => {
  //   const currentImage = new Image()
  //   currentImage.src = imageURI;
  //   currentImage.onload = async () => {
  //     const codeReader = new BrowserQRCodeReader();
  //     const result = await codeReader.decodeFromImageUrl(imageURI);
  //     console.log(result.getText());
  //   }
  //   return currentImage
  // }
  

  // // Quaqua only
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const imageUrl = event.target.result;
  //       decodeBarcode(imageUrl);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const decodeBarcode = (imageUrl) => {
  //   Quagga.decodeSingle({
  //     src: imageUrl,
  //     numOfWorkers: 0,
  //     inputStream: {
  //       size: 800,
  //     },
  //     decoder: {
  //       readers: [
  //         "code_128_reader"
  //       ],
  //     },
  //   }, (result) => {
  //     if (result && result.codeResult) {
  //       setBarcodeValue(result.codeResult.code);
  //     } else {
  //       setBarcodeValue('Unable to decode barcode');
  //     }
  //   });
  // };

  // const handleBarcodeScanned = (code) => {
  //   console.log(code, 'code')
  //   setBarcode(code);
  // };


  // const base64ImageToBlob = (str) => {
  //   // extract content type and base64 payload from original string
  //   var pos = str.indexOf(';base64,');
  //   var type = str.substring(5, pos);
  //   var b64 = str.substr(pos + 8);
  //   // decode base64
  //   var imageContent = atob(b64);
  //   // create an ArrayBuffer and a view (as unsigned 8-bit)
  //   var buffer = new ArrayBuffer(imageContent.length);
  //   var view = new Uint8Array(buffer);
  //   // fill the view, using the decoded base64
  //   for(var n = 0; n < imageContent.length; n++) {
  //     view[n] = imageContent.charCodeAt(n);
  //   }
  //   // convert ArrayBuffer to Blob
  //   var blob = new Blob([buffer], { type: type });
  //   return blob;
  // }

  // const getQRCode = (imageBase64) => { 
  //   var imageBlob = base64ImageToBlob(imageBase64);

  //   const html5QrCode = new Html5Qrcode('reader');
  //   const imageFile = imageBlob;

  //   html5QrCode.scanFile(imageFile, false)
  //   .then(qrCodeMessage => {
  //     setQRCode(qrCodeMessage);
  //   })
  //   .catch(err => {
  //     console.log(`Error scanning file. Reason: ${err}`)
  //   }); 
  // }

  // const onNewScanResult = (decodedText, decodedResult) => {
  //   // handle decoded results here
  //   console.log(decodedText, decodedResult)
  //   setDecodedText(decodedText, decodedText)
  //   setDecodedResult(decodedResult, decodedResult)
  // };

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
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
         {/* <Html5QrcodePlugin
              fps={10}
              qrbox={250}
              disableFlip={false}
              qrCodeSuccessCallback={onNewScanResult}
            />
            {text}{result} */}

        {/* <h1>Barcode Reader</h1>
          <FileInput onChange={handleFileUpload} />
            {barcode ? (
              <div>
                <h2>Scanned Barcode:</h2>
                <p>{barcode}</p>
              </div>
            ) : ( <BarcodeReader onBarcodeScanned={handleBarcodeScanned} /> )} */}

        {/* <h1>Barcode Reader</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {barcodeValue && (
          <div>
            <h2>Scanned Barcode:</h2>
            <p>{barcodeValue}</p>
          </div>
        )} */}

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
