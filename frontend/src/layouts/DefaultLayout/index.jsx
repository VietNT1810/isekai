import React from 'react';

import Header from '../components/Header';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div>{children}</div>
        </>
    );
}

export default DefaultLayout;
