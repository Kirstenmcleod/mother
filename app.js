const serverless    = require("serverless-http");
const express       = require('express');
let compression       = require('compression');
var cookieSession     = require('cookie-session');
const cookieParser    = require('cookie-parser');
const bodyParser      = require('body-parser');
const app           = express();
const fs            = require("fs");
const path          = require('path');
const locations     = require('./ajax/locations');
const secrets       = require('./lib/secrets');

// Developer environment settings
require('dotenv').config();

// Configure Express
app.use(cookieParser());
app.disable('x-powered-by');
app.enable('trust proxy');
app.set('trust proxy', 10);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.raw({type: 'application/jwt'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
    secret: 'aedc75f7-90b9-47ad-a5d4-2b10d62a9d85',
    name: '_jb',
    keys: ["main"],
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: 30 * 60 * 1000
}));

const promisify = require('util').promisify;
const readdirp = promisify(fs.readdir);
const statp = promisify(fs.stat);

app.use(async function(req, res, next) {
    console.log('__dirname',__dirname)
    console.log(`app - ${req.method} - ${req.url}`);
    await secrets.init();
    next();
});



app.get(['/','/index.html','/index'], (req, res) => {
    res.sendFile('./public/index.html');
});

app.get('/ajax/locations', locations.get);

app.use('/public',express.static(path.join(__dirname, 'public'),{
    dotfiles: "ignore",
    etag: true,
    index: false,
    maxAge: "365d",
    immutable:true
}));

app.use(async function(req,res,next) { 
    console.log('Not Found',req.originalUrl)
    return res.status(404).json({
      error: "Not Found",
    });
});
  
module.exports.handler = serverless(app);
