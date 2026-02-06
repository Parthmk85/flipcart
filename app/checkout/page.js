"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Check, ShieldCheck, CreditCard, Banknote, Landmark } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("card");

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handlePlaceOrder = () => {
        alert("Order Placed Successfully!");
        clearCart();
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-bg-light flex flex-col">
            <header className="bg-primary text-white h-16 shadow-md flex items-center">
                <div className="container-custom flex justify-between items-center">
                    <span className="italic font-bold text-xl">Flipkart</span>
                    <div className="flex items-center gap-2 text-sm text-blue-100">
                        <ShieldCheck className="w-5 h-5" /> 100% Safe and Secure
                    </div>
                </div>
            </header>

            <main className="container-custom py-6 lg:grid lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8 flex flex-col gap-4">
                    {/* Step 1: Login */}
                    <div className={`bg-white shadow-sm rounded-sm ${step > 1 ? 'opacity-80' : ''}`}>
                        <div className={`p-4 flex items-center justify-between ${step === 1 ? 'bg-primary text-white' : 'bg-white text-gray-400'}`}>
                            <div className="flex items-center gap-4">
                                <span className="bg-white/20 px-2 py-0.5 rounded-sm font-bold">1</span>
                                <h2 className="font-bold uppercase">Login</h2>
                                {step > 1 && <Check className="w-4 h-4 text-primary" />}
                            </div>
                        </div>
                        {step === 1 && (
                            <div className="p-8 flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="font-bold">John Doe +91 9876543210</p>
                                </div>
                                <button onClick={() => setStep(2)} className="btn-secondary">CONTINUE TO CHECKOUT</button>
                            </div>
                        )}
                    </div>

                    {/* Step 2: Delivery Address */}
                    <div className={`bg-white shadow-sm rounded-sm ${step !== 2 ? (step > 2 ? 'opacity-80' : 'hidden md:block') : ''}`}>
                        <div className={`p-4 flex items-center justify-between ${step === 2 ? 'bg-primary text-white' : 'bg-white text-gray-400'}`}>
                            <div className="flex items-center gap-4">
                                <span className="bg-white/20 px-2 py-0.5 rounded-sm font-bold">2</span>
                                <h2 className="font-bold uppercase">Delivery Address</h2>
                                {step > 2 && <Check className="w-4 h-4 text-primary" />}
                            </div>
                        </div>
                        {step === 2 && (
                            <div className="p-4 space-y-4">
                                <div className="border border-primary bg-blue-50 p-4 rounded-sm">
                                    <p className="font-bold mb-1">John Doe <span className="bg-gray-200 text-[10px] px-1 rounded-sm ml-2">HOME</span></p>
                                    <p className="text-sm text-gray-700">123, Tech Street, Silicon Valley, Bengaluru, Karnataka - 560001</p>
                                    <button onClick={() => setStep(3)} className="bg-secondary text-white font-bold px-8 py-3 rounded-sm mt-4 uppercase">Deliver Here</button>
                                </div>
                                <button className="text-primary font-bold text-sm">+ Add a new address</button>
                            </div>
                        )}
                    </div>

                    {/* Step 3: Order Summary */}
                    <div className={`bg-white shadow-sm rounded-sm ${step !== 3 ? (step > 3 ? 'opacity-80' : 'hidden md:block') : ''}`}>
                        <div className={`p-4 flex items-center justify-between ${step === 3 ? 'bg-primary text-white' : 'bg-white text-gray-400'}`}>
                            <div className="flex items-center gap-4">
                                <span className="bg-white/20 px-2 py-0.5 rounded-sm font-bold">3</span>
                                <h2 className="font-bold uppercase">Order Summary</h2>
                                {step > 3 && <Check className="w-4 h-4 text-primary" />}
                            </div>
                        </div>
                        {step === 3 && (
                            <div className="p-4 space-y-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex gap-4 border-b pb-4 last:border-0 italic">
                                        <span>{item.title} x {item.quantity}</span>
                                        <span className="font-bold ml-auto">₹{item.price.toLocaleString()}</span>
                                    </div>
                                ))}
                                <button onClick={() => setStep(4)} className="btn-secondary ml-auto block">CONTINUE</button>
                            </div>
                        )}
                    </div>

                    {/* Step 4: Payment Options */}
                    <div className={`bg-white shadow-sm rounded-sm ${step !== 4 ? 'hidden md:block' : ''}`}>
                        <div className={`p-4 flex items-center justify-between ${step === 4 ? 'bg-primary text-white' : 'bg-white text-gray-400'}`}>
                            <div className="flex items-center gap-4">
                                <span className="bg-white/20 px-2 py-0.5 rounded-sm font-bold">4</span>
                                <h2 className="font-bold uppercase">Payment Options</h2>
                            </div>
                        </div>
                        {step === 4 && (
                            <div className="p-4 space-y-4">
                                <label className="flex items-center gap-4 p-4 border rounded cursor-pointer">
                                    <input type="radio" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="accent-primary w-4 h-4" />
                                    <Landmark className="w-6 h-6 text-primary" />
                                    <div>
                                        <p className="font-bold">UPI</p>
                                        <p className="text-xs text-gray-500">Google Pay, PhonePe, Any UPI ID</p>
                                    </div>
                                </label>
                                <label className="flex items-center gap-4 p-4 border rounded cursor-pointer border-primary bg-blue-50">
                                    <input type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-primary w-4 h-4" />
                                    <CreditCard className="w-6 h-6 text-primary" />
                                    <div>
                                        <p className="font-bold">Credit / Debit / ATM Card</p>
                                        <p className="text-xs text-gray-500">Add and secure cards as per RBI guidelines</p>
                                    </div>
                                </label>
                                <label className="flex items-center gap-4 p-4 border rounded cursor-pointer">
                                    <input type="radio" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-primary w-4 h-4" />
                                    <Banknote className="w-6 h-6 text-primary" />
                                    <div>
                                        <p className="font-bold">Cash on Delivery</p>
                                    </div>
                                </label>

                                <button
                                    onClick={handlePlaceOrder}
                                    className="bg-secondary text-white font-bold px-12 py-4 rounded-sm mt-8 uppercase w-full md:w-fit ml-auto block shadow-md"
                                >
                                    Confirm Order
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar: Price Detail */}
                <div className="lg:col-span-4 h-fit sticky top-6">
                    <div className="bg-white shadow-sm rounded-sm">
                        <div className="p-4 border-b">
                            <h2 className="text-gray-500 font-bold uppercase text-sm">Price Details</h2>
                        </div>
                        <div className="p-4 space-y-4 text-sm border-b">
                            <div className="flex justify-between">
                                <span>Price ({cart.length} items)</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Charges</span>
                                <span className="text-green-600">Free</span>
                            </div>
                        </div>
                        <div className="p-4 flex justify-between font-bold text-lg">
                            <span>Amount Payable</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
