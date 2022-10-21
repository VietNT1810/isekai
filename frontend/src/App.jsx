import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from '@/routes';
import { getUserCart } from './actions/cartAction';
import { getUserProfile } from './actions/userAction';

function App() {
    const { loading, userInfo, userToken } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userToken) {
            dispatch(getUserProfile())
                .unwrap()
                .then((res) => {
                    dispatch(getUserCart({ userId: res.user._id }));
                })
                .catch((error) => {
                    console.log('error', error);
                });
        }
    }, [userToken]);

    return (
        <Router>
            <div className="App">
                <Routes />
            </div>
        </Router>
    );
}

export default App;
