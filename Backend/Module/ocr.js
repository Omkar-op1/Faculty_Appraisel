const fs = require('fs').promises;
const generateText=require('./gemini')
const { createWorker } = require('tesseract.js');

async function performOCR(pdfPath) {
    try {
        // Create worker without deprecated methods
        const worker = await createWorker();
        
        const { data: { text } } = await worker.recognize(pdfPath);
        await worker.terminate();
        console.log('t',text,'y');
        return text;
    } catch (error) {
        console.error('OCR Error:', error);
        return null;
    }
}

  const extractedText = performOCR('dhatrak 002.jpg');
  console.log(generateText('Name: omkar dhatrak',extractedText))

  console.log(extractedText,'here');




