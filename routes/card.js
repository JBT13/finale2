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

module.exports = router;