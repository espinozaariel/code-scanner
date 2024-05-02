import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';

const BarcodeReader = ({ onBarcodeScanned }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "ImageStream",
        target: videoRef.current
      },
      decoder: {
        readers: ["ean_reader"]
      }
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      onBarcodeScanned(data.codeResult.code);
      Quagga.stop();
    });

    return () => {
      Quagga.stop();
    };
  }, [onBarcodeScanned]);

  return <div ref={videoRef}></div>;
};

export default BarcodeReader;