const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose
    .connect(
        'mongodb+srv://bkdragon:kbk003178*@shopping.5cw7f.mongodb.net/?retryWrites=true&w=majority',
        { useNewUrlParser: true } // deprecation  경고를 없애기 위해
    )
    .then(() => console.lot('DB connected'))
    .catch((err) => console.err(err));

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(5000);
