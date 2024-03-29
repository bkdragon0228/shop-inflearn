const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 상품 스키마 db에 저장하기 위해서
const productSchema = mongoose.Schema(
    {
        writer: {
            type: Schema.Types.ObjectId,
            ref: 'User', // 레퍼런스
        },
        title: {
            type: String,
            maxLength: 50,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            default: 0,
        },
        images: {
            type: Array,
            default: [],
        },
        sold: {
            type: Number,
            maxLength: 100,
            default: 0,
        },
        continent: {
            type: Number,
            default: 1,
        },
        views: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// 검색에 중요도를 얼마나 둘지, title에 5배더
productSchema.index(
    {
        title: 'text',
        description: 'text',
    },
    {
        weights: {
            title: 5,
            description: 1, // default
        },
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
