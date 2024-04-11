const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/pets', (req, res) => {
  res.render('pets');
});

app.get('/find', (req, res) => {
  res.render('find');
});

app.get('/dogcare', (req, res) => {
  res.render('dogcare');
});

app.get('/catcare', (req, res) => {
  res.render('catcare');
});

app.get('/giveaway', (req, res) => {
  res.render('giveaway');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/privacy', (req, res) => {
  res.render('privacy');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
