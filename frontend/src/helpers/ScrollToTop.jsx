import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop({ children }) {
    const { pathname } = useLocation();

    useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            behavior: 'instant',
        });
    }, [pathname]);

    return <>{children}</>;
}

export default ScrollToTop;
