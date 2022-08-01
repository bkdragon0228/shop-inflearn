const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
const config = require('./config/key');

app.use('/uploads', express.static('uploads')); // 정적인 파일 제공

// application/x-www-form-urlencoded 타입
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입    : 각각을 분석
app.use(bodyParser.json());
// cookieParser, 사용하기 위한 과정
app.use(cookieParser());

app.use('/api/product', require('./routes/products'));

const { User } = require('./models/User');
const { Product } = require('./models/Product');

const mongoose = require('mongoose');

mongoose
    .connect(config.mongoURI, {})
    .then(() => console.log('DB connection'))
    .catch((err) => console.error(err));

app.get('/', (req, res) => {
    res.send('hello world hi hello');
});

app.get('/api/hello', (req, res) => {
    res.send('안녕하세요~');
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
        cart: req.user.cart,
        history: req.user.history,
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

app.post('/api/users/addToCart', auth, (req, res) => {
    // 유저컬렉션의 해당 유저의 정보를 가져오기

    User.findOne({ _id: req.user._id }, (err, userInfo) => {
        // 카트에 상품이 이미 있는지 확인
        let dulpicate = false;
        userInfo.cart.forEach((item) => {
            if (item.id === req.body.productId) {
                dulpicate = true; // 상품이 들어있다.
            }
        });

        // 상품이 이미 있을 때.
        if (dulpicate) {
            User.findOneAndUpdate(
                { id: req.user._id, 'cart.id': req.body.productId },
                { $inc: { 'cart.$.quantity': 1 } },
                { new: true }, // 업데이트된 유저정보를 받기 위해서 넣어야하는 옵션
                (err, userInfo) => {
                    if (err)
                        return res.status(400).json({ success: false, err });
                    return res
                        .status(200)
                        .json({ success: true, cartInfo: userInfo.cart });
                }
            );
        } else {
            // 상품이 없을때, 새로 넣을 때 아이디, 개수, 날짜 정보 다 넣어줘야함.
            User.findOneAndUpdate(
                { id: req.user._id },
                {
                    $push: {
                        cart: {
                            id: req.body.productId,
                            quantity: 1,
                            date: Date.now(),
                        },
                    },
                },
                { new: true },
                (err, userInfo) => {
                    if (err)
                        return res.status(400).json({ success: false, err });
                    return res
                        .status(200)
                        .json({ success: true, cartInfo: userInfo.cart }); // 카드 정보만 보낸다.
                }
            );
        }
    });
});

app.post('/api/users/successBuy', auth, (req, res) => {
    // user 컬렉션 안에 history 필드안에  간단한 결제 정보 넣어주기
    // payment 컬렉션 안에 자세한 결제 정보 넣어주기
    // product 컬렉션 안에 sold 필드 정보 업데이트 시켜주기
});
app.get('/api/users/removeFromCart/:id', auth, (req, res) => {
    let productId = req.params.id;

    console.log(productId);

    // cart안에서 지우려는 상품을 지우기

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { cart: { id: productId } } }, // push <-> pull
        { new: true },
        (err, userInfo) => {
            // 현재 지운 건 user collection의 cart안에 요소
            // product collection에서 현재 남아있는 상품들의 정보와 cart에 남은 요소들로

            let cart = userInfo.cart;
            let Ids = cart.map((item) => {
                return item.id; // 남아있는 상품 아이디!
            });

            Product.find({ _id: { $in: Ids } })
                .populate('writer')
                .exec((err, productInfo) => {
                    // 새로운 cartDetail을 만들기 위해 같이 return 한다.
                    return res.status(200).json({ productInfo, cart });
                });
        }
    );
});

const port = 5000;
app.listen(port, () => console.log('listen!'));
