import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from '@/routes';
import { getUserCart } from './actions/cartAction';
import { getUserAddresses, getUserProfile } from './actions/userAction';
import ScrollToTop from './helpers/ScrollToTop';

function App() {
    const { loading, userInfo, userToken } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userToken) {
            dispatch(getUserProfile())
                .unwrap()
                .then(async (res) => {
                    dispatch(getUserCart({ userId: res.user._id }));
                    dispatch(getUserAddresses(userToken));
                })
                .catch((error) => {
                    console.log('error', error);
                    localStorage.setItem('isLoggedIn', false);
                });
        }
    }, [userToken]);

    return (
        <Router>
            <ScrollToTop>
                <div className="App">
                    <Routes />
                </div>
            </ScrollToTop>
        </Router>
    );
}

export default App;
