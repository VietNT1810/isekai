export const hidePhone = (phone) => {
    let phoneString = phone.toString();
    return phoneString.replace(/.(?=..)/g, '*');
};

export const formatVND = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};
