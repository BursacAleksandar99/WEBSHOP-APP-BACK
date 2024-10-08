const express = require('express');
const router = express.Router();
const { Ssd } = require('../models');
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
    const { name, model, interface, memorySize, 
        writingSpeed, readingSpeed, price} = req.body;
    const imageUrl = req.file ? req.file.path: null;
    console.log("Image URL after replace:", imageUrl);
    try{
        const newSsd = await Ssd.create({
            name, model, interface, memorySize, 
        writingSpeed, readingSpeed, imageUrl, price
        });
        res.json(newSsd);
    }catch(error){
        res.status(500).json({error: "Faild to create ssd"});
    }
})

router.put('/:id', upload.single("imageUrl"), async(req, res) => {
    const { id } = req.params;
    const{name, model, interface, memorySize, 
        writingSpeed, readingSpeed, price} = req.body;
    const imageUrl = req.file ? req.file.path.replace(/\\/g, '/') : null;

    try{
        const ssd = await Ssd.findByPk(id);
        if(!ssd){
            return res.status(404).json({error: "Ssd not found!"});
        }
        await ssd.update({
            name, model, interface, memorySize, 
        writingSpeed, readingSpeed, price, imageUrl
        });
        res.json(ssd);
    }catch(error){
        res.status(500).json({error: "Faild to update ssd!"});
    }
})

router.get('/', async(req, res) => {
    try{
        const ssd = await Ssd.findAll();
        res.json(ssd);
    }catch(error){
        res.status(500).json({error: "Faild to fetch ssd!"});
    }
})

router.delete('/:id', async(req, res) => {
    const { id } = req.params;

    try{
        const ssd = await Ssd.findByPk(id);
        if(!ssd){
            return res.status(404).json({error: "Ssd not found!"});
        }
        await ssd.destroy();
        res.status(204).send();
    }catch(error){
        res.status(500).json({error: "Faild to delete ssd!"});
    }
})

module.exports = router;

