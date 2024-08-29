const express = require('express');
const router = express.Router();
const { PowerSupply } = require('../models');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){ 
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('imageUrl'), async(req, res) => {
    const {name, model, width, height, deep, certificate,
        price} = req.body;
    const imageUrl = req.file ? req.file.path: null;
    console.log("Image URL after replace:", imageUrl);
    try{
        const newPowerSupply = await PowerSupply.create({
            name, model, width, height, deep, certificate,
        price, imageUrl
        });
        res.json(newPowerSupply);
    }catch(error){
        res.status(500).json({error: "Faild to create power supply"});
    }
});

router.get('/', async(req, res) => {
    try{
        const powerSupply = await PowerSupply.findAll();
        res.json(powerSupply);
    }catch(error){
        res.status(500).json({error: "Faild to fetch power supply!"});
    }
})

module.exports = router;