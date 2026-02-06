"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, ChevronDown, Menu, Store, LogOut, Package, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
    const { cart, isLoggedIn, user, logout } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white text-black sticky top-0 z-50 border-b border-gray-200">
            <div className="container-custom flex items-center h-16 gap-6 xl:gap-12">
                {/* Logo */}
                <div className="flex flex-col">
                    <Link href="/" className="flex flex-col">
                        <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-448058.svg" alt="Flipkart" className="h-[40px] w-auto" />
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-[700px] h-10 bg-[#f0f5ff] rounded-lg flex items-center px-4 group focus-within:bg-white focus-within:ring-1 focus-within:ring-primary/20 border border-transparent focus-within:border-primary/20">
                    <Search className="text-gray-500 w-5 h-5 mr-3" />
                    <input
                        type="text"
                        placeholder="Search for Products, Brands and More"
                        className="w-full bg-transparent outline-none text-[15px] placeholder:text-gray-500"
                    />
                </div>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-normal text-[16px]">

                    {isLoggedIn ? (
                        <div className="group relative cursor-pointer">
                            <div className="flex items-center gap-2 hover:bg-primary hover:text-white px-3 py-2 rounded-lg transition-all duration-200">
                                <User className="w-5 h-5" />
                                <span className="max-w-[100px] truncate">{user.name}</span>
                                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                            </div>
                            {/* Dropdown Menu */}
                            <div className="absolute top-full left-0 w-60 bg-white shadow-lg rounded-b-md border border-gray-100 hidden group-hover:block z-50 animate-fade-in">
                                <ul className="flex flex-col text-sm text-gray-700">
                                    <li className="px-4 py-3 hover:bg-gray-50 border-b flex items-center gap-2">
                                        <User className="w-4 h-4" /> My Profile
                                    </li>
                                    <li className="px-4 py-3 hover:bg-gray-50 border-b flex items-center gap-2">
                                        <Package className="w-4 h-4" /> Orders
                                    </li>
                                    <li className="px-4 py-3 hover:bg-gray-50 border-b flex items-center gap-2">
                                        <Heart className="w-4 h-4" /> Wishlist
                                    </li>
                                    <li onClick={logout} className="px-4 py-3 hover:bg-gray-50 flex items-center gap-2 cursor-pointer text-red-600">
                                        <LogOut className="w-4 h-4" /> Logout
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <Link href="/login" className="flex items-center gap-2 hover:bg-primary hover:text-white px-3 py-2 rounded-lg transition-all duration-200 group">
                            <User className="w-5 h-5" />
                            Login
                            <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                        </Link>
                    )}

                    <Link href="/cart" className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
                        <div className="relative">
                            <ShoppingCart className="w-5 h-5" />
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-secondary text-[10px] text-white rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
                                    {cart.length}
                                </span>
                            )}
                        </div>
                        Cart
                    </Link>

                    <Link href="/seller" className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
                        <Store className="w-5 h-5" />
                        Become a Seller
                    </Link>

                    <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
                        <span className="text-xl">⋮</span>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white text-black absolute top-16 w-full left-0 border-b shadow-lg z-40 transition-all">
                    <div className="p-4 flex flex-col gap-4">
                        {isLoggedIn ? (
                            <div className="flex flex-col gap-4 border-b pb-4">
                                <div className="font-bold text-lg">Hello, {user.name}</div>
                                <button onClick={logout} className="flex items-center gap-2 text-red-600"><LogOut className="w-4 h-4" /> Logout</button>
                            </div>
                        ) : (
                            <Link href="/login" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}><User className="w-4 h-4" /> Login / Signup</Link>
                        )}
                        <Link href="/cart" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}><ShoppingCart className="w-4 h-4" /> My Cart</Link>
                        <Link href="/admin/dashboard" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
