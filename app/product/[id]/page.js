"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Zap, Star, MapPin, CheckCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

const ProductDetail = () => {
    const { id } = useParams();
    const { products, addToCart } = useCart();
    const product = products.find(p => p.id === id);
    const [pincode, setPincode] = useState("");
    const [deliveryStatus, setDeliveryStatus] = useState(null);

    if (!product) return <div className="p-20 text-center">Product not found</div>;

    const handleCheckDelivery = () => {
        if (pincode.length === 6) {
            setDeliveryStatus("Delivery by Tomorrow, 11 AM");
        } else {
            setDeliveryStatus("Invalid Pincode");
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="container-custom py-4 lg:grid lg:grid-cols-12 gap-8">
                {/* Left Column: Image & Buttons */}
                <div className="lg:col-span-5 flex flex-col gap-4 sticky top-20 h-fit">
                    <div className="border p-4 rounded-sm flex items-center justify-center bg-white aspect-square">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-full max-w-full object-contain cursor-zoom-in"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => addToCart(product)}
                            className="bg-accent-yellow hover:bg-opacity-90 text-white font-bold py-4 rounded-sm flex items-center justify-center gap-2 uppercase"
                        >
                            <ShoppingCart className="w-5 h-5" /> Add to Cart
                        </button>
                        <button
                            className="bg-secondary hover:bg-opacity-90 text-white font-bold py-4 rounded-sm flex items-center justify-center gap-2 uppercase"
                        >
                            <Zap className="w-5 h-5 fill-current" /> Buy Now
                        </button>
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="lg:col-span-7 flex flex-col gap-4 mt-8 lg:mt-0">
                    <nav className="text-xs text-gray-400 flex gap-2">
                        <span>Home</span> {'>'} <span>{product.category}</span> {'>'} <span className="text-gray-600 line-clamp-1">{product.title}</span>
                    </nav>

                    <h1 className="text-xl font-medium text-gray-800">{product.title}</h1>

                    <div className="flex items-center gap-3">
                        <div className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                            {product.rating} <Star className="w-3 h-3 fill-current" />
                        </div>
                        <span className="text-gray-500 text-sm font-medium">{product.reviews.toLocaleString()} Ratings & {Math.floor(product.reviews / 10).toLocaleString()} Reviews</span>
                        <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="assured" className="h-5" />
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
                            <span className="text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                            <span className="text-green-600 font-bold">{product.discount}% off</span>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 cursor-pointer hover:underline">+ ₹29 Secured Packaging Fee</span>
                    </div>

                    {/* Coupons & Offers */}
                    <div className="space-y-2 mt-2">
                        <h4 className="font-bold text-sm">Available offers</h4>
                        <p className="text-sm flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span><b>Bank Offer</b> 10% instant discount on ICICI Bank Cards, up to ₹1,250 on orders of ₹5,000 and above <b>T&C</b></span>
                        </p>
                        <p className="text-sm flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span><b>Partner Offer</b> Sign-up for Flipkart Pay Later & get free Times Prime Benefits worth ₹20,000* <b>Know More</b></span>
                        </p>
                    </div>

                    {/* Delivery Widget */}
                    <div className="grid grid-cols-4 gap-4 py-4 border-y">
                        <div className="text-gray-500 text-sm flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> Delivery
                        </div>
                        <div className="col-span-3 space-y-2">
                            <div className="flex border-b border-primary w-fit pb-1 gap-2">
                                <input
                                    type="text"
                                    maxLength={6}
                                    placeholder="Enter Delivery Pincode"
                                    className="bg-transparent outline-none text-sm placeholder:text-gray-400"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                                />
                                <button onClick={handleCheckDelivery} className="text-primary font-bold text-sm">Check</button>
                            </div>
                            {deliveryStatus && (
                                <p className={`text-sm ${deliveryStatus.includes('Invalid') ? 'text-red-500' : 'text-gray-900 font-bold'}`}>
                                    {deliveryStatus}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="mt-4">
                        <h2 className="text-lg font-bold mb-4">Specifications</h2>
                        <div className="border rounded-sm">
                            {Object.entries(product.specs).map(([key, value], idx) => (
                                <div key={idx} className="grid grid-cols-4 p-4 border-b last:border-b-0">
                                    <div className="text-gray-500 text-sm">{key}</div>
                                    <div className="col-span-3 text-sm">{value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetail;
