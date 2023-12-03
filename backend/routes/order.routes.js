import mongoose from "mongoose";
import Order from "../models/Orders.model.js";
import Customer from "../models/Customer.model.js";
import express from "express";
import stripeLib from 'stripe';
import { authenticateToken } from "../utils/auth.js";
import Book from "../models/Books.model.js";
const stripe = stripeLib('sk_test_51Nsr57IKWKaCzW6hlGDg0GHN7F3kktuIdlbJrI0wmbZCHbsxIDMSlJ1FtiRVWCBo2B8FaK72hD0WmIl5ODr5pIeK00rIrdekY6');

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


const calculateAmount = (books) => {
    console.log("I AM IN CALCULATE PAYMENT", books);
    return 50;
}


// only logged in user can craete an order

app.post("/customer/placeOrder/:id", authenticateToken, async (req, res) => {
    try {
      const { books, orderOptions, customerIdStripeAccount, payment_method } = req.body;
      const customerId = req.params.id;
      const customer = await Customer.findOne({ _id: customerId });
  
      if (!customer) {
        return res.status(404).send({ message: `Customer with id ${customerId} doesn't exist. Please log in with correct credentials.` });
      }
  
      // Calculate the order amount
      const orderAmount = await calculateAmount(books);
  
      // Create paymentIntent and confirm it
      const paymentIntent = await stripe.paymentIntents.create({
        amount: orderAmount,
        currency: 'usd',
        customer: customerIdStripeAccount,
        confirmation_method: "automatic",
        confirm: true,
        payment_method,
        return_url:'https://localhost:3000'
      });
  
      // Create order in the database
      const booksForOrder = await Promise.all(books.map(async (book) => {
        const bookDetails = await Book.findOne({ _id: book.book });
        return {
          book: bookDetails,
          quantity: book.quantity,
        };
      }));
  
      const newOrder = await Order.create({
        customerId: customerId,
        books: booksForOrder,
        orderOptions: orderOptions,
        paymentIntentId: paymentIntent.id,
      });
  
      // change the inventory.... 
     

      res.status(201).send({
        message: `New order with Order id ${newOrder._id} created successfully`,
        newOrder,
        confirmedPaymentIntent: paymentIntent,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Oops!! Something went Wrong" });
    }
  });






export default app;


