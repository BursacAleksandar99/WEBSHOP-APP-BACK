const express = require('express');
// const mysql = require('mysql2');
const app = express();
const port = 3001;
const cors = require('cors');
const db = require('./models');
const processorsRoute = require('./routes/Processors');
const graphicsCardRoute = require('./routes/GraphicsCards');
const motherboardRoute = require('./routes/Motherboards');
const ssdRoute = require('./routes/Ssd');
const ramRoute = require('./routes/Ram');
const powerSupplyRoute = require('./routes/PowerSupply');
const path = require('path');


// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'partizan123',
//     database: 'mynewshopapp'
// });

// app.get('/', (req, res) => {
//     res.send("Hello World");
// });

app.use(cors({
    origin: 'http://localhost:3000',
    methods: [ 'GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

app.use('/users', require('./routes/Users'));

app.use('/processors', processorsRoute);

app.use('/graphicsCards', graphicsCardRoute);

app.use('/motherboards', motherboardRoute);

app.use('/ssd', ssdRoute);

app.use('/ram', ramRoute);

app.use('/powersupply', powerSupplyRoute);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
    
// });

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});


module.exports = db;