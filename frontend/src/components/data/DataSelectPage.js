import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DataSelectTable from './DataSelectTable';

const extractRelevantData = (data) => {
    return Array.isArray(data) ? data.map(item => ({
        id: item.id,
        itemDescription: item.itemDescription,
        machineCardVersion: item.machineCardVersion,
        itemId: item.itemId,
        serialNumber: item.serialNumber,
        productSerialNo: item.productSerialNo,
    })) : [{
        id: data.id,
        itemDescription: data.itemDescription,
        machineCardVersion: data.machineCardVersion,
        itemId: data.itemId,
        serialNumber: data.serialNumber,
        productSerialNo: data.productSerialNo,
    }];
};

function DataSelectPage({ user, data, onSubmit }) {
    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const relevantData = extractRelevantData(data);

    const handleCheckboxChange = (item) => {
        setSelectedId(prev => {
            if (prev === item.id) {
                setSelectedItem(null);
                return null;
            } else {
                setSelectedItem(item);
                return item.id;
            }
        });
    };

    const handleSubmit = () => {
        if (selectedItem) {
            onSubmit(selectedItem);
        } else {
            alert('Please select an item.');
        }
    };

    return (
        <div className="flex flex-col justify-center text-center items-center w-screen h-screen gap-4">
            <img className="w-1/3" src="/img/pfp.png" alt="Profile Picture" />
            <div className="w-full font-semibold">{user}</div>

            {relevantData.length > 0 && (
                <DataSelectTable
                    relevantData={relevantData}
                    selectedId={selectedId}
                    handleCheckboxChange={handleCheckboxChange}
                />
            )}

            <button
                className="w-4/5 p-3 bg-black text-amber-400 border-amber-400 border-2 hover:bg-amber-400 hover:text-black hover:border-black rounded mt-4"
                type="button"
                onClick={handleSubmit}
                disabled={!selectedItem}
            >
                Submit
            </button>
        </div>
    );
}

DataSelectPage.propTypes = {
    user: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            itemDescription: PropTypes.string,
            machineCardVersion: PropTypes.string,
            itemId: PropTypes.string,
            serialNumber: PropTypes.string,
            productSerialNo: PropTypes.string,
        })),
        PropTypes.object,
    ]).isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default DataSelectPage;
