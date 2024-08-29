const express = require('express');
const router = express.Router();
const { Motherboards } = require('../models');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({storage: storage});

router.post('/', async(req, res) => {
    const{name, model, memoryType, maxMemory,
             chipset, cpu, price} = req.body;
    const imageUrl = req.file ? req.file.path: null;
    console.log("Image URL after replace:", imageUrl);

    try{
        const newMotherboard = await Motherboards.create({
            name, model, memoryType, maxMemory, 
            chipset, cpu, price, imageUrl
        });
        res.json(newMotherboard);
    }catch(error){
        res.status(500).json({error: "Faild to create motherboard"});
    }
})

router.get('/', async(req, res) => {
    try{
        const motherboards = await Motherboards.findAll();
        res.json(motherboards);
    }catch(error){
        res.status(500).json({error: "Faild to fetch motherboards!"});
    }
})

module.exports = router;