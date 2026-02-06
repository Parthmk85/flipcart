"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import mockData from '@/data/mockData.json';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState(mockData.products);
    const [banners, setBanners] = useState(mockData.banners);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // Load cart and user from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('flipcart-cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }

        const savedUser = localStorage.getItem('flipcart-user');
        const token = localStorage.getItem('flipcart-token');
        if (savedUser && token) {
            setUser(JSON.parse(savedUser));
            setIsLoggedIn(true);
        }
    }, []);

    // Save cart to local storage on change
    useEffect(() => {
        localStorage.setItem('flipcart-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return removeFromCart(id);
        setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    };

    const clearCart = () => setCart([]);

    // Admin Methods (Mocked)
    const updateProduct = (updatedProduct) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    const addProduct = (newProduct) => {
        setProducts(prev => [...prev, { ...newProduct, id: Date.now().toString() }]);
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const updateCMS = (newBanners) => {
        setBanners(newBanners);
    };

    const login = async (email, password) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setUser(data.user);
            setIsLoggedIn(true);
            localStorage.setItem('flipcart-user', JSON.stringify(data.user));
            localStorage.setItem('flipcart-token', data.token);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const signup = async (userData) => {
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('flipcart-user');
        localStorage.removeItem('flipcart-token');
    };

    return (
        <CartContext.Provider value={{
            cart, addToCart, removeFromCart, updateQuantity, clearCart,
            products, updateProduct, addProduct, deleteProduct,
            banners, updateCMS,
            isLoggedIn, user, login, signup, logout
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
