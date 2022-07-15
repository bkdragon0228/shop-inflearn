const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

// application/x-www-form-urlencoded 타입
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입    : 각각을 분석
app.use(bodyParser.json());

const { user, User } = require('./models/User');

const mongoose = require('mongoose');
mongoose
    .connect(
        'mongodb+srv://bkdragon:kbk003178@shopping.5cw7f.mongodb.net/?retryWrites=true&w=majority',
        {}
    )
    .then(() => console.log('DB connection'))
    .catch((err) => console.error(err));

app.get('/', (req, res) => {
    res.send('hello world hi hello');
});

app.post('/register', (req, res) => {
    // 회원 가입시 필요한 정보들을 client에서 가져오면
    // 그것들을 db에 넣어준다.

    const user = new User(req.body); // body안에 json으로 정보가 들어있음. body-parser의 역할

    // user에 저장하고 실패와 성공의 처리를 구분
    // json으로 실패와 성공의 메세지를 보낸다.
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true });
    });
});

app.listen(port, () => console.log('listen!'));
