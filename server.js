const express = require('express')
const mongoose = require('mongoose')
const ShortURL = require('./models/shortURL')
const shortId = require('shortid')

const app = express()

mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const shortURL = await ShortURL.find()
  res.render('index', { shortURLs: shortURL })
})

app.post('/shortURLs', async (req, res) => {
  await ShortURL.create({ full: req.body.fullURL })

  res.redirect('/')
})

app.get('/:shortURL', async (req, res) => {
  const shortURL = await ShortURL.findOne({ short: req.params.shortURL })
  if (shortURL == null) return res.sendStatus(404)

  shortURL.clicks++
  shortURL.save()

  res.redirect(shortURL.full)
})

app.listen(process.env.PORT || 5500);