"use client";
import React from 'react';
import mockData from '@/data/mockData.json';

const CategoryMenu = () => {
    return (
        <div className="bg-white shadow-sm mb-4">
            <div className="container-custom flex justify-between py-4 overflow-x-auto scrollbar-hide gap-4 md:gap-8 px-4 md:px-0">
                {mockData.categories.map((cat, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 cursor-pointer group min-w-[70px] flex-shrink-0">
                        <div className="w-16 h-16 relative">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <span className="text-[14px] font-medium text-[#212121] text-center whitespace-nowrap group-hover:text-primary transition-colors">
                            {cat.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryMenu;
