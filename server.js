const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static('dist'));
app.use('/api/v1', auth);


const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!\n`);
});