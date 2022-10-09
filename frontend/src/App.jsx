import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Routes from '@/routes';
import DefaultLayout from '@/layouts/DefaultLayout';
import { getUserProfile } from './actions/userAction';
import { getUserCart } from './actions/cartAction';

function App() {
    const { loading, userInfo, userToken } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userToken) {
            dispatch(getUserProfile())
                .unwrap()
                .then((res) => {
                    console.log('reload user:', res);
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
                <Routes>
                    {/* {publicRoute.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })} */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
