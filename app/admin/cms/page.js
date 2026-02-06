"use client";
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Image as ImageIcon, Plus, Trash2, Save, Globe } from 'lucide-react';

const AdminCMS = () => {
    const { banners, updateCMS } = useCart();
    const [newBanners, setNewBanners] = useState(banners);
    const [promoText, setPromoText] = useState("Big Billion Days Starting Soon!");

    const handleAddBanner = () => {
        setNewBanners([...newBanners, "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80"]);
    };

    const handleRemoveBanner = (idx) => {
        setNewBanners(newBanners.filter((_, i) => i !== idx));
    };

    const handleSave = () => {
        updateCMS(newBanners);
        alert("Home Page Content Updated Successfully!");
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold font-sans">Content Management</h2>
                    <p className="text-slate-500 text-sm">Update home page banners and promotional content.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-green-600 text-white flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold hover:bg-green-700 shadow-lg transition-all"
                >
                    <Save className="w-5 h-5" /> Save Changes
                </button>
            </div>

            {/* Banner Management */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold flex items-center gap-2"><ImageIcon className="w-5 h-5 text-primary" /> Home Page Banners</h3>
                    <button
                        onClick={handleAddBanner}
                        className="text-primary text-sm font-bold hover:underline flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" /> Add Banner
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {newBanners.map((banner, idx) => (
                        <div key={idx} className="relative group rounded-lg overflow-hidden border">
                            <img src={banner} alt="" className="w-full h-32 object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    onClick={() => handleRemoveBanner(idx)}
                                    className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition-transform"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <input
                                type="text"
                                value={banner}
                                onChange={(e) => {
                                    const b = [...newBanners];
                                    b[idx] = e.target.value;
                                    setNewBanners(b);
                                }}
                                className="w-full text-[10px] p-2 bg-slate-50 outline-none border-t"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Promotional Text */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
                <h3 className="font-bold flex items-center gap-2"><Globe className="w-5 h-5 text-secondary" /> Global Announcements</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Campaign Header</label>
                        <input
                            type="text"
                            value={promoText}
                            onChange={(e) => setPromoText(e.target.value)}
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary font-medium"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Campaign Theme</label>
                        <div className="flex gap-4">
                            <button className="flex-1 border p-3 rounded-lg bg-blue-50 border-blue-200 text-blue-700 font-bold text-sm">Big Billion Days</button>
                            <button className="flex-1 border p-3 rounded-lg text-slate-500 font-bold text-sm">Summer Sale</button>
                            <button className="flex-1 border p-3 rounded-lg text-slate-500 font-bold text-sm">Year End Sale</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCMS;
