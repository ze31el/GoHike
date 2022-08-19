var express = require("express");
var app = express();
var path = require("path");
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require('cors');
require('dotenv').config();
require('./app_server/models/db');
var jwt = require('jsonwebtoken')
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/trail');
const apiUser = require('./app_api/routes/user');
const apiReview = require('./app_api/routes/review');
const apiGallery = require('./app_api/routes/gallery');
const apiSavedTrail = require('./app_api/routes/savedTrails');

// view engine setup
app.set('views', path.join(__dirname,'app_server', 'views'));
app.set('view engine', 'hbs');

app.use('/api',(req, res, next) =>{
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header('Access-Control-Allow-Origin','http://localhost:4200');
    res.header('Access-Control-Allow-Headers','*');
    next();
  });

  app.use('/apiUser',(req, res, next) =>{
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header('Access-Control-Allow-Origin','http://localhost:4200');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept, Authorization, Content-Length');
    // res.header('Content-Type', 'application/json');
    // res.header('Content-Length', '');
    res.header('Access-Control-Allow-Headers','*');
    next();
  });

  app.use('/apiGallery',(req, res, next) =>{
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header('Access-Control-Allow-Origin','http://localhost:4200');
    res.header('Access-Control-Allow-Headers','*');
    next();
  });

  app.use('/apiReview',(req, res, next) =>{
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header('Access-Control-Allow-Origin','http://localhost:4200');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept, Authorization, Content-Length');
    // res.header('Content-Type', 'application/json');
    // res.header('Content-Length', '');
    res.header('Access-Control-Allow-Headers','*');
    next();
  });

  app.use('/apiSavedTrail',(req, res, next) =>{
    res.setHeader("Access-Control-Allow-Methods", "DELETE,GET,HEAD,PATCH,OPTIONS,POST,PUT");
    res.header("Access-Control-Expose-Headers: Content-Length, X-JSON");
    res.header('Access-Control-Allow-Origin','http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept, Authorization, Content-Length');
    res.header('Access-Control-Max-Age: 86400');
    
    // res.header('Content-Type', 'application/json');
    // res.header('Content-Length', '');
    res.header('Access-Control-Allow-Headers','*');
    
    next();
  });

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/apiUser', apiUser);
app.use('/apiReview', apiReview);
app.use('/apiGallery', apiGallery);
app.use('/apiSavedTrail', apiSavedTrail);

app.use('/images', express.static(path.join('images')));
app.use('/trailImages', express.static(path.join('trailImages')));
// mongoose.connect('mongodb+srv://Zeel:Zeel1234@cluster0.3gfug.mongodb.net/gohike?retryWrites=true&w=majority', function(err){
//     if(err){
//         console.log("not connected to database", err);
//     }else{
//         console.log("successfully connected to MongoDB");
//     }
// });

app.listen(process.env.PORT || 3000, function(){
    console.log("Running the server on port 3000");
});



module.exports =app;
