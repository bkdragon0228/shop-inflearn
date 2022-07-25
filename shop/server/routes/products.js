const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage }).single('file');

router.post('/', (req, res) => {
    // 받아온 정보 db에 저장
    const product = new Product(req.body);
    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err });

        return res.status(200).json({ success: true }); // 이 json이 클라이언트에서 받은 res의 data안에 들어간다.
    });
});

router.post('/image', (req, res) => {
    // 가져온 이미지를 저장

    upload(req, res, function (err) {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({
            success: true,
            filePath: res.req.file.path,
            fileName: res.req.file.filename,
        });
    });
});

router.post('/products', (req, res) => {
    // 문자열이여서 숫자로 바꿔주는 작업
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    Product.find()
        .populate('writer')
        .skip(skip)
        .limit(limit)
        .exec((err, productsInfo) => {
            if (err) return res.status(400).json({ success: false, err });

            return res.status(200).json({ success: true, productsInfo });
        });
});

module.exports = router;
