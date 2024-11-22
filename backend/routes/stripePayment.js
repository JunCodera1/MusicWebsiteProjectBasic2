import express from 'express';
import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Route tạo Payment Intent
router.post('/create-payment-intent', asyncHandler(async (req, res) => {
    const { amount } = req.body;

    if (!amount || typeof amount !== 'number') {
        return res.status(400).json({ message: 'Số tiền không hợp lệ' });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Số tiền chuyển thành cents
            currency: 'usd',
            // Bạn có thể thêm metadata hoặc các thông tin khác ở đây
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}));

export default router;