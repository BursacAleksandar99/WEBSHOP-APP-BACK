const express = require('express');
const router = express.Router();
const { Motherboards } = require('../models');
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

router.put('/:id', upload.single("imageUrl"), async(req, res) => {
    const { id } = req.params;
    const{name, model, memoryType, maxMemory,
        chipset, cpu, price} = req.body;
    const imageUrl = req.file ? req.file.path.replace(/\\/g, '/') : null;

    try{
        const motherboard = await Motherboards.findByPk(id);
        if(!motherboard){
            return res.status(404).json({error: "Motherboard not found!"});
        }
        await motherboard.update({
            name, model, memoryType, maxMemory,
        chipset, cpu, price, imageUrl
        })
        res.json(motherboard);
    }catch(error){
        res.status(500).json({error: "Faild to update motherboard!"});
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

router.delete('/:id', async(req, res) => {
    const { id } = req.params;

    try{
        const motherboard= await Motherboards.findByPk(id);
        if(!motherboard){
            return res.status(404).json({error: "Motherboard not found!"});
        }
        await motherboard.destroy();
        res.status(204).send();
    }catch(error){
        res.status(500).json({error: "Faild to delete motherboard!"});
    }
})

module.exports = router;