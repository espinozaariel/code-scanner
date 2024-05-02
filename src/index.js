import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import App from './Html5QrcodeJs'; // Working with hand icon
// import App from './ZXingWithQR'; // Not Working - Barcode not detected
// import App from './ZXingWorkingBugBarCode'; // Working on second attempt
// import App from './Html5qrcode'; // Working with hand icon
// import App from './JsQRQuagga'; //Not Working
// import App from './Html5'; // Working no permission for camera - need to decode
import App from './Html'; //Working - custom with decode
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
