const serverless    = require("serverless-http");
const express       = require('express')
const app           = express()
const path          = require('path')
const locations     = require('./ajax/locations');
const secrets       = require('./lib/secrets');

// Developer environment settings
require('dotenv').config();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,`/public/index.html`));
})

app.get('/ajax/locations', locations.get);



app.use('/public',express.static(path.join(__dirname, 'public'),{
    dotfiles: "ignore",
    etag: true,
    index: false,
    maxAge: "365d",
    immutable:true
}));

app.use('/images',express.static(path.join(__dirname, 'images'),{
    dotfiles: "ignore",
    etag: true,
    index: false,
    maxAge: "365d",
    immutable:true
}));


app.use(async function(req,res,next) { 
    console.log('Not Found',req.protocol)     // "https"
    console.log('Not Found',req.hostname)     // "example.com"
    console.log('Not Found',req.path)         // "/creatures"
    console.log('Not Found',req.originalUrl)  // "/creatures?filter=sharks"
    console.log('Not Found',req.subdomains)   // "['ocean']"
    return res.status(404).json({
      error: "Not Found",
    });
});
  
module.exports.handler = serverless(app);
