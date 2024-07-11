const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  res.send('Hello, world!');
});


app.listen(process.env.PORT || 5500);