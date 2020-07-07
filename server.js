var express = require("express");
var app = express();
const path = require('path');
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
var config = require("./_helpers/config");
var cors = require("cors");
var port = process.env.PORT || 4100;
var url = config.database;
var jwt = require('./_helpers/jwt');

app.use(cors());
mongoose.connect(url, config.parser);

mongoose.connection.on('connected', () => { console.log("connected") })

mongoose.connection.on('error', (error) => { console.log(error) });
app.use(express.static(path.join(path.resolve(), 'public')));
app.use('/images', express.static('images'))

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(jwt());
app.get('/', function (req, res) {
    res.send("this is home page");
})
// app.get('*', function (req, res) {
//     res.sendFile(path.join(path.resolve(), 'public/index.html'))
// })
app.use('/users',  require('./routes/users'));
app.use('/newsfeed', require('./routes/newsfeed'))
app.use('/category', require('./routes/category'))
app.use('/suggestion', require('./routes/suggestion'))
app.use(function(err, req, res, next) {
  if(err.name === 'UnauthorizedError') {
    res.status(err.status).send({message:err.message});
    // res.error(err);
    return;
  }
next();
});
app.listen(port, () => console.log("started"));
