import React, { useState } from 'react';
import Modal from './Modal';
import { History } from 'lucide-react';


const HistoryButton = ({ email }) => {
    const [historyData, setHistoryData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleClick = async () => {
        const getAuthToken = () => localStorage.getItem('auth_token');
        
        const encodedLogin = encodeURIComponent(email);

        
        //const backendHost = 'https://backend.liebherr.duckdns.org/';
        const backendHost = 'http://localhost:8080/';
        // const backendHost ='http://192.168.0.45:8080/';

        try {
            const response = await fetch(`${backendHost}machine-cards/changed-by/${encodedLogin}`, {
                'method': 'GET',
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const historyData = await response.json(); 
            setHistoryData(historyData);
            setShowModal(true);

            console.log("History Data:", historyData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="w-fit h-fit top-3.5 right-4">
            <button
                onClick={handleClick}
                className="fixed w-fit h-fit top-3.5 right-4"
            >
                <History className="w-12 h-12 bg-amber-400 rounded-xl p-1 border border-black"/>
            </button>
            {showModal && <Modal onClose={() => setShowModal(false)} hData={historyData}/>}
        </div>
    );
};

export default HistoryButton;
