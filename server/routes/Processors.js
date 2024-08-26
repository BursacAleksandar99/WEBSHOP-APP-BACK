const express = require('express');
const router = express.Router();
const { Processors } = require('../models');


router.post('/', async (req, res) => {
    
    const { name, model, cores, threads, baseClock, boostClock, price} = req.body;
    try{
        const newProcessor = await Processors.create({
            name, model, cores, threads, baseClock, boostClock, price
        });
        res.json(newProcessor);
    } catch(error){ 
        res.status(500).json({error: "Failed to create processor"});
    }
})



module.exports = router;