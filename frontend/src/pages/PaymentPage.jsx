import React, { useState } from 'react'
import { CloudIcon, Menu, X } from 'lucide-react'
import Navbar from '../components/Navbar'


const menuItemsLeft = [
    { label: "Home", uri: "/" },
    { label: "Feed", uri: "/feed" },
    { label: "Trending", uri: "/trending" },
    { label: "Upload", uri: "/upload" },
];

const menuItemsRight = [{ label: "Login", uri: "/login" }];
const Button = ({ children, variant = 'default', className = '', ...props }) => {
    const baseStyle = 'px-4 py-2 rounded font-semibold text-sm uppercase transition-colors duration-200'
    const variants = {
        default: 'bg-pink-500 text-white hover:bg-pink-600',
        outline: 'bg-white text-pink-500 border border-pink-200 hover:bg-pink-50',
    }
    return (
        <div>

            <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
                {children}
            </button>
        </div>

    )
}

const Card = ({ children, className = '', ...props }) => (
    <div className={`bg-white rounded-lg overflow-hidden ${className}`} {...props}>
        {children}
    </div>
)

const PricingCard = ({ title, price, features, isPremium }) => (
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
            <Button variant={isPremium ? 'default' : 'outline'} className="w-full">
                Get Started
            </Button>
        </div>
    </Card>
)

export default function PaymentPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [plans] = useState([
        { title: "Basic", price: 9, features: ["1 GB memory", "1 core processor", "30 GB SSD Disk", "2 TB Transfer"] },
        { title: "Premium", price: 19, features: ["2 GB memory", "2 core processor", "40 GB SSD Disk", "3 TB Transfer"] },
        { title: "Gold", price: 39, features: ["4 GB memory", "2 core processor", "60 GB SSD Disk", "4 TB Transfer"] },
    ])

    return (
        <div className="min-h-screen bg-white">
            <Navbar menuItemsLeft={menuItemsLeft} menuItemsRight={menuItemsRight} />
            {/* <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <a href="#" className="flex items-center text-pink-500 font-semibold text-xl">
                            <CloudIcon className="h-6 w-6 mr-2" />
                            
                        </a>
                        <div className="hidden md:flex items-center space-x-4">
                            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm font-semibold uppercase">Services</a>
                            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm font-semibold uppercase">Pricing</a>
                            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm font-semibold uppercase">Help</a>
                            <Button variant="outline">Sign In</Button>
                        </div>
                        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <Menu className="h-6 w-6 text-gray-500" />
                        </button>
                    </div>
                </div>
            </nav> */}

            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex justify-end">
                            <button onClick={() => setIsMenuOpen(false)} className="text-gray-500">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="flex flex-col items-center space-y-4 mt-8">
                            <a href="#" className="text-gray-500 hover:text-gray-700 text-lg font-semibold uppercase">Services</a>
                            <a href="#" className="text-gray-500 hover:text-gray-700 text-lg font-semibold uppercase">Pricing</a>
                            <a href="#" className="text-gray-500 hover:text-gray-700 text-lg font-semibold uppercase">Help</a>
                            <Button variant="outline">Sign In</Button>
                        </div>
                    </div>
                </div>
            )}

            <main className="pt-24 pb-16">
                <section className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-normal text-gray-900 mb-4">Pricing Plans</h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            Our cloud hosting plans are designed for companies of all sizes.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <PricingCard key={plan.title} {...plan} isPremium={index === 1} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}
