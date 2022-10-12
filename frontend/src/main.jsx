import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';

import App from './App';
import GlobalStyles from '@/components/GlobalStyles';
import store from '@/redux/store';

const THEME = createTheme({
    typography: {
        fontFamily: `SVN Gotham Regular`,
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
    },
    palette: {
        primary: {
            main: '#04c4d9',
            light: '#E3F9FB',
        },
        secondary: {
            light: '#31C6D4',
            main: 'white',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

const rootElement = document.getElementById('root');
render(
    <React.StrictMode>
        <ThemeProvider theme={THEME}>
            <Provider store={store}>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    rootElement,
);
