// Payment.jsx
import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

const Payment = () => {
    const onSuccess = (payment) => {
        console.log('Payment successful!', payment);
        alert('Payment successful!');
    };

    const onError = (error) => {
        console.log('Payment error!', error);
        alert('Payment error!');
    };

    const onCancel = (data) => {
        console.log('Payment cancelled!', data);
        alert('Payment cancelled!');
    };

    return (
        <div>
            <h1>Pay with PayPal</h1>
            <PayPalButton
                amount="100.00" // Replace with your amount
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onCancel}
                options={{
                    clientId: 'your-client-id', // Replace with your PayPal client ID
                }}
            />
        </div>
    );
};

export default Payment;