import React from 'react';
import PropTypes from 'prop-types';

function DataSelectTable({ relevantData, selectedId, handleCheckboxChange }) {
    return (
        <div className="static inset-0 w-screen justify-center items-center">
            <div className="relative bg-amber-400 px-2 py-2 flex flex-col items-center max-h-[50vh] w-full max-w-screen">
                <h2 className="text-xl font-bold bg-amber-400">Select Data</h2>
                <div className="w-full overflow-x-auto">
                    <table className="text-sm font-medium w-full border-collapse border border-amber-300">
                <thead className="bg-amber-300 border border-amber-200 text-black">
                <tr>
                    <th className="border border-amber-200 p-2">Select</th>
                    <th className="border border-amber-200 p-2">Item</th>
                    <th className="border border-amber-200 p-2">Version</th>
                    <th className="border border-amber-200 p-2">SN</th>
                </tr>
                </thead>
                <tbody className="bg-amber-200 text-black">
                {relevantData.map(item => (
                    <tr
                        key={item.id}
                        className={`cursor-pointer ${item.id === selectedId ? 'bg-blue-100' : ''}`}
                    >
                        <td className="border border-gray-300 p-2">
                            <input
                                type="checkbox"
                                checked={item.id === selectedId}
                                onChange={() => handleCheckboxChange(item)}
                            />
                        </td>
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
    );
}

DataSelectTable.propTypes = {
    relevantData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        itemDescription: PropTypes.string,
        machineCardVersion: PropTypes.string,
        itemId: PropTypes.string,
        serialNumber: PropTypes.string,
        productSerialNo: PropTypes.string,
    })).isRequired,
    selectedId: PropTypes.number,
    handleCheckboxChange: PropTypes.func.isRequired,
};

export default DataSelectTable;
 