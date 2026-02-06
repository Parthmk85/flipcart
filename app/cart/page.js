"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Minus, Plus, Trash2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const CartPage = () => {
    const { cart, updateQuantity, removeFromCart } = useCart();

    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalOriginalPrice = cart.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);
    const discount = totalOriginalPrice - totalPrice;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-bg-light flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center bg-white m-4 rounded-sm shadow-sm gap-4 p-10">
                    <img
                        src="https://truemeds.in/static/media/emptyCart.e101f308.png"
                        alt="Empty Cart"
                        className="w-64"
                    />
                    <h2 className="text-xl font-medium">Your cart is empty!</h2>
                    <p className="text-gray-500 text-sm">Add items to it now.</p>
                    <Link href="/" className="btn-primary">Shop Now</Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-light flex flex-col">
            <Navbar />

            <main className="container-custom py-6 lg:grid lg:grid-cols-12 gap-4">
                {/* Cart Items List */}
                <div className="lg:col-span-8 bg-white shadow-sm rounded-sm">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h1 className="text-lg font-bold">Flipkart ({cart.length})</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            Deliver to: <span className="font-bold border px-2 py-1 rounded-sm">Bengaluru - 560001</span>
                        </div>
                    </div>

                    {cart.map((item) => (
                        <div key={item.id} className="p-4 border-b last:border-b-0 flex flex-col md:flex-row gap-4">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-28 h-28 p-2">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-gray-100"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <input
                                        type="text"
                                        readOnly
                                        value={item.quantity}
                                        className="w-12 text-center border text-sm py-0.5"
                                    />
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-gray-100"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-between py-2">
                                <div>
                                    <h3 className="text-lg font-medium hover:text-primary cursor-pointer leading-tight mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-2">Seller: RetailNet</p>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-gray-400 line-through text-sm">₹{item.originalPrice.toLocaleString()}</span>
                                        <span className="text-xl font-bold">₹{item.price.toLocaleString()}</span>
                                        <span className="text-green-600 font-bold text-sm">{item.discount}% Off</span>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button className="uppercase font-bold text-sm hover:text-primary">Save for later</button>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="uppercase font-bold text-sm hover:text-primary flex items-center gap-1"
                                    >
                                        <Trash2 className="w-4 h-4" /> Remove
                                    </button>
                                </div>
                            </div>

                            <div className="text-sm font-medium pt-2">
                                Delivery by Sat Feb 10 | <span className="text-green-600 line-through">₹40</span> <span className="text-green-600">Free</span>
                            </div>
                        </div>
                    ))}

                    <div className="p-4 flex justify-end shadow-[0_-2px_10px_0_rgba(0,0,0,0.1)] sticky bottom-0 bg-white">
                        <Link href="/checkout" className="btn-secondary w-full md:w-64 text-center rounded-sm text-lg py-3">
                            PLACE ORDER
                        </Link>
                    </div>
                </div>

                {/* Price Detail Sidebar */}
                <div className="lg:col-span-4 h-fit sticky top-20">
                    <div className="bg-white shadow-sm rounded-sm">
                        <div className="p-4 border-b">
                            <h2 className="text-gray-500 font-bold uppercase text-sm">Price Details</h2>
                        </div>
                        <div className="p-4 space-y-4 text-sm border-b">
                            <div className="flex justify-between">
                                <span>Price ({cart.length} items)</span>
                                <span>₹{totalOriginalPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount</span>
                                <span className="text-green-600">- ₹{discount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Coupons for you</span>
                                <span className="text-green-600">- ₹0</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Charges</span>
                                <span className="text-green-600"><span className="text-gray-400 line-through mr-1">₹40</span> Free</span>
                            </div>
                        </div>
                        <div className="p-4 flex justify-between font-bold text-lg border-b border-dashed">
                            <span>Total Amount</span>
                            <span>₹{totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="p-4 text-green-600 font-bold text-sm">
                            You will save ₹{discount.toLocaleString()} on this order
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3 text-gray-500 font-bold text-sm p-2 uppercase">
                        <ShieldCheck className="w-6 h-6" /> Safe and Secure Payments. Easy returns. 100% Authentic products.
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CartPage;
