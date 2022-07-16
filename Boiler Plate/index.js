const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
const config = require('./config/key');

// application/x-www-form-urlencoded 타입
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입    : 각각을 분석
app.use(bodyParser.json());
// cookieParser, 사용하기 위한 과정
app.use(cookieParser());

const { user, User } = require('./models/User');

const mongoose = require('mongoose');
mongoose
    .connect(config.mongoURI, {})
    .then(() => console.log('DB connection'))
    .catch((err) => console.error(err));

app.get('/', (req, res) => {
    res.send('hello world hi hello');
});

app.post('/api/users/register', (req, res) => {
    // 회원 가입시 필요한 정보들을 client에서 가져오면
    // 그것들을 db에 넣어준다.

    const user = new User(req.body); // body안에 json으로 정보가 들어있음. body-parser의 역할

    // user에  모든 저장하고 실패와 성공의 처리를 구분
    // json으로 실패와 성공의 메세지를 보낸다.
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true });
    });
});

app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 db에서 찾는다.
    User.findOne({ email: req.body.email }, (err, userInfo) => {
        if (!userInfo) {
            return res.json({
                loginSuccess: false,
                message: '제공된 이메일에  해당하는 유저가 없습니다.',
            });
        }

        // 요청된 이메일이 db에 있다면 비밀번호가 맞는지 확인
        userInfo.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: '비밀번호가 틀렸습니다.',
                });

            // 비밀번호가  갖다면 토큰 생성
            userInfo.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                // 토큰을 저장해야한다. 쿠키, 로컬스토리지
                res.cookie(`x_auth`, user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});

app.get('/api/users/auth', auth, (req, res) => {
    // 미들웨어 통과 후의 작업, auth가 true
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        role: req.user.role,
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true,
        });
    });
});

app.listen(port, () => console.log('listen!'));
