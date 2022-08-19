import React from 'react';
import { render } from 'react-dom';

import App from './App';
import GlobalStyles from '@/components/GlobalStyles';

const rootElement = document.getElementById('root');
render(
    <React.StrictMode>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </React.StrictMode>,
    rootElement,
);
