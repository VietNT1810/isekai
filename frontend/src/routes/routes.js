import DefaultLayout from '@/layouts/DefaultLayout';
import SpecialLayout from '@/layouts/SpecialLayout';
import ShopLayout from '@/layouts/ShopLayout/ShopLayout';
import AuthLayout from '@/layouts/AuthLayout';

import Special from '@/pages/Special';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

const publicRoute = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/shop', component: Shop, layout: ShopLayout },
    { path: '/special', component: Special, layout: SpecialLayout },
    { path: '/login', component: Login, layout: AuthLayout },
    { path: '/register', component: Register, layout: AuthLayout },
];

export { publicRoute };
