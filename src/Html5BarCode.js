import './App.css';
import { Html5Qrcode } from "html5-qrcode";
import { useState } from "react";

function Html5BarCode() {
  const [barcode, setBarcode] = useState();

  const handleFileUpload = (event) => {
    const html5QrCode = new Html5Qrcode("reader", { fps: 10, qrbox: {width: 250, height: 250} },);
    // File based scanning
    if (event.target.files.length === 0) {
      // No file selected, ignore 
      return;
    }
    const imageFile = event.target.files[0];
    console.log(imageFile)
    // Scan QR Code
    html5QrCode.scanFile(imageFile, true).then(decodedText => {
      // success, use decodedText
      console.log(decodedText);
      setBarcode(decodedText);
    }).catch(err => {
      // failure, handle it.
      console.log(`Error scanning file. Reason: ${err}`)
    });
  }

  return (
    <div className="App">
      <div className='App-header'>
        <div id="reader" ></div>
        <input type="file" id="qr-input-file" accept="image/*" capture onChange={handleFileUpload}></input>
        Barcode: {barcode}
      </div>
    </div>
  );
}

export default Html5BarCode