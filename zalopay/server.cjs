const express = require('express');
const axios = require('axios');
const moment = require('moment');
const CryptoJS = require('crypto-js');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// APP INFO
const config = {
    app_id: "2554",
    key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
    key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};

app.post("/payment", async (req, res) => {
    console.log('Received POST /payment request');
    console.log('Request body:', req.body);

    const { amount, app_user, item } = req.body;

    const embed_data = {
        redirecturl: "http://localhost:8084/success"
    };

    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
        app_user,
        app_time: Date.now(),
        amount,
        item: JSON.stringify(item),
        embed_data: JSON.stringify(embed_data)
    };

    const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
        const result = await axios.post(config.endpoint, null, { params: order });
        res.json(result.data);
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({
            error: 'Payment processing failed',
            message: error.message
        });
    }
});

const PORT = 8084;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});