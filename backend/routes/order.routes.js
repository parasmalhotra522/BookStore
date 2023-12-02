import mongoose from "mongoose";
import Order from "../models/Orders.model.js";
import Customer from "../models/Customer.model.js";
import express from "express";
import { authenticateToken } from "../utils/auth.js";

const app = express.Router();

//  ------ USER can CRUD
// create a order , Get all orders, 
// C - Create a new order  /orders/placeOrder/id
// R - Read/Get all orders by the customer   /orders/customer/id
// U - Update/Modify an existing order
// D - Delete/Cancel an existing order



app.get("/customer/:id", authenticateToken, async(req, res) => {
    try {
        const customerId = req.params.id;
        console.log("--to fetch orders using Customer id", customerId);

        // now we have to find the customer.. with same id
        const customer = await Customer.findOne({_id:customerId});
        if(!customer) {
            res.status(404).send({message: `Customer with id ${customerId} doesn't exist please log in with correct crendentials `});
        }
        const allOrders = await Order.find({customerId:customerId})
        .populate({
            path:"books.book"
        }).exec();
        console.log("all orders.. for existing customer " + customerId + allOrders);
        
        res.status(200).send({message:'Orders retrieved successfully', 
        orders: allOrders
    });

    } catch(error) {
        res.status(500).send({message: "Oops!! Something went Wrong"});
  
    }
});



// only logged in user can craete an order
app.post("/customer/placeOrder/:id",authenticateToken, async(req, res) => {
    try {
    const {books, orderOptions} = req.body;
    // find the customer...
    const customerId = req.params.id;
    const customer = await Customer.findOne({_id:customerId});
    console.log("Found the customer with the id", customer);

    if(!customer) {
        res.status(404).send({message: `Customer with id ${customerId} doesn't exist please log in with correct crendentials `});
    }
    const newOrder = await Order.create({
        customerId:customerId,
        books:books,
        orderOptions:orderOptions
    });
    res.status(200).send({message: `New order with Order id ${newOrder._id} created successfully`,
    newOrder
});
}   
    catch(error) {
        console.error(error);
        res.status(500).send({message: "Oops!! Something went Wrong"});
    }

});






export default app;


