const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 상품 스키마 db에 저장하기 위해서
const paymentSchema = mongoose.Schema(
    {
        user: {
            type: Array,
            default: [],
        },
        data: {
            type: Array,
            default: [],
        },
        product: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment };
