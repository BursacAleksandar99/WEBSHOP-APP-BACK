const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3001;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'partizan123',
    database: 'mynewshopapp'
});

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    
});

module.exports = db;