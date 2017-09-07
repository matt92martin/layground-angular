const path = require('path');

let prod = {
    inject: false,
    template: path.resolve(__dirname, '../templates/index.ejs'),
    title: '',
    baseHref: '/',
    meta: [
        {
            name: 'description',
            content: 'A better default template for html-webpack-plugin.'
        }
    ],
    lang: 'en-US',
    chunksSortMode: function (a, b) {  //alphabetical order
        if (a.names[0] > b.names[0]) {
            return 1;
        }
        if (a.names[0] < b.names[0]) {
            return -1;
        }
        return 0;
    }
};

let dev = Object.assign({}, prod, {
    devServer: 'http://localhost:3001',
});


module.exports = {
    dev: dev,
    prod: prod
};