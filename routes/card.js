const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/')
});


router.post('/', (req, res) => {
    const file = fs.readFileSync('./json/data.json');
    const data = JSON.parse(file);
    let login = false;
    for(let i = 0; i < data.length; i += 1) {
        if (req.body.username == data[i].username && 
            req.body.password == data[i].password) {
            req.session.username = req.body.username;
            req.session.isLoggedIn = true;
            login = true;
            console.log(`${data[i].username} has logged in`.green);
        }
    }
    if (login) {
        res.render('card', { title: 'Home' });
    } else {
        res.redirect('/');
    }
});

const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const values = [
    { name: 'Ace', value: 1 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
    { name: '4', value: 4 },
    { name: '5', value: 5 },
    { name: '6', value: 6 },
    { name: '7', value: 7 },
    { name: '8', value: 8 },
    { name: '9', value: 9 },
    { name: '10', value: 10 },
    { name: 'Jack', value: 11 },
    { name: 'Queen', value: 12 },
    { name: 'King', value: 13 },
  ];

  const deck = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push({
        suit: suit,
        name: value.name,
        value: value.value,
      });
    }
  }

  res.render('index', { deck });
});

module.exports = router;