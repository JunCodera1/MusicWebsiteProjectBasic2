'use client'

import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../components/CheckoutForm'
import { useSearchParams } from 'next/navigation'

const stripePromise = loadStripe('your_stripe_publishable_key')

export default function CheckoutPage() {
    const [clientSecret, setClientSecret] = useState("")
    const searchParams = useSearchParams()

    useEffect(() => {
        const plan = searchParams.get('plan')
        const price = searchParams.get('price')
        const clientSecret = searchParams.get('clientSecret')

        if (clientSecret) {
            setClientSecret(clientSecret)
        }
    }, [searchParams])

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}