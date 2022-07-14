const express = require('express');
const app = express();
const mongoose = require('mongoose');

const uri =
    'mongodb+srv://bkdragon:kbk003178*@shopping.5cw7f.mongodb.net/shopping';

mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connection'))
    .catch((err) => console.error(err));
app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(5000);
