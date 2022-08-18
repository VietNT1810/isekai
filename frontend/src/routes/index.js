import DefaultLayout from '@/layouts/DefaultLayout';
import SpecialLayout from '@/layouts/SpecialLayout';
import ShopLayout from '@/layouts/ShopLayout';

import Special from '@/pages/Special';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';

const publicRoute = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/shop', component: Shop, layout: ShopLayout },
    { path: '/special', component: Special, layout: SpecialLayout },
];

export { publicRoute }