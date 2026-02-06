"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BannerCarousel = ({ images }) => {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1));
    const prev = () => setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1));

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative w-full h-[150px] md:h-[220px] lg:h-[280px] overflow-hidden group rounded-sm shadow-sm mt-2">
            {images.map((img, idx) => (
                <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === current ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img src={img} alt={`Banner ${idx}`} className="w-full h-full object-cover" />
                </div>
            ))}

            <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 md:p-6 shadow-xl rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <ChevronLeft className="text-gray-800 w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 md:p-6 shadow-xl rounded-l-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <ChevronRight className="text-gray-800 w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerCarousel;
