import { ChromeReaderMode, Key, Person, Place, Star } from '@mui/icons-material';

import TextIcon from '@/components/TextIcon';
import { formatVND } from '@/helpers/number';
import assets from '@/assets';

export const PRICE_MARKS = [
    { value: 100000, label: formatVND(100000) },
    { value: 1000000, label: formatVND(1000000) },
];

export const RATING_MARKS = [
    { value: 0, label: 'Tất cả' },
    { value: 1, label: <TextIcon text="1" icon={<Star />} /> },
    { value: 2, label: <TextIcon text="2" icon={<Star />} /> },
    { value: 3, label: <TextIcon text="3" icon={<Star />} /> },
    { value: 4, label: <TextIcon text="4" icon={<Star />} /> },
    { value: 5, label: <TextIcon text="5" icon={<Star />} /> },
];

export const PROFILE_NAV = [
    { to: 'profile', icon: <Person fontSize="large" color="action" />, title: 'Thông tin tài khoản' },
    { to: 'order', icon: <ChromeReaderMode fontSize="large" color="action" />, title: 'Quản lý đơn hàng' },
    { to: 'address', icon: <Place fontSize="large" color="action" />, title: 'Sổ địa chỉ' },
    { to: 'change-password', icon: <Key fontSize="large" color="action" />, title: 'Thay đổi mật khẩu' },
];

export const PAYMENT_METHOD = [
    { value: 'cod', title: 'Thanh toán tiền mặt khi nhận hàng', icon: assets.icons.iconPaymentCod },
    { value: 'credit', title: 'Thanh toán bằng thẻ quốc tế Visa, Master, JCB', icon: assets.icons.iconPaymentCredit },
    { value: 'momo', title: 'Thanh toán bằng ví MoMo', icon: assets.icons.iconPaymentMomo },
    { value: 'zalo-pay', title: 'Thanh toán bằng ví ZaloPay', icon: assets.icons.iconPaymentZalo },
    { value: 'atm', title: 'Thẻ ATM nội địa/Internet Banking (Hỗ trợ Internet Banking)', icon: assets.icons.iconPaymentAtm },
];
