'use client'

import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from './ui/button'

export default function CheckoutForm() {
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setProcessing(true)

        if (!stripe || !elements) {
            return
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success`,
            },
        })

        if (result.error) {
            setError(result.error.message)
            setProcessing(false)
        } else {
            // Payment succeeded, redirect will happen automatically
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
            <CardElement />
            <Button type="submit" disabled={!stripe || processing} className="mt-4 w-full">
                {processing ? 'Processing...' : 'Pay now'}
            </Button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
    )
}