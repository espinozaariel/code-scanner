import { Html5QrcodeScanner } from 'html5-qrcode';
import { useState, useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

const createConfig = () => {
  return {
    fps: 10,
    qrbox: 250,
    disableFlip: false,
  };
};

const Html5QrcodeJs = () => {
  const [fps, setFps] = useState(10);
  const [qrbox, setQrbox] = useState(250);
  const [disableFlip, setDisableFlip] = useState(false);
  const [decodedBarCode, setDecodedBarCode] = useState();

  const config = createConfig(); 

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config);

    html5QrcodeScanner.render((decodedText, decodedResult) => {
      setDecodedBarCode('');
      setDecodedBarCode(decodedText);
    });

    return () => {
      html5QrcodeScanner.clear().catch(error => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return (
    <>
      <div id={qrcodeRegionId} />
      <div>
        Decoded barcode is {decodedBarCode}
      </div>
    </>
  );
};

export default Html5QrcodeJs;