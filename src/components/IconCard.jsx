import React from 'react';

const IconCard = ({ letter, className = '' }) => {
    return (
        <div
            className={`w-16 h-16 z-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 flex items-center justify-center shadow-lg transition-transform duration-300 ${className}`}
        >
            <span className="text-white text-3xl font-bold">
                {letter}
            </span>
        </div>
    );
};

export default IconCard;
