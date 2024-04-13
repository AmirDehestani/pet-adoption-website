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

app.post('/giveaway', (req, res) => {
  const formData = req.body;

  fs.readFile(path.join(__dirname, 'pets.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading pets.json:', err);
      res.status(500).send('Error reading pets data');
      return;
    }

    try {
      const pets = JSON.parse(data);
      pets.push(formData); // Add the new data to the pets.json

      fs.writeFile(
        path.join(__dirname, 'pets.json'),
        JSON.stringify(pets, null, 2),
        (err) => {
          if (err) {
            console.error('Error writing to pets.json:', err);
            res.status(500).send('Error writing pets data');
            return;
          }
          console.log('New pet added successfully!');
          res.redirect('/pets'); // Redirect to the pets page
        }
      );
    } catch (error) {
      console.error('Error parsing pets data:', error);
      res.status(500).send('Error parsing pets data');
    }
  });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/privacy', (req, res) => {
  res.render('privacy');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
