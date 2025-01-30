import React from 'react';
import PropTypes from 'prop-types';

function SerialNumberForm({
                              user,
                              scannerVisible,
                              serialNumber,
                              selectedItem,
                              handleButtonClick,
                              setSerialNumber,
                              handleSubmit,
                              displayVersion,
                          }) {
    return (
        <div className="flex flex-col justify-center text-center items-center w-screen h-screen gap-4">
            <img className="w-1/3" src="/img/pfp.png" alt="Profile Picture" />
            <div className="w-full font-semibold">Logged in user: {user}</div>

            {scannerVisible ? (
                <div className="scanner-container">
                    <div id="reader"></div>
                    <button
                        className="btn-close"
                        type="button"
                        onClick={handleButtonClick}
                    >
                        Close Scanner
                    </button>
                </div>
            ) : (
                <div className="flex flex-row gap-4 w-full justify-center">
                    <input
                        className="w-3/5 p-3 border-2 border-black rounded"
                        type="text"
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                    />
                    <button className="w-14 h-auto bg-amber-400 rounded" type="button" onClick={handleButtonClick}>
                        <img className="w-full h-full rounded" src="/img/qr-code.png" alt="Camera" />
                    </button>
                </div>
            )}

            <div className="selected-item-info mt-4">
                {selectedItem ? (
                    <div>
                        <h3>Selected Item:</h3>
                        <p><strong>Description:</strong> {selectedItem.itemDescription}</p>
                        <p><strong>Version:</strong> {displayVersion}</p>
                        <p><strong>Serial Number:</strong> {selectedItem.serialNumber}</p>
                        <p><strong>Product Serial No:</strong> {selectedItem.productSerialNo}</p>
                    </div>
                ) : (
                    <p>No item selected.</p>
                )}
            </div>

            <button
                className="w-4/5 p-3 bg-black text-amber-400 border-amber-400
                border-2 hover:bg-amber-400 hover:text-black hover:border-black rounded mt-4"
                type="button"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
}

SerialNumberForm.propTypes = {
    user: PropTypes.string.isRequired,
    scannerVisible: PropTypes.bool.isRequired,
    serialNumber: PropTypes.string.isRequired,
    selectedItem: PropTypes.object,
    handleButtonClick: PropTypes.func.isRequired,
    setSerialNumber: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    displayVersion: PropTypes.string.isRequired,
};

export default SerialNumberForm;
