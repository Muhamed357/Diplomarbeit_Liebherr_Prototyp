import { useEffect } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import '../../index.css';

const useScannerSetupAndConvertingTable = (scannerVisible, setProjectID, setSerialNumber, closeScanner) => {
  useEffect(() => {
    let scanner;

    if (scannerVisible) {
      const elementId = 'reader';
      const element = document.getElementById(elementId);

      if (element) {
        console.log('Initializing scanner...');

        scanner = new Html5QrcodeScanner(elementId, {
          
          fps: 10,
          formatsToSupport: [
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.CODE_39,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.DATA_MATRIX,
            Html5QrcodeSupportedFormats.QR_CODE,
            Html5QrcodeSupportedFormats.CODABAR,
            Html5QrcodeSupportedFormats.ITF,
          ],
          rememberLastUsedCamera: true,
          showImageSource: false,
          showZoomControls: false,
        });

        scanner.render(
            (result) => {
              console.log('Scan result:', result);
              if (result) {
                let projectID = '';
                let serialNumber = '';

                // Split by '|'
                let parts = result.split('|');
                if (parts.length > 1) {
                  projectID = parts[0];
                  serialNumber = parts[1];
                  console.log('Extracted Project ID (|):', projectID);
                  console.log('Extracted Serial Number (|):', serialNumber);
                } else {
                  // Attempt splitting by '_' if the previous split didn't work
                  parts = result.split('_');
                  if (parts.length > 2) {
                    projectID = parts[0];
                    serialNumber = parts[1+2];
                    console.log('Extracted Project ID (_):', projectID);
                    console.log('Extracted Serial Number (_):', serialNumber);
                  } else {
                    // Attempt splitting by ';' if the previous split didn't work
                    parts = result.split(';');
                    if (parts.length > 3) {
                      projectID = parts[4];
                      serialNumber = parts[2];
                      console.log('Extracted Project ID (;):', projectID);
                      console.log('Extracted Serial Number (;):', serialNumber);
                    } else {
                      console.log('No valid serial number or Project ID found');
                    }
                  }
                }

                if (setSerialNumber) {
                  setSerialNumber(serialNumber); // Set the extracted serial number
                }
                if (setProjectID) {
                  setProjectID(projectID); // Set the extracted project ID
                }
                sessionStorage.setItem('serialNumber', serialNumber); // Save serialNumber in sessionStorage
                closeScanner(); // Close the scanner automatically
                scanner.clear(); // Clear the scanner
              } else {
                console.warn('No text found in the scan result.');
                if (setSerialNumber) setSerialNumber(""); // Handle unexpected format
                if (setProjectID) setProjectID(""); // Handle unexpected format
                closeScanner(); // Close the scanner if no result is found
              }
            }
        );
      } else {
        console.error(`HTML Element with id="${elementId}" not found`);
      }
    }

    // Cleanup on effect cleanup
    return () => {
      if (scanner) {
        scanner.clear();
        scanner = null;
      }
    };
  }, [scannerVisible, setProjectID, setSerialNumber, closeScanner]);
};

export default useScannerSetupAndConvertingTable;
