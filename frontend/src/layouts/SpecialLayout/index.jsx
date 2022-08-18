import React from 'react';

import Header from '../components/Header';

function SpecialLayout({ children }) {
    return (
        <>
            <Header />
            <div className="banner">
                <img src={banner} alt="Error image" />
            </div>
            <div className="content">{children}</div>
        </>
    );
}

export default SpecialLayout;
