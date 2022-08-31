import React from 'react';
import { render } from 'react-dom';

import App from './App';
import GlobalStyles from '@/components/GlobalStyles';
import store from '@/redux/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');
render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </Provider>
    </React.StrictMode>,
    rootElement,
);
