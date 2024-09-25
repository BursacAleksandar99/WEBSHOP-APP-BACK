const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcryptjs = require("bcryptjs");
const { where } = require('sequelize');
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/jwtMiddleware');

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

router.put('/change-password', validateToken, async (req, res) => {
    const{ oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: "Please provide both old and new passwords!" });
    }
    if (!req.user) {
        return res.status(401).json({ error: "User not logged in!" });
    }

    try{
        const user = await Users.findOne({where: {id: req.user.id}});
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        const isMatch = await bcryptjs.compare(oldPassword, user.password);
        if(!isMatch) {
            return res.status(400).json({error: "Old password is incorrect!"});
        }

        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        
        await Users.update({password: hashedPassword}, {where: {id: req.user.id}});

        res.json({message: "Password successfully updated!"});
    }catch(error){
        console.error("Error during password update:", error);
        res.status(500).json({error: "An error occurred while updating the password!"});
    }
})

router.post("/login", async (req, res) => {
    const { username, password} = req.body;

    try{
        const user = await Users.findOne({where: { username: username}});

        if(!user) {
            return res.status(404).json({error: "User not found!"});
        }

        const match = await bcryptjs.compare(password, user.password);

        if(!match){
            return res.status(401).json({error: "Incorrect password!"});
        }

        const token = sign(
            { usenname: user.username, id: user.id},
            "importantsecret",
            { expiresIn: "1h"}
        );

        res.json({token: token, username: user.username});

    } catch(error){
        res.status(500).json({error: "An error occurred during login!"});
    }
})

router.get("/protected", validateToken, (req, res) => {
        res.send('This is a protected route');
})

module.exports = router;