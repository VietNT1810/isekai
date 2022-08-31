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

const publicRoute = [
    { path: '/', component: Home, layout: HomeLayout },
    { path: '/special', component: Special, layout: DefaultLayout },

    //Shop
    { path: '/shop', component: Shop, layout: ShopLayout },
    { path: '/weapon', component: Shop, layout: ShopLayout },
    { path: '/wig', component: Shop, layout: ShopLayout },
    { path: '/outfit', component: Shop, layout: ShopLayout },
    { path: '/lolita', component: Shop, layout: ShopLayout }, 
    { path: '/accessory', component: Shop, layout: ShopLayout },  

    //Auth
    { path: '/login', component: Login, layout: AuthLayout },
    { path: '/login/identify', component: ForgotPassword, layout: AuthLayout },
    { path: '/register', component: Register, layout: AuthLayout },
];

export { publicRoute };
