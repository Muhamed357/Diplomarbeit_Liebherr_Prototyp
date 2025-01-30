import React, { useEffect, useState } from 'react';
import InputDataForm from './DataInputForm';
import useScannerSetupAndConvertingTable from '../SerialNumberTools/UseScannerSetupAndConvertingTable';
import '../../index.css';


function InputDataPage({ user, handleNext, projectNumber: initialProjectNumber, itemNumber: initialItemNumber }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [projectNumber, setProjectNumber] = useState(initialProjectNumber || ''); 
    const [itemNumber, setItemNumber] = useState(initialItemNumber || ''); 
    const [version, setVersion] = useState('');
    const [maxVersion, setMaxVersion] = useState('');
    const [scannerVisible, setScannerVisible] = useState(false);
    const [projectID, setProjectID] = useState('');
    const [realNewVersion, setRealNewVersion] = useState('');
    const [serialNumber, setSerialNumber] = useState('');

    useScannerSetupAndConvertingTable(scannerVisible, setProjectID, setSerialNumber, () => setScannerVisible(false));

    const getAuthToken = () => localStorage.getItem('auth_token');
    //const backendHost = 'https://backend.liebherr.duckdns.org/';
    const backendHost = 'http://localhost:8080/';
    //const backendHost ='http://192.168.0.45:8080/';

    useEffect(() => {
        if (projectNumber.trim() && itemNumber.trim()) {
            fetch(`${backendHost}machine-cards/project-number/${projectNumber}/item-id/${itemNumber}/highest-version`, {
                'method': 'GET',
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`,
                    'Content-Type': 'application/json',
                },
            }
        )
         
                .then(res => res.json())
                .then(data => {
                    const versionStr = typeof data === 'string' ? data : data.toString();
                    setMaxVersion(versionStr);
                    setSerialNumber(data.serialNumber); 
                })
                .catch(error => {
                    console.error('Error fetching version:', error);
                    console.log(data); 
                });
        }
        
    }, [projectNumber, itemNumber]);

    useEffect(() => {
        if (projectID) {
            setItemNumber(projectID);
        }
    }, [projectID]);

    useEffect(() => {
        if (serialNumber) {
            sessionStorage.setItem('serialNumber', serialNumber); 
        }
    }, [serialNumber]);

    useEffect(() => {
        setProjectNumber(initialProjectNumber || ''); 
        setItemNumber(initialItemNumber || ''); 
    }, [initialProjectNumber, initialItemNumber]);

    const fetchMachineCardData = () => {
        if (!projectNumber.trim() || !itemNumber.trim() || !version.trim()) {
            setError(new Error('Please enter a valid project number, item ID, and version.'));
            return;
        }

        const maxVersionInt = parseInt(maxVersion, 10);
        const versionInt = parseInt(version, 10);
        const newVersion = versionInt > maxVersionInt;
        const realNewVersionValue = newVersion ? versionInt.toString() : '';

        setRealNewVersion(realNewVersionValue);

        const finalVersion = versionInt > maxVersionInt ? maxVersionInt : versionInt;
        const formattedVersion = finalVersion.toString().padStart(3, '0');

        setLoading(true);
        setError(null);

       fetch(`${backendHost}machine-cards/project-number/${projectNumber}/version/${formattedVersion}/item-id/${itemNumber}`, {
            'method': 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                
                console.log('Old data:', data);

                
                if (realNewVersionValue) {
                    data = data.map(card => ({
                        ...card,
                        machineCardVersion: realNewVersionValue.toString().padStart(3, '0'),
                    }));
                }

                
                console.log('Updated data:', data);

                setData(data);
                handleNext(data, realNewVersionValue);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <InputDataForm
                user={user}
                projectNumber={projectNumber}
                version={version}
                maxVersion={maxVersion}
                itemNumber={itemNumber}
                scannerVisible={scannerVisible}
                loading={loading}
                error={error}
                data={data}
                handleProjectNumberChange={(event) => setProjectNumber(event.target.value)}
                handleItemNumberChange={(event) => setItemNumber(event.target.value)}
                handleVersionChange={setVersion}
                handleButtonClick={() => setScannerVisible(prev => !prev)}
                setItemNumber={setItemNumber}
                fetchMachineCardData={fetchMachineCardData}
            />
        </div>
    );
}

export default InputDataPage;
