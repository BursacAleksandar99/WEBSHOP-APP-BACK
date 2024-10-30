const express = require('express');
const router = express.Router();
const { Orders, Users } = require('../models');

router.post('/create-order', async(req, res) => {
    const {userId, items, totalPrice} = req.body;
    console.log("Received data: ", {userId, items, totalPrice});
    

    try{

        const user = await Users.findByPk(userId);
        if(!user){
            return res.status(404).json({error: "User not found!"});
        }
        console.log("Cart items before stringify", items);
        console.log("User ID: ", userId);
        console.log("Total price: ", totalPrice);
        
        
        

        const newOrder = await Orders.create({
            userId,
            items,
            totalPrice
        });
        
        console.log("Cart items after stringify", items);
        
        
        

        return res.status(200).json({message: "Order created successfully!", newOrder} );

    }catch(error){
        console.log("Error creating order: ", error.message);
        
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