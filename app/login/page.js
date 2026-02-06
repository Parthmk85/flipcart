"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { login } = useCart();
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(formData.email, formData.password);
        if (res.success) {
            router.push('/');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
            <div className="bg-white flex rounded-sm shadow-md max-w-4xl w-full overflow-hidden h-[550px]">
                {/* Left Side Info */}
                <div className="bg-primary text-white w-2/5 p-10 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold mb-4">Login</h2>
                        <p className="text-gray-200 text-lg">Get access to your Orders, Wishlist and Recommendations</p>
                    </div>
                    <img
                        src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
                        alt="Login Info"
                        className="mb-10"
                    />
                </div>

                {/* Right Side Form */}
                <div className="w-3/5 p-10 flex flex-col justify-between">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email/Mobile number"
                            className="border-b border-gray-300 py-2 outline-none focus:border-primary"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            className="border-b border-gray-300 py-2 outline-none focus:border-primary"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <p className="text-xs text-gray-500 mt-4">
                            By continuing, you agree to Flipkart's <span className="text-primary cursor-pointer">Terms of Use</span> and <span className="text-primary cursor-pointer">Privacy Policy</span>.
                        </p>

                        <button type="submit" className="bg-[#fb641b] text-white font-semibold py-3 rounded-sm shadow-sm hover:bg-[#e05a18] transition-colors">
                            Login
                        </button>
                        <div className="text-center mt-2">
                            <Link href="/signup" className="text-primary text-sm font-bold">New to Flipkart? Create an account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
