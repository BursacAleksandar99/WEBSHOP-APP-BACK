const express = require('express');
const router = express.Router();
const { Ram } = require('../models');
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
    const{ name, model, memorySize, memoryType, frequency, 
        price
    } = req.body;
    const imageUrl = req.file ? req.file.path: null;
    console.log('Image URL after replace:', imageUrl);
    try{
        const newRam = await Ram.create({
            name, model, memorySize, memoryType, frequency, 
        price, imageUrl
        });
        res.json(newRam);
    }catch(error){
        res.status(500).json({error: "Faild to create ram"});
    }
})

router.put('/:id', upload.single("imageUrl", async(req, res) => {
    const { id } = req.params;
    const{name, model, memorySize, memoryType, frequency, 
        price} = req.body;
    const imageUrl = req.file ? req.file.path.replace(/\\/g, '/') : null;

    try{
        const ram = await Ram.findByPk(id);
        if(!ram){
            return res.status(404).json({error: "Ram not found!"});
        }
        await ram.update({
            name, model, memorySize, memoryType, frequency, 
        price, imageUrl
        })
        res.json(ram);
    }catch(error){
        res.status(500).json({error: "Faild to update ram!"});
    }
}))

router.get('/', async(req, res) => {
    try{
        const ram = await Ram.findAll();
        res.json(ram);
    }catch(error){
        res.status(500).json({error: "Faild to fetch ram!"});
    }
})

router.delete('/:id', async(req, res) => {
    const { id } = req.params;

    try{
        const ram = await Ram.findByPk(id);
        if(!ram){
            return res.status(404).json({error: "Ram not found!"});
        }
        await ram.destroy();
        res.status(204).send();
    }catch(error){
        res.status(500).json({error: "Faild to delete ram!"});
    }
})

module.exports = router;