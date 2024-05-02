import './App.css';
import { useState, useEffect } from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin'



const App = (props) => {
  const [decodedBarCode, setDecodedBarCode] = useState();

  const onNewScanResult = (decodedText, decodedResult) => {
    setDecodedBarCode('');
    setDecodedBarCode(decodedText);
  };

  return (
    <div className="App">
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />

      <div>
        Decoded barcode is {decodedBarCode}
      </div>
    </div>
  );
};

export default App;
