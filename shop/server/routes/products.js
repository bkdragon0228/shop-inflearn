const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

// 디렉토리가 없을 경우 생성해주는 예외처리
// try {
//     fs.readdirSync('uploads');
// } catch (err) {
//     console.log('not exist directory');
//     fs.mkdirSync('uploads');
// }

router.get('/products_by_id/:id', (req, res) => {
    // 상품 id를 이용해서 같은 id를 가진 상품의 정보를 가져오자.

    let type = req.query.type;
    // let productId = req.query.id;
    let productId = req.params.id;

    console.log(type, productId);

    Product.find({ _id: productId })
        .populate('writer')
        .exec((err, productInfo) => {
            if (err) return res.status(400).send(err);

            return res.status(200).json({ success: true, productInfo });
        });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //저장위치
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage }).single('file');

router.post('/image', (req, res) => {
    // 가져온 이미지를 uploads에 저장
    // 멀터 메서드
    upload(req, res, function (err) {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({
            success: true,
            filePath: res.req.file.path, // 저장에 성공하면 파일 경로와 이름을 보내준다.
            fileName: res.req.file.filename,
        });
    });
});

router.post('/products', (req, res) => {
    // 문자열이여서 숫자로 바꿔주는 작업
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm;

    let findArgs = {};

    for (let key in req.body.filters) {
        // key는 category, continent나 price이다.
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                findArgs[key] = {
                    // mongoose 내장 기능
                    $gte: req.body.filters[key][0], // greater than equal
                    $lte: req.body.filters[key][1], // less than equal
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    // console.log(findArgs); //  { price: { '$gte': 300, '$lte': 349 }, continent: [ 5, 3 ] } 이런식~

    if (term) {
        Product.find(findArgs)
            .find({ $text: { $search: term } })
            .populate('writer')
            .skip(skip)
            .limit(limit)
            .exec((err, productsInfo) => {
                if (err) return res.status(400).json({ success: false, err });
                return res.status(200).json({
                    success: true,
                    productsInfo,
                    postSize: productsInfo.length,
                });
            });
    } else {
        Product.find(findArgs) // 객체식으로 넣으면 필터링,  { continent: [ 3 ], price : {뭐이상 뭐이하} } 이런식
            .populate('writer') // 타 컬렉션(모델)의 모든 정보를 가져온다.
            .skip(skip)
            .limit(limit)
            //  find, findOne, findById, findOneAndUpdate 들의 메서드의 리턴값은 유사 프로미스인데 exec로
            // 온전한 프로미스 반환값을 얻을 수 있다. 기능은 동일하나 사용할 것을 권장한다고 한다.
            .exec((err, productsInfo) => {
                if (err) return res.status(400).json({ success: false, err });

                return res.status(200).json({
                    success: true,
                    productsInfo,
                    postSize: productsInfo.length,
                });
            });
    }
});

router.post('/', (req, res) => {
    // 받아온 정보 db에 저장
    const product = new Product(req.body);
    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err });

        return res.status(200).json({ success: true }); // 이 json이 클라이언트에서 받은 res의 data안에 들어간다.
    });
});

module.exports = router;
