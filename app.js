var express = require('express');
var app = express();
var path = require('path');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.redirect('/index.html');
});

var PORT = 7777;
app.listen(PORT, function () {
    console.log('listening on', PORT);
});
