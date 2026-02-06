"use client";
import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="card group p-4 flex flex-col h-full bg-white">
            <Link href={`/product/${product.id}`} className="flex-1">
                <div className="relative aspect-square mb-4 overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1 group-hover:text-primary">
                    {product.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        {product.rating} <Star className="w-2.5 h-2.5 fill-current" />
                    </div>
                    <span className="text-gray-400 text-xs font-medium">({product.reviews.toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                        <>
                            <span className="text-gray-400 line-through text-sm">₹{product.originalPrice.toLocaleString()}</span>
                            <span className="text-green-600 text-xs font-bold">{product.discount}% off</span>
                        </>
                    )}
                </div>
            </Link>
            <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-accent-yellow hover:bg-orange-500 text-white font-bold py-2 rounded-sm text-sm transition-colors uppercase"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
