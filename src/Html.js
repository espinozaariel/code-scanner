import './App.css';

// To use Html5QrcodeScanner (more info below)
import { Html5QrcodeScanner } from "html5-qrcode";

// To use Html5Qrcode (more info below)
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";

function App() {

    const [barcode, setBarcode] = useState();

    useEffect(() => {
        function onScanSuccess(decodedText, decodedResult) {
            // handle the scanned code as you like, for example:
            console.log(`Code matched = ${decodedText}`, decodedResult);
        }
        
        function onScanFailure(error) {
            // handle scan failure, usually better to ignore and keep scanning.
            // for example:
            console.warn(`Code scan error = ${error}`);
        }
    
        let html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: {width: 250, height: 250} },
            /* verbose= */ false);
        // html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    })

    const handleFileUpload = (event) => {
        const html5QrCode = new Html5Qrcode("reader");
        // File based scanning
        if (event.target.files.length == 0) {
            // No file selected, ignore 
            return;
        }
        const imageFile = event.target.files[0];
        console.log(imageFile)
        
        // Scan QR Code
        html5QrCode.scanFile(imageFile, true)
            .then(decodedText => {
                // success, use decodedText
                console.log(decodedText);
                setBarcode(decodedText);
            })
            .catch(err => {
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

export default App