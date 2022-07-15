const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');

const uri =
    'mongodb+srv://bkdragon:kbk003178@shopping.5cw7f.mongodb.net/?retryWrites=true&w=majority';

mongoose
    .connect(uri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    })
    .then(() => console.log('DB connection'))
    .catch((err) => console.error(err));

app.get('/', (req, res) => {
    res.send('hello world hi');
});

app.listen(port, () => console.log('listen'));
