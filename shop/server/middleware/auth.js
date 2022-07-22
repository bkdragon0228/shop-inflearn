const { User } = require('../models/User');

// 인증 처리를 하는곳
let auth = (req, res, next) => {
    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies[`x_auth`];

    // 토큰을 복호화 한후 유저를 찾는다.
    // 유저가 있으며 인증 확인, 없으면 nope!
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true });

        // 유저를 찾은 경우
        req.token = token;
        req.user = user;
        next(); // 미들웨어 탈출
    });
};

module.exports = { auth };
