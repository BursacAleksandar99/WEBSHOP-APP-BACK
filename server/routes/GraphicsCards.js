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

router.put('/:id', upload.single('imageUrl'), async (req, res) => {
    const {id} = req.params;
    const {name, model, memorySize, 
        memoryType, boostClock, baseClock, tdp, price, } = req.body;
    const imageUrl = req.file ? req.file.path.replace(/\\/g, '/') : null;

    try{
        const graphicCard = await GraphicsCards.findByPk(id);
        if(!graphicCard){
            return res.status(404).json({error: "GraphicCard not found!"});
        }
        await graphicCard.update({
            name, model, memorySize, memoryType, boostClock, baseClock, tdp, price, imageUrl
        })
        res.json(graphicCard);
    }catch(error){
        res.status(500).json({error: "Faild to update graphicCard!"});
    }
})

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try{
        const graphicCard = await GraphicsCards.findByPk(id);
        if(!graphicCard){
            return res.status(404).json({error: "GraphicCard not found!"});
        }
        await graphicCard.destroy();
        res.status(204).send();
    }catch(error){
        res.status(500).json({error: "Faild to delete graphicCard!"});
    }
})

module.exports = router;