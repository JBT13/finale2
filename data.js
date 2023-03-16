const fs = require('fs');
const file = fs.readFileSync('./json/data.json');
const data = JSON.parse(file);