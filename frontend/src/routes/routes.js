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
    { path: '/shop', component: Shop, layout: ShopLayout },
    { path: '/special', component: Special, layout: DefaultLayout },
    { path: '/login', component: Login, layout: AuthLayout },
    { path: '/login/identify', component: ForgotPassword, layout: AuthLayout },
    { path: '/register', component: Register, layout: AuthLayout },
];

export { publicRoute };
