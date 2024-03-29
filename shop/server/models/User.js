const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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
    // 장바구니를 만들기위해 유저 컬렉션에 추가!
    cart: {
        type: Array,
        default: [],
    },
    history: {
        type: Array,
        default: [],
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

userSchema.methods.comparePassword = function (plainPassword, callback) {
    // plainPassword : 암호화 되지 않은 비밀번호

    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

userSchema.methods.generateToken = function (callback) {
    // jsonwebtoken 이용해서 token 생성
    let user = this;

    let token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save(function (err, user) {
        if (err) return callback(err);
        callback(null, user); // 토큰이 저장된 유저를 반환
    });
};

userSchema.statics.findByToken = function (token, callback) {
    let user = this;

    // 토큰을 디코드
    jwt.verify(token, 'secretToken', function (err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음
        // 클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인

        user.findOne({ _id: decoded, token: token }, function (err, user) {
            if (err) return callback(err);
            callback(null, user);
        });
    });
};
const User = mongoose.model('User', userSchema);

module.exports = { User };
