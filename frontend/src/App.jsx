import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from '@/routes';
import { getUserCart } from './actions/cartAction';
import { getUserAddresses, getUserProfile } from './actions/userAction';
import ScrollToTop from './helpers/ScrollToTop';
import Alert from './components/Alert/Alert';

function App() {
    return (
        <Router>
            <ScrollToTop>
                <div className="App">
                    <Routes />
                    <Alert />
                </div>
            </ScrollToTop>
        </Router>
    );
}

export default App;
