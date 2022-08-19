import React from 'react';

import Header from '../components/Header';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <>{children}</>
        </>
    );
}

export default DefaultLayout;
