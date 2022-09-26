import React from 'react';

function TextIcon({ text, icon }) {
    return (
        <div
            className="text-icon"
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <span>{text}</span>
            {icon}
        </div>
    );
}

export default TextIcon;
