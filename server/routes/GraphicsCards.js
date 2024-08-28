const express = require('express');
const router = express.Router();
const { GraphicsCards } = require('../models');
const multer = require('multer');
const path = require('path');
const { error } = require('console');

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
    const {name, model, memorySize, 
        memoryType, boostClock, baseClock, tdp, price, } = req.body;
    const imageUrl = req.file ? req.file.path: null;
    console.log("Image URL after replace:", imageUrl);
    try{
        const newGraphicCard = await GraphicsCards.create({
            name, model, memorySize, 
        memoryType, boostClock, baseClock, tdp, price, imageUrl
        });
        res.json(newGraphicCard);
    }catch(error){
        res.status(500).json({error: "Faild to create graphic card"});
    }
})

router.get('/', async(req, res) => {
    try{
        const graphicsCards = await GraphicsCards.findAll();
        res.json(graphicsCards);
    } catch(error){
        res.status(500).json({error: "Faild to fetch graphics cards!"});
    }
})

module.exports = router;