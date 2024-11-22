

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Heading, VStack, useToast } from '@chakra-ui/react';

// Lấy khóa công khai từ biến môi trường
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        // Gửi yêu cầu tạo Payment Intent tới backend
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/stripe/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 100 }), // Số tiền thanh toán, ví dụ: $1.00 (100 cents)
        });

        const { clientSecret } = await response.json();

        // Xác nhận thanh toán
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (result.error) {
            toast({
                title: 'Thanh toán thất bại',
                description: result.error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                toast({
                    title: 'Thanh toán thành công',
                    description: 'Bạn đã nâng cấp lên Premium!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                // Thêm logic để mở khóa các chức năng Premium ở đây
            }
        }

        setLoading(false);
    };

    return (
        <Box maxW="sm" mx="auto" mt={10} p={5} boxShadow="md" borderRadius="md">
            <Heading as="h2" size="lg" textAlign="center" mb={6}>
                Nâng cấp lên Premium
            </Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <CardElement options={{ hidePostalCode: true }} />
                    <Button type="submit" colorScheme="teal" isLoading={loading} isDisabled={!stripe}>
                        Thanh Toán
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default Payment;