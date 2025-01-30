import React, { useEffect, useState } from 'react';
import useScannerSetupAndConvertingTable from './UseScannerSetupAndConvertingTable';
import SerialNumberForm from './SerialNumberForm';
import '../../index.css';



const getAuthToken = () => localStorage.getItem('auth_token');


const createRecord = (selectedItem, serialNumber) => ({
    id: selectedItem.id,
    itemId: selectedItem.itemId,
    companyId: selectedItem.companyId || '',
    productSerialNo: selectedItem.productSerialNo,
    machineCardVersion: selectedItem.machineCardVersion || '',
    component: selectedItem.component || '',
    itemDescription: selectedItem.itemDescription,
    itemClassificationId: selectedItem.itemClassificationId || '',
    assemblyGroup: selectedItem.assemblyGroup || '',
    assemblyGroupDescription: selectedItem.assemblyGroupDescription || '',
    zbq: selectedItem.zbq || '',
    position: selectedItem.position || '',
    sequenceNumber: selectedItem.sequenceNumber || '',
    serialNumber: serialNumber,
    zar: selectedItem.zar || '',
    quantity: selectedItem.quantity || '',
    entryDate: selectedItem.entryDate ? new Date(selectedItem.entryDate) : new Date(),
    replacementDate: selectedItem.replacementDate ? new Date(selectedItem.replacementDate) : new Date(),
    etSheet: selectedItem.etSheet || '',
    isLmb: selectedItem.isLmb || '',
    changedBy: selectedItem.changedBy || '',
});

export default function SerialNumberPage({ user, selectedItem, onSuccessfulSubmit }) {
    const [scannerVisible, setScannerVisible] = useState(false);
    const [serialNumber, setSerialNumber] = useState('');

  
    useScannerSetupAndConvertingTable(scannerVisible, null, setSerialNumber, () => setScannerVisible(false));

    useEffect(() => {
        const storedSerialNumber = sessionStorage.getItem('serialNumber');
        if (storedSerialNumber) {
            setSerialNumber(storedSerialNumber);
        }
    }, []);


    const handleSubmit = async () => {
        const record = createRecord(selectedItem, serialNumber);

        try {
            const projectNumber = record.productSerialNo;
            const version = record.machineCardVersion;
            const itemId = record.itemId.trim();
            const inputSerialNumber = record.serialNumber;
            const id = record.id;

            const formattedVersion = version.toString().padStart(3, '0');
            //const backendHost = 'https://backend.liebherr.duckdns.org/';
            const backendHost = 'http://localhost:8080/';
            // const backendHost ='http://192.168.0.45:8080/';

            const response = await fetch(`${backendHost}machine-cards/project-number/${projectNumber}/version/${formattedVersion}/item-id/${itemId}/serial-number/${inputSerialNumber}/id/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(record),
            });

            if (response.ok) {
                alert('Submission successful!');
                if (onSuccessfulSubmit(projectNumber)) {
                    onSuccessfulSubmit(projectNumber);
                }
            } else {
                console.error('Submission failed:', response.statusText);
                alert('Submission failed.');
            }
        } catch (error) {
            console.error('Error processing the serial number:', error);
            alert('Error processing the serial number.');
        }
    };

   
    const handleButtonClick = () => {
        setScannerVisible(!scannerVisible);
    };

    return (
        <SerialNumberForm
            user={user}
            scannerVisible={scannerVisible}
            serialNumber={serialNumber}
            selectedItem={selectedItem}
            handleButtonClick={handleButtonClick}
            setSerialNumber={setSerialNumber}
            handleSubmit={handleSubmit}
            displayVersion={selectedItem ? selectedItem.machineCardVersion : ''}
        />
    );
}
