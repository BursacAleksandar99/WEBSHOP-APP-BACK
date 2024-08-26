const express = require('express');
const router = express.Router();
const { Processors } = require('../models');
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

router.put('/:id', upload.single('imageUrl'), async (req, res) => {
    const { id } = req.params;
    const { name, model, cores, threads, baseClock, boostClock, price } = req.body;
    const imageUrl = req.file ? req.file.path.replace(/\\/g, '/') : null;

    try{
        const processor = await Processors.findByPk(id);
        if(!processor){
            return res.status(404).json({error: "Processor not found!"});
        }
        await processor.update({
            name, model, cores, threads, baseClock, boostClock, price, imageUrl
        });
        res.json(processor);
    } catch(error){
        res.status(500).json({error: "Faild to update processor!"});
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const processor = await Processors.findByPk(id);
        if(!processor){
            return res.status(404).json({error: "Processor not found!"});
        }
        await processor.destroy();
        res.status(204).send();
    } catch(error){
        res.status(500).json({error: "Faild to delete processor!"});
    }
})



module.exports = router;