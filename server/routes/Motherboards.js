const express = require('express');
const router = express.Router();
const { Motherboards } = require('../models');

router.post('/', async(req, res) => {
    const{name, model, memoryType, maxMemory,
             chipset, cpu, price} = req.body;

    try{
        const newMotherboard = await Motherboards.create({
            name, model, memoryType, maxMemory, 
            chipset, cpu, price
        });
        res.json(newMotherboard);
    }catch(error){
        res.status(500).json({error: "Faild to create motherboard"});
    }
})

module.exports = router;