const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/')
});


router.post('/', (req, res) => {
    const sorts = ["hearts", "spades", "clubs", "diamonds"];
    const number = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const deck = [];
    for (let i = 0; i < sorts.length; i++) {
        for (let j = 0; j < number.length; j++) {
            deck.push(`${number[j]}of${sorts[i]}`);
        }
    }

    const random = Math.floor(Math.random() * 52)
    const card = deck.splice(random, 1)
    
    const numberOneTo52 = Math.floor(Math.random() * 52) + 1;

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
        res.render('card', { title: 'Home', numberOneTo52, card});
    } else {
        res.redirect('/');
    }
});



module.exports = router;