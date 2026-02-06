"use client";
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

const AdminProducts = () => {
    const { products, deleteProduct, addProduct, updateProduct } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({ title: '', price: '', category: '', stock: '' });

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({ title: product.title, price: product.price, category: product.category, stock: product.stock });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            updateProduct({ ...editingProduct, ...formData, price: Number(formData.price), stock: Number(formData.stock) });
        } else {
            addProduct({ ...formData, price: Number(formData.price), stock: Number(formData.stock), image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', rating: 4.0, reviews: 0, specs: {} });
        }
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({ title: '', price: '', category: '', stock: '' });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Product Management</h2>
                <button
                    onClick={() => { setEditingProduct(null); setFormData({ title: '', price: '', category: '', stock: '' }); setIsModalOpen(true); }}
                    className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-lg font-bold hover:bg-primary-dark shadow-md"
                >
                    <Plus className="w-5 h-5" /> Add Product
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b flex items-center gap-4">
                    <div className="flex-1 max-w-sm flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border">
                        <Search className="w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search products..." className="bg-transparent outline-none text-sm w-full" />
                    </div>
                </div>

                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                        <tr>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {products.map(product => (
                            <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img src={product.image} alt="" className="w-10 h-10 object-contain bg-white rounded border" />
                                    <span className="font-medium max-w-xs truncate">{product.title}</span>
                                </td>
                                <td className="px-6 py-4 text-slate-500">{product.category}</td>
                                <td className="px-6 py-4 font-bold">₹{product.price.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {product.stock} left
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => handleEdit(product)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-full"><Edit className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">
                        <h3 className="text-xl font-bold mb-6">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Product Title</label>
                                <input
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-primary"
                                    type="text"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Price</label>
                                    <input
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-primary"
                                        type="number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Stock</label>
                                    <input
                                        required
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-primary"
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="Electronics">Electronics</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Home & Furniture">Home & Furniture</option>
                                </select>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 py-3 rounded-lg font-bold">Cancel</button>
                                <button type="submit" className="flex-1 bg-primary text-white py-3 rounded-lg font-bold">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
