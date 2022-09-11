export const hidePhone = (phone) => {
    let phoneString = phone.toString()
    return phoneString.replace(/.(?=..)/g, '*');
};
