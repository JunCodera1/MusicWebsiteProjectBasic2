'use client'

import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"


const stripePromise = loadStripe('pk_test_your_publishable_key')

const CheckoutForm = ({ clientSecret }) => {
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

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    })

    if (result.error) {
      setError(result.error.message)
      setProcessing(false)
    } else {
      console.log('Payment successful!')
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" disabled={!stripe || processing} className="mt-4 w-full">
        {processing ? 'Đang xử lý...' : 'Thanh toán'}
      </Button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  )
}

const PricingCard = ({ title, price, features, isPremium, onSelectPlan }) => (
  <Card className={`border border-gray-200 transition-all duration-200 hover:shadow-md ${isPremium ? 'shadow-lg scale-105' : ''}`}>
    <div className="p-6">
      <h3 className="text-xl font-normal text-gray-900 mb-2">{title}</h3>
      <div className="text-3xl font-light mb-6">
        <sup className="text-lg align-super mr-1">$</sup>
        {price}
        <span className="text-base text-gray-500 ml-1">/ mo</span>
      </div>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="text-center text-gray-600">{feature}</li>
        ))}
      </ul>
      <Button
        variant={isPremium ? 'default' : 'outline'}
        className="w-full"
        onClick={() => onSelectPlan(title, price)}
      >
        Select Plan
      </Button>
    </div>
  </Card>
)


const PaymentPage = () => {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState('')
  const [plans] = useState([
    { title: "Basic", price: 4.99, features: ["Ad-free listening", "High-quality audio", "Offline mode", "Unlimited skips"] },
    { title: "Premium", price: 9.99, features: ["All Basic features", "Exclusive content", "Lyrics display", "Personal playlists"] },
    { title: "Pro", price: 14.99, features: ["All Premium features", "Studio quality audio", "Early access to new features", "Priority support"] },
  ])

  const handleSelectPlan = (title, price) => {
    if (clientSecret) {
      // Redirect to a new page for Stripe Checkout
      router.push(`/checkout?plan=${title}&price=${price}&clientSecret=${clientSecret}`);
    }
  };

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: [{ id: 'premium_plan' }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <>
      <div className="text-center mb-16">
        <h1 className="text-4xl font-normal text-gray-900 mb-4">SoundBox Premium Plans</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Unlock the full potential of your music experience with our premium plans.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <PricingCard
            key={plan.title}
            {...plan}
            isPremium={index === 1}
            onSelectPlan={handleSelectPlan}
          />
        ))}
      </div>
      {/* <Elements stripe={stripePromise}>
        <Card className="w-full max-w-md mx-auto mt-10">
          <CardHeader>
            <CardTitle>SoundBox Premium</CardTitle>
            <CardDescription>Mở khóa tất cả tính năng cao cấp</CardDescription>
          </CardHeader>
          <CardContent>
            {clientSecret && <CheckoutForm clientSecret={clientSecret} />}
          </CardContent>
          <CardFooter className="text-sm text-gray-500">
            Bạn sẽ được tính phí $9.99 mỗi tháng. Hủy bất kỳ lúc nào.
          </CardFooter>
        </Card>
      </Elements> */}
    </>
  )
}

export default PaymentPage