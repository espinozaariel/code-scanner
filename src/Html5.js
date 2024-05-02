import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

function App() {

  useEffect(() => {
    const config = {
      fps: 10,
      qrbox: { width: 100, height: 100 },
      rememberLastUsedCamera: true,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_FILE]
    };
    const scanner = new Html5QrcodeScanner("reader", config, false);
    scanner.render();
    // cleanup function when component will unmount
    return () => {
      scanner.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code matched = ${decodedText}`, decodedResult);
    console.log(decodedText)
    console.log(decodedResult)
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    console.log(file, 'file')
    const reader = new FileReader();

    reader.onload = async () => {
      const imageDataUrl = reader.result;
      console.log(imageDataUrl, 'imagedataURL')
    };
    reader.readAsDataURL(file);

  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      <div id='reader'></div>
    </div>
  );
}

export default App;
