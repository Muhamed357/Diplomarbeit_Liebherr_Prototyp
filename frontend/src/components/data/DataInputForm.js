import React from "react";
import NumberToSelect from './NumberToSelect';
import BackButton from "../common/BackButton";
import { and } from "ajv/dist/compile/codegen";


function InputDataForm({
                           user,
                           projectNumber,
                           version,
                           maxVersion,
                           itemNumber,
                           scannerVisible,
                           loading,
                           error,
                           data,
                           handleProjectNumberChange,
                           handleItemNumberChange,
                           handleVersionChange,
                           handleButtonClick,
                           setItemNumber,
                           fetchMachineCardData
                       }) {
    return (
        <div className="flex flex-col justify-center text-center items-center w-screen h-screen gap-4">
            <img className="w-1/3" src="/img/pfp.png" alt="Profile Picture" />
            <div className="w-full font-semibold">Logged in user: {user}</div>

            <div className="flex flex-row gap-4 w-full justify-center">
                <input
                    className="w-3/5 p-3 border-2 border-black rounded"
                    type="text"
                    placeholder="Enter Project Number"
                    value={projectNumber}
                    onChange={handleProjectNumberChange}
                />
            
                
                <NumberToSelect
                    maxVersion={maxVersion}
                    value={version}
                    onChange={handleVersionChange}
                />
            </div>

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
                        className="w-3/5 p-3 border-2 gap-4 border-black rounded"
                        type="text"
                        placeholder="Enter Item ID"
                        value={itemNumber}
                        onChange={handleItemNumberChange}
                    />

                    <button
                        className="w-14 h-auto bg-amber-400 rounded"
                        type="button"
                        onClick={handleButtonClick}
                    >
                        <img className="w-full h-full rounded" src="/img/qr-code.png" alt="Camera"/>
                    </button>
                </div>
            )}

            <button
                className="w-4/5 p-3 bg-black text-amber-400 border-amber-400 border-2 hover:bg-amber-400 hover:text-black hover:border-black rounded"
                type="button"
                onClick={fetchMachineCardData}
            >
                Submit
            </button>

            {loading && <p className="text-blue-500">Loading...</p>}
            {error && <p className="text-red-500">Error: {error.message}</p>}
            {data && (
                <pre className="p-4 bg-gray-100 border border-gray-300 rounded">
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </div>
    );
}

export default InputDataForm;
