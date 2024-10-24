const express = require('express');
const router = express.Router();
const { Orders, Users } = require('../models');

router.post('/create-order', async(req, res) => {
    const {userId, items, totalPrice} = req.body;


    try{

        const user = await Users.findByPk(userId);
        if(!user){
            return res.status(404).json({error: "User not found!"});
        }

        const newOrder = await Orders.create({
            userId,
            items: JSON.stringify(items),
            totalPrice
        });
        // console.log("Order Created: ", newOrder);
        

        return res.status(200).json({message: "Order created successfully!", newOrder} );

    }catch(error){
        return res.status(500).json({error: "Failed to create order!"});
    }
})

router.delete('/:id', async(req, res) => {
    const {id} = req.params;

    // console.log("ID: " + id);
    
    try{
        const order = await Orders.findByPk(id);

        // console.log(order);
        

        if(!order){
            return res.status(500).json({error: "Order not found!"});
        }
        await order.destroy();
        res.status(200).json({msg: "Order deleted successfully!"});
    }catch(error){
        return res.status(500).json({error: "Can't delete order!"});
    }
})

module.exports = router;