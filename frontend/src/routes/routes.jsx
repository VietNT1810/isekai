import { useRoutes } from 'react-router-dom';

import DefaultLayout from '@/layouts/DefaultLayout';
import SpecialLayout from '@/layouts/SpecialLayout';
import ShopLayout from '@/layouts/ShopLayout/ShopLayout';
import AuthLayout from '@/layouts/AuthLayout';
import HomeLayout from '@/layouts/HomeLayout';

import Special from '@/pages/Special/Special';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import Profile from '@/pages/Profile';
import ChangePassword from '@/pages/ChangePassword';
import ProductPage from '@/pages/ProductPage';
import Cart from '@/pages/Cart';

// const publicRoute = [
//     { path: '/', component: Home, layout: HomeLayout },
//     { path: '/special', component: Special, layout: DefaultLayout },

//     //Shop
//     { path: '/shop', component: Shop, layout: ShopLayout },
//     { path: '/weapon', component: Shop, layout: ShopLayout },
//     { path: '/wig', component: Shop, layout: ShopLayout },
//     { path: '/outfit', component: Shop, layout: ShopLayout },
//     { path: '/lolita', component: Shop, layout: ShopLayout },
//     { path: '/accessory', component: Shop, layout: ShopLayout },

//     //Auth
//     { path: '/login', component: Login, layout: AuthLayout },
//     { path: '/login/identify', component: ForgotPassword, layout: AuthLayout },
//     { path: '/register', component: Register, layout: AuthLayout },

//     //User
//     { path: '/user/account/profile', component: Profile, layout: DefaultLayout },
//     { path: 'user/account/change-password', component: ChangePassword, layout: DefaultLayout },

//     //Product
//     { path: '/product/:slug', component: ProductPage, layout: DefaultLayout },
// ];

// export { publicRoute };

function Routes(props) {
    let element = useRoutes([
        {
            path: '/',
            element: <HomeLayout />,
            children: [{ path: '', element: <Home /> }],
        },
        {
            path: '/',
            element: <DefaultLayout />,
            children: [
                { path: 'special', element: <Special /> },
                { path: 'user/account/profile', element: <Profile /> },
                { path: 'user/account/change-password', element: <ChangePassword /> },
                { path: '/product/:slug', element: <ProductPage /> },
                { path: '/cart', element: <Cart /> },
            ],
        },
        {
            path: '/',
            element: <ShopLayout />,
            children: [
                { path: 'shop', element: <Shop /> },
                { path: 'weapon', element: <Shop /> },
                { path: 'wig', element: <Shop /> },
                { path: 'outfit', element: <Shop /> },
                { path: 'lolita', element: <Shop /> },
                { path: 'accessory', element: <Shop /> },
            ],
        },
        {
            path: '/',
            element: <AuthLayout />,
            children: [
                {
                    path: 'login',
                    element: <Login />,
                    children: [{ path: 'identify', element: <ForgotPassword /> }],
                },
                { path: 'register', element: <Register /> },
            ],
        },
        {
            path: '*',
            element: <p>Nothing here :(</p>,
        },
    ]);

    return element;
}

export default Routes;
