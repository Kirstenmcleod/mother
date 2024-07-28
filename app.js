const serverless      = require("serverless-http");
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const locations = require('./ajax/locations')

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
    return res.status(404).json({
      error: "Not Found",
    });
});
  
module.exports.handler = serverless(app);
