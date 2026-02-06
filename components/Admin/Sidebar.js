"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Users, Image as ImageIcon, LogOut, Home } from 'lucide-react';

const AdminSidebar = () => {
    const pathname = usePathname();

    const menu = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Products', path: '/admin/products', icon: ShoppingBag },
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'CMS', path: '/admin/cms', icon: ImageIcon },
    ];

    return (
        <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col p-4 fixed left-0">
            <h1 className="text-xl font-bold mb-8 flex items-center gap-2">
                <span className="bg-primary p-1 rounded">FC</span> Admin Panel
            </h1>

            <nav className="flex-1 space-y-2">
                {menu.map(item => (
                    <Link
                        key={item.name}
                        href={item.path}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${pathname === item.path ? 'bg-primary text-white' : 'hover:bg-slate-800 text-slate-400'}`}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
                <Link href="/" className="flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:bg-slate-800">
                    <Home className="w-5 h-5" /> Back to Site
                </Link>
                <button className="flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-400/10">
                    <LogOut className="w-5 h-5" /> Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
