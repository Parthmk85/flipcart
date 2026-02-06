"use client";
import React from 'react';
import { Search, Mail, Phone, Calendar, ShieldCheck, UserX } from 'lucide-react';

const AdminUsers = () => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+91 9876543210', joined: 'Oct 12, 2023', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+91 8887776655', joined: 'Nov 05, 2023', status: 'Active' },
        { id: 3, name: 'Mike Ross', email: 'mike@example.com', phone: '+91 9991112233', joined: 'Dec 01, 2023', status: 'Banned' },
        { id: 4, name: 'Sarah Connor', email: 'sarah@example.com', phone: '+91 7770001122', joined: 'Jan 15, 2024', status: 'Active' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">User Management</h2>
                <p className="text-slate-500 text-sm">Monitor and manage registered customers.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
                <div className="p-4 border-b flex items-center justify-between">
                    <div className="max-w-xs w-full flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border">
                        <Search className="w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Search by name, email..." className="bg-transparent outline-none text-sm w-full" />
                    </div>
                </div>

                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Contact Info</th>
                            <th className="px-6 py-4">Joined Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                                            {user.name[0]}
                                        </div>
                                        <span className="font-bold">{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 space-y-1">
                                    <div className="flex items-center gap-2 text-slate-500"><Mail className="w-3 h-3" /> {user.email}</div>
                                    <div className="flex items-center gap-2 text-slate-500"><Phone className="w-3 h-3" /> {user.phone}</div>
                                </td>
                                <td className="px-6 py-4 text-slate-500 flex items-center gap-2 mt-4">
                                    <Calendar className="w-3 h-3" /> {user.joined}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button className="text-primary hover:bg-primary/10 p-2 rounded-full" title="Verify"><ShieldCheck className="w-4 h-4" /></button>
                                    <button className="text-red-500 hover:bg-red-50 p-2 rounded-full" title="Ban User"><UserX className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
