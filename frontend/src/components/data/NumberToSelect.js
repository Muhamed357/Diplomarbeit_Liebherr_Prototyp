import React, { useState, useEffect } from "react";
import '../../index.css';

function NumberToSelect({ maxVersion, onChange, value }) {
    const [options, setOptions] = useState([]);
    const [newVersion, setNewVersion] = useState('');

    useEffect(() => {
        const maxVersionInt = parseInt(maxVersion, 10);
        const nextVersion = maxVersionInt + 1;

        if (!isNaN(maxVersionInt) && maxVersionInt > 0) {
          
            const newOptions = [...Array(maxVersionInt).keys()].map(i => i + 1);

            setNewVersion(nextVersion);

           
            setOptions([...newOptions, nextVersion]);

            
            if (!value || parseInt(value, 10) > nextVersion) {
                onChange(maxVersion.toString());
            }
        } else {
            setOptions([]);
            onChange('');
        }
    }, [maxVersion, value, onChange]);

    return (
        <select
            value={value || maxVersion.toString()}
            onChange={(e) => onChange(e.target.value)}
            className="border border-black text-black rounded block w-14 text-center dark:bg-amber-400 dark:border-black"
        >
            {options.map(option => (
                <option key={option} value={option}>
                    {option === newVersion ? "NEU" : option}
                </option>
            ))}
        </select>
    );
}

export default NumberToSelect;
