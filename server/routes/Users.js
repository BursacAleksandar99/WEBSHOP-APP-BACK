const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require("bcrypt");

router.post("/register", async(req, res) => {
    const {username, password} = req.body || {};
    if(!username || !password) {
        return res.status(400).json({msg: 'Username and password are required'});
    }
    try{
        const hash = await bcrypt.hash(password, 10);
        await Users.create({username, password: hash});
        console.log('User created:', Users);
        res.status(201).json({msg: "User registerd successfully"});
    } catch (error){
        console.error('Error:', error);
        res.status(500).json({error: error.message});
    }
});
module.exports = router;