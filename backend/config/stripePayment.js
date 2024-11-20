const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

//----stripePayment.js

const stripePayment = {

    //payment

    payment: asyncHandler(async (req, res) => {

        // Get the payment details from the request body
        const { subscriptionID } = req.body;
        // Check for the payment details
        if (mongoose.isValidObjectId(subscriptionID)) {
            return res, json({ message: 'Invalid subscription ID' });
        }
        // Find the subscription

        //find the product
        //get the user
        //create the payment intent 
        //send the response back to the frontend
    })
    //verify the payment


};