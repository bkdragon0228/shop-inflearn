const mongoose = require('mongoose');

// 스키마
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    // 관리잦와 일번 유저를 구분하기 위해!
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    // 토큰 유효기간
    tokenExp: {
        type: Number,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
