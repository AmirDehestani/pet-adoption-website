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
  fs.readFile(path.join(__dirname, 'pets.txt'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading pets.txt:', err);
      res.status(500).send('Error reading pets data');
      return;
    }

    try {
      // Split the data by lines
      const lines = data.split('\n');

      // Parse each line and create pet objects
      const pets = lines.map((line) => {
        const fields = line.split(':');
        return {
          index: fields[0],
          ownerUsername: fields[1],
          name: fields[2],
          type: fields[3],
          breed: fields[4],
          age: fields[5],
          gender: fields[6],
          dogCompatibility: fields[7],
          catCompatibility: fields[8],
          childrenCompatibility: fields[9],
          image: fields[10],
          comments: fields[11],
          ownerName: fields[12],
          ownerSurname: fields[13],
          ownerEmail: fields[14],
        };
      });

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
  const petData = `${getNextIndex()}:${req.session.user}:${formData.name}:${
    formData.type
  }:${formData.breed}:${formData.age}:${formData.gender}:${
    formData.compatibility.includes('dogs') ? 'Yes' : 'No'
  }:${formData.compatibility.includes('cats') ? 'Yes' : 'No'}:${
    formData.compatibility.includes('children') ? 'Yes' : 'No'
  }:${formData.comments || ''}:${formData['owner-given-name']}:${
    formData['owner-surname']
  }:${formData['owner-email']}\n`;

  fs.appendFile(path.join(__dirname, 'pets.txt'), petData, (err) => {
    if (err) {
      console.error('Error writing to pets.txt:', err);
      res.status(500).send('Error writing pets data');
      return;
    }
    console.log('New pet added successfully!');
    res.redirect('/pets');
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

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

function getNextIndex() {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'pets.txt'), 'utf8');
    const lines = data.trim().split('\n');
    return lines.length + 1;
  } catch (err) {
    return 1;
  }
}
