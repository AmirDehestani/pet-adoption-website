const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/pets', (req, res) => {
  fs.readFile(path.join(__dirname, 'pets.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading pets.json:', err);
      res.status(500).send('Error reading pets data');
      return;
    }

    try {
      const pets = JSON.parse(data);
      res.render('pets', { pets: pets });
    } catch (error) {
      console.error('Error parsing pets data:', error);
      res.status(500).send('Error parsing pets data');
    }
  });
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
