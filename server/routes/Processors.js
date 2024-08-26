const express = require('express');
const router = express.Router();
const { Processors } = require('../models');
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


router.post('/', upload.single('imageUrl'), async (req, res) => {
    
    const { name, model, cores, threads, baseClock, boostClock, price} = req.body;
    const imageUrl = req.file ? req.file.path: null;
    console.log("Image URL after replace:", imageUrl);
    try{
        const newProcessor = await Processors.create({
            name, model, cores, threads, baseClock, boostClock, price, imageUrl
        });
        res.json(newProcessor);
    } catch(error){ 
        res.status(500).json({error: "Failed to create processor"});
    }
})

router.get('/', async(req, res) => {
    try{
        const processors = await Processors.findAll();
        res.json(processors);
    } catch(error){
        res.status(500).json({ error: "Faild to fetch processors!"});
    }
})



module.exports = router;