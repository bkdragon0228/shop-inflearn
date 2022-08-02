const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/key');

// application/x-www-form-urlencoded 타입
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입    : 각각을 분석
app.use(bodyParser.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/products'));

app.use('/uploads', express.static('uploads')); // 정적인 파일 제공

const mongoose = require('mongoose');

mongoose
    .connect(config.mongoURI, {})
    .then(() => console.log('DB connection'))
    .catch((err) => console.error(err));

app.get('/', (req, res) => {
    res.send('hello world hi hello');
});

const port = 5000;
app.listen(port, () => console.log('listen!'));
