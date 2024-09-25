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
const { Sequelize } = require('sequelize');



app.use(cors({
    origin: ['http://localhost:3000', 'https://bursacitshop-front.vercel.app/'],
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



db.sequelize.authenticate()
  .then(() => {
    console.log('Success connecting to database.');
    
    // Sinhronizacija modela i pokretanje servera
    db.sequelize.sync().then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }).catch(err => {
        console.error('Error synchronizing model with base:', err);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = db;