const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');

const app = express();

app.use(
  session({
    secret: '*)^a@^n2c$sg99n-1ir-x(-&tak75$u01d(fa&t#t7ub9v=-',
    resave: false,
    saveUninitialized: true,
  })
);
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
  if (req.session.user) {
    res.render('giveaway');
  } else {
    res.redirect('/login');
  }
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
          res.redirect('/pets');
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
  res.render('signup', { message: null });
});

app.post('/signup', (req, res) => {
  const { user, pass } = req.body;
  let message = '';

  fs.readFile('login.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    const existingUsernames = data
      .split('\n')
      .map((line) => line.split(':')[0]);

    if (existingUsernames.includes(user)) {
      message = `Username ${user} already exists. Please choose a different username.`;
      res.render('signup', { message: message });
    }

    const newUserEntry = `${user}:${pass}\n`;
    fs.appendFile('login.txt', newUserEntry, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      message = 'Account successfully created. You can now log in.';
      res.render('signup', { message: message });
    });
  });
});

app.get('/login', (req, res) => {
  res.render('login', { message: null });
});

app.post('/login', (req, res) => {
  const { user, pass } = req.body;
  let message = '';

  fs.readFile('login.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    const existingUsernames = data
      .split('\n')
      .map((line) => line.split(':')[0]);

    if (existingUsernames.includes(user)) {
      userIndex = existingUsernames.indexOf(user);

      const selectedUserPassword = data
        .split('\n')
        .map((line) => line.split(':')[1])[userIndex];

      if (pass === selectedUserPassword) {
        req.session.user = user;
        res.render('login', { message: `Welcome back ${user}` });
      } else {
        res.render('login', { message: 'Incorrect password' });
      }
    } else {
      message = `User ${user} not found.`;
      res.render('login', { message: message });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
