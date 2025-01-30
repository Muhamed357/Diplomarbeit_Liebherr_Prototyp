import React, { useEffect } from 'react';
import '../../index.css';

function WelcomePage({ onAnimationEnd }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onAnimationEnd) onAnimationEnd();
        }, 1200); // Passenden Zeitwert verwenden
        return () => clearTimeout(timer); // Timer bei unmount löschen
    }, [onAnimationEnd]);

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <section>
                <strong>
                    <h1 className="slide-in-top">LIEBHERR</h1>
                </strong>
            </section>
        </div>
    );
}

export default WelcomePage;
