const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/')
});


router.post('/', (req, res) => {
    const sorts = ["hearts", "spades", "clubs", "diamonds"];
    const number = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
    const deck = [];
    for (let i = 0; i < sorts.length; i++) {
        for (let j = 0; j < number.length; j++) {
            deck.push(`${number[j]}of${sorts[i]}`);
        }
    }

    if(!req.session.deck){
        req.session.deck = deck;
    };
    
    const random = Math.floor(Math.random() * 52)
    const card = []

    for (let i = 0; i < 4; i++) {
        const random = Math.floor(Math.random() * 52)
        card.push(req.session.deck.splice(random, 1))
    }




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
        res.render('card', { title: 'Home', card, tempDeck: req.session.deck});
    } else {
        res.redirect('/');
    }
});



module.exports = router;