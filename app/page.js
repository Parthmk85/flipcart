"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import CategoryMenu from '@/components/CategoryMenu';
import BannerCarousel from '@/components/BannerCarousel';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import mockData from '@/data/mockData.json';

const DealCard = ({ item }) => (
    <div className="flex flex-col items-center gap-2 border border-gray-100 p-4 hover:shadow-lg transition-shadow cursor-pointer min-w-[150px] bg-white rounded-lg">
        <div className="h-32 w-32 relative p-2">
            <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
        </div>
        <div className="text-center mt-2 w-full">
            <p className="text-xs font-medium text-gray-800 line-clamp-1 truncate">{item.title}</p>
            <p className="text-sm text-green-700 font-bold mt-1">{item.offer}</p>
        </div>
    </div>
);

const GridItem = ({ item }) => (
    <div className="flex flex-col items-center gap-2 p-2 rounded-md hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-gray-100">
        <div className="h-28 w-28 relative overflow-hidden">
            <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
            />
        </div>
        <div className="text-center w-full">
            <p className="text-[13px] text-gray-700 font-medium line-clamp-1">{item.name}</p>
            <p className="text-[14px] text-green-600 font-bold mt-0.5">{item.offer}</p>
        </div>
    </div>
);

const SectionGrid = ({ title, items, link }) => (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-full border border-gray-100 overflow-hidden">
        <div className="p-4 flex items-center justify-between border-b border-gray-50">
            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
            <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:bg-blue-600">
                <ChevronRight className="w-4 h-4" />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-3 flex-1">
            {items.slice(0, 4).map((item, idx) => (
                <GridItem key={idx} item={item} />
            ))}
        </div>
    </div>
);

export default function Home() {
    const { banners } = useCart();

    return (
        <div className="min-h-screen flex flex-col bg-[#f1f3f6]">
            <Navbar />

            <main className="flex-1 pb-10 space-y-4">
                <CategoryMenu />

                <div className="container-custom px-2 md:px-0 space-y-4">
                    {/* Banner Section */}
                    <BannerCarousel images={banners} />

                    {/* Top Deals Row */}
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex-1 bg-white shadow-sm rounded-sm">
                            <div className="flex items-center justify-between p-4 border-b">
                                <h2 className="text-xl font-bold">Top Deals</h2>
                                <button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-sm uppercase shadow-sm">
                                    View All
                                </button>
                            </div>
                            <div className="p-4 flex gap-4 overflow-x-auto scrollbar-hide">
                                {mockData.topDeals.map(deal => (
                                    <DealCard key={deal.id} item={deal} />
                                ))}
                            </div>
                        </div>
                        {/* Ad Side Panel */}
                        <div className="hidden lg:block w-[280px]">
                            <img
                                src="https://images.unsplash.com/photo-1607083206325-45158c5f9d18?w=600&q=80"
                                alt="Ad"
                                className="w-full h-full object-cover rounded-sm shadow-sm"
                            />
                        </div>
                    </div>

                    {/* 3-Column Grid Layout */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {mockData.gridSections.slice(0, 3).map((section, idx) => (
                            <SectionGrid
                                key={idx}
                                title={section.title}
                                items={section.items}
                            />
                        ))}
                    </div>

                    {/* Furniture Focus Section */}
                    <div className="bg-white p-4 rounded-sm shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Furniture Bestsellers</h2>
                            <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center">
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
                            {mockData.gridSections[1]?.items.map((item, i) => (
                                <DealCard key={i} item={{ ...item, title: item.name, offer: item.offer }} />
                            ))}
                            {mockData.topDeals.slice(0, 3).map((deal, i) => (
                                <DealCard key={i + 10} item={deal} />
                            ))}
                        </div>
                    </div>

                    {/* Bottom Promo */}
                    <div className="bg-white p-6 rounded-sm shadow-sm grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-light text-gray-500 mb-2">Flipkart Essentials</h2>
                            <p className="text-xl font-bold">Everything you need for a comfortable life.</p>
                            <button className="bg-primary text-white px-8 py-3 rounded-sm font-bold mt-6 shadow-lg hover:shadow-xl transition-shadow">
                                Explore Now
                            </button>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&q=80"
                            className="w-full h-64 object-cover rounded-lg shadow-inner"
                            alt="Essentials"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
