const express = require('express')
const app = express()
const port = 3000
const path = require ('path')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,`/public/index.html`));
})

app.use('/public',express.static(path.join(__dirname, 'public'),{
    dotfiles: "ignore",
    etag: true,
    index: false,
    maxAge: "365d",
    immutable:true
  }));

  app.use('/images',express.static(path.join(__dirname, 'public'),{
    dotfiles: "ignore",
    etag: true,
    index: false,
    maxAge: "365d",
    immutable:true
  }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})