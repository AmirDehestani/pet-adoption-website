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
  res.render('home', { session: req.session.user });
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

      res.render('pets', { pets: pets, session: req.session.user });
    } catch (error) {
      console.error('Error parsing pets data:', error);
      res.status(500).send('Error parsing pets data');
    }
  });
});

app.get('/find', (req, res) => {
  res.render('find', { session: req.session.user });
});

app.post('/find', (req, res) => {
  const formData = req.body;

  fs.readFile(path.join(__dirname, 'pets.txt'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading pets.txt:', err);
      res.status(500).send('Error reading pets data');
      return;
    }

    try {
      const lines = data.trim().split('\n');
      const filteredPets = lines.filter((line) => {
        const [
          index, // We won't need this
          user, // We won't need this
          name, // We won't need this
          type,
          breed,
          age,
          gender,
          dogsCompatibility,
          catsCompatibility,
          childrenCompatibility,
        ] = line.split(':');
        if (formData.type && formData.type !== type) return false;
        if (
          formData.breed &&
          formData.breed !== 'any' &&
          formData.breed !== breed
        )
          return false;
        if (formData.age && formData.age !== 'any' && formData.age !== age)
          return false;
        if (
          formData.gender &&
          formData.gender !== 'any' &&
          formData.gender !== gender
        )
          return false;
        if (formData.compatibility) {
          if (
            formData.compatibility.includes('other_dogs') &&
            dogsCompatibility !== 'Yes'
          )
            return false;
          if (
            formData.compatibility.includes('other_cats') &&
            catsCompatibility !== 'Yes'
          )
            return false;
          if (
            formData.compatibility.includes('children') &&
            childrenCompatibility !== 'Yes'
          )
            return false;
        }
        return true;
      });

      // Construct an array of pet objects from the filtered lines
      const pets = filteredPets.map((line) => {
        const [
          index,
          user,
          name,
          type,
          breed,
          age,
          gender,
          dogCompatibility,
          catCompatibility,
          childrenCompatibility,
          image,
          comments,
          ownerGivenName,
          ownerSurname,
          ownerEmail,
        ] = line.split(':');
        return {
          index,
          user,
          name,
          type,
          breed,
          age,
          gender,
          image,
          dogCompatibility,
          catCompatibility,
          childrenCompatibility,
          comments,
          ownerGivenName,
          ownerSurname,
          ownerEmail,
        };
      });

      res.render('pets', { pets: pets, session: req.session.user });
    } catch (error) {
      console.error('Error parsing pets data:', error);
      res.status(500).send('Error parsing pets data');
    }
  });
});

app.get('/dogcare', (req, res) => {
  res.render('dogcare', { session: req.session.user });
});

app.get('/catcare', (req, res) => {
  res.render('catcare', { session: req.session.user });
});

app.get('/giveaway', (req, res) => {
  if (req.session.user) {
    res.render('giveaway', { session: req.session.user });
  } else {
    res.redirect('/login');
  }
});

app.post('/giveaway', (req, res) => {
  const formData = req.body;
  const compatibility = formData.compatibility || []; // To avoid the error when compatibility array is empty
  const petData = `${getNextIndex()}:${req.session.user}:${formData.name}:${
    formData.type
  }:${formData.breed}:${formData.age}:${formData.gender}:${
    compatibility.includes('dogs') ? 'Yes' : 'No'
  }:${compatibility.includes('cats') ? 'Yes' : 'No'}:${
    compatibility.includes('children') ? 'Yes' : 'No'
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
  res.render('contact', { session: req.session.user });
});

app.get('/privacy', (req, res) => {
  res.render('privacy', { session: req.session.user });
});

app.get('/signup', (req, res) => {
  res.render('signup', { message: null, session: req.session.user });
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
      messageClass = 'failure-message';
      res.render('signup', {
        message: message,
        messageClass: messageClass,
        session: req.session.user,
      });
      return;
    }

    const newUserEntry = `${user}:${pass}\n`;
    fs.appendFile('login.txt', newUserEntry, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      message = 'Account successfully created. You can now log in.';
      messageClass = 'success-message';
      res.render('signup', {
        message: message,
        messageClass: messageClass,
        session: req.session.user,
      });
    });
  });
});

app.get('/login', (req, res) => {
  res.render('login', { message: null, session: req.session.user });
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
        res.render('login', {
          message: `Welcome back ${user}`,
          messageClass: 'success-message',
          session: req.session.user,
        });
      } else {
        res.render('login', {
          message: 'Incorrect password',
          messageClass: 'failure-message',
          session: req.session.user,
        });
      }
    } else {
      message = `User ${user} not found.`;
      messageClass = 'failure-message';
      res.render('login', {
        message: message,
        messageClass: messageClass,
        session: req.session.user,
      });
    }
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

const PORT = 5085;
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
