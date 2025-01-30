import React from 'react';
import { X } from 'lucide-react';

// https://www.youtube.com/watch?v=Gy4G68WoHq4 (27.08.2024)

function Modal({ hData, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center w-screen h-screen">
            <div className="relative bg-amber-400 rounded-xl px-6 py-4 flex flex-col gap-5 items-center max-h-[90vh] w-full max-w-[90vw] overflow-hidden">
               
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white"
                    aria-label="Close modal"
                >
                    <X size={30} />
                </button>

              
                <div className="flex flex-col gap-5 w-full h-full overflow-auto">
                    <h1 className="text-2xl font-extrabold text-amber-800">History</h1>
                    <div className="w-full overflow-x-auto">
                        <table className="text-sm font-medium w-full border-collapse border border-amber-300">
                            <thead className="bg-amber-300 border border-amber-200 text-black">
                            <tr>
                                <th className="border border-amber-200 p-2">Item</th>
                                <th className="border border-amber-200 p-2">Version</th>
                                <th className="border border-amber-200 p-2">SN</th>
                            </tr>
                            </thead>
                            <tbody className="bg-amber-200 text-black">
                            {hData && hData.map(item => (
                                <tr key={item.serialNumber}>
                                    <td className="border border-amber-300 p-2 text-center">{item.itemDescription}</td>
                                    <td className="border border-amber-300 p-2 text-center">{item.machineCardVersion}</td>
                                    <td className="border border-amber-300 p-2 text-center">{item.serialNumber}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
