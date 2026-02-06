"use client";
import React from 'react';
import { useCart } from '@/context/CartContext';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

const AdminDashboard = () => {
    const { products, cart } = useCart();

    const stats = [
        { title: 'Total Revenue', value: '₹4,56,780', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
        { title: 'Total Orders', value: '1,245', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Registered Users', value: '4,890', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
        { title: 'Active Products', value: products.length, icon: Package, color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold">Dashboard Overview</h2>
                <p className="text-slate-500 text-sm">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
                        <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase">{stat.title}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold">JD</div>
                                    <div>
                                        <p className="text-sm font-bold">John Doe</p>
                                        <p className="text-xs text-slate-500">iPhone 15 Pro, Case</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold">₹72,499</p>
                                    <p className="text-[10px] text-green-600 font-bold uppercase">Paid</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Popular Categories</h3>
                    <div className="space-y-4">
                        {['Electronics', 'Fashion', 'Home & Furniture'].map((cat, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>{cat}</span>
                                    <span className="font-bold">{85 - (idx * 15)}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: `${85 - (idx * 15)}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
