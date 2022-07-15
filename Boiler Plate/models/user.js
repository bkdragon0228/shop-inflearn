const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

// register route에서 save하기 전에!
userSchema.pre('save', function (next) {
    var user = this; // userSchema

    // password가 변횐될때만 암호화
    if (user.isModified('password')) {
        // salt 만들기
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err); // salt 만들기 실패 next는 바로 register route save로 감.

            // 암호화
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err); // 해쉬 실패

                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
