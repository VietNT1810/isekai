import moment from 'moment/moment';

export const hideEmail = (email) => {
    return email.replace(/(.{2})(.*)(?=@)/, function (gp1, gp2, gp3) {
        for (let i = 0; i < gp3.length; i++) {
            gp2 += '*';
        }
        return gp2;
    });
};

export const formatTime = (createdAt) => {
    const thisMoment = moment(createdAt).format('DD/MM/YYYY HH:mm');
    return thisMoment;
};

export const getOrderStatusTitle = (status) => {
    const statusTitle = {
        awaiting_payment: 'Chờ thanh toán',
        shipping: 'Đang vận chuyển',
        completed: 'Đã giao',
        canceled: 'Đã hủy',
    };
    return statusTitle[status] || '';
};