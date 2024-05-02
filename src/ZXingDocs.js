import './App.css';
import React, { useState, useEffect } from 'react';
import { MultiFormatReader, BarcodeFormat } from '@zxing/library';

function App() {



	useEffect(() => {  
		const hints = new Map();
		const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.DATA_MATRIX/*, ...*/];
		hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
	
		const reader = new MultiFormatReader();
	
		const luminanceSource = new RGBLuminanceSource(imgByteArray, imgWidth, imgHeight);
		const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));
	
		reader.decode(binaryBitmap, hints);
	}, []);

}

export default App;