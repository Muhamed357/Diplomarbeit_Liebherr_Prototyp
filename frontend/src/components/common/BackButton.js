import React from "react";
import '../../index.css';
import { LogOut, CircleArrowLeft } from 'lucide-react';

function BackButton({ onBack, onLogout, componentToShow }) {

    const BackButton = (
        <CircleArrowLeft className="w-12 h-12 bg-amber-400 rounded-xl p-1 border border-black" />
    );

    const SignOut = (
        <LogOut className="w-12 h-12 bg-amber-400 rounded-xl p-1 border border-black" />
    );

    const isMachineCards = componentToShow === "machineCards";
    const buttonText = isMachineCards ? SignOut : BackButton;
    const handleClick = isMachineCards ? onLogout : onBack;

    return (
        <button
            onClick={handleClick}
            type="button"
            className="fixed w-max h-max top-3.5 left-4"
        >
            {buttonText}
        </button>
    );
}

export default BackButton;
