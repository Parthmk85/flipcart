import AdminSidebar from "@/components/Admin/Sidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="flex bg-slate-100 min-h-screen">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
