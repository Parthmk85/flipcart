"use client";
import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { useParams } from 'next/navigation';
import { ChevronDown, Filter, LayoutGrid, List } from 'lucide-react';

const CategoryPage = () => {
    const { id } = useParams();
    const { products } = useCart();
    const [priceRange, setPriceRange] = useState(200000);
    const [sortOrder, setSortOrder] = useState('popularity');

    const filteredProducts = useMemo(() => {
        let result = id === 'all' ? products : products.filter(p => p.category === id);

        result = result.filter(p => p.price <= priceRange);

        if (sortOrder === 'low') result = [...result].sort((a, b) => a.price - b.price);
        if (sortOrder === 'high') result = [...result].sort((a, b) => b.price - a.price);

        return result;
    }, [id, products, priceRange, sortOrder]);

    return (
        <div className="min-h-screen bg-bg-light flex flex-col">
            <Navbar />

            <main className="container-custom py-4 flex-1 flex flex-col md:flex-row gap-4">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 bg-white shadow-sm rounded-sm p-4 h-fit sticky top-20">
                    <h2 className="text-lg font-bold border-b pb-4 mb-4 flex items-center justify-between">
                        Filters
                        <Filter className="w-4 h-4 md:hidden" />
                    </h2>

                    <div className="mb-6">
                        <h3 className="uppercase text-xs font-bold text-gray-500 mb-4">Price</h3>
                        <input
                            type="range"
                            min="0"
                            max="200000"
                            step="1000"
                            value={priceRange}
                            onChange={(e) => setPriceRange(parseInt(e.target.value))}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between mt-2 text-xs text-black">
                            <span>Min</span>
                            <span className="font-bold">Max ₹{priceRange.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="uppercase text-xs font-bold text-gray-500 mb-4">Brand</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            {['Apple', 'Samsung', 'Sony', 'Dell'].map(brand => (
                                <li key={brand} className="flex items-center gap-2">
                                    <input type="checkbox" id={brand} className="rounded-sm border-gray-300 accent-primary" />
                                    <label htmlFor={brand}>{brand}</label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="uppercase text-xs font-bold text-gray-500 mb-4">Customer Ratings</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            {[4, 3, 2, 1].map(stars => (
                                <li key={stars} className="flex items-center gap-2">
                                    <input type="checkbox" id={`stars-${stars}`} className="rounded-sm border-gray-300 accent-primary" />
                                    <label htmlFor={`stars-${stars}`}>{stars}★ & above</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Product Grid Area */}
                <div className="flex-1">
                    <div className="bg-white shadow-sm rounded-sm mb-4">
                        <div className="p-4 border-b">
                            <nav className="text-xs text-gray-400 mb-2">
                                Home {'>'} {id}
                            </nav>
                            <h1 className="text-sm font-bold">
                                Showing {filteredProducts.length} results for "{id === 'all' ? 'All Products' : id}"
                            </h1>
                        </div>
                        <div className="flex items-center gap-6 px-4 py-2 border-b overflow-x-auto whitespace-nowrap scrollbar-hide">
                            <span className="text-sm font-bold">Sort By</span>
                            <button
                                onClick={() => setSortOrder('popularity')}
                                className={`text-sm ${sortOrder === 'popularity' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'} pb-1`}
                            >
                                Popularity
                            </button>
                            <button
                                onClick={() => setSortOrder('low')}
                                className={`text-sm ${sortOrder === 'low' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'} pb-1`}
                            >
                                Price -- Low to High
                            </button>
                            <button
                                onClick={() => setSortOrder('high')}
                                className={`text-sm ${sortOrder === 'high' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'} pb-1`}
                            >
                                Price -- High to Low
                            </button>
                            <button className="text-sm text-gray-600 pb-1">Newest First</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    {filteredProducts.length === 0 && (
                        <div className="bg-white p-20 text-center rounded-sm">
                            <p className="text-lg font-medium">No products found fitting these filters</p>
                            <button onClick={() => setPriceRange(200000)} className="text-primary mt-2">Clear all filters</button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CategoryPage;
