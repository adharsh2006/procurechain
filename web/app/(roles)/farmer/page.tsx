"use client";
import { useState } from "react";
import { Mic, Leaf, TrendingUp, History, Settings, LogOut, Bell, ShieldCheck, Menu } from "lucide-react";
import FarmerWidgets from "../../../components/FarmerWidgets";
import FarmerListings from "../../../components/FarmerListings";
import SellModal from "../../../components/SellModal";
import { useLanguage } from "../../../context/LanguageContext";

export default function FarmerDashboard() {
    const { speak } = useLanguage();
    const [isSellModalOpen, setIsSellModalOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">

            {/* Sidebar (Desktop) */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}>
                <div className="h-full flex flex-col">
                    {/* Brand */}
                    <div className="h-16 flex items-center px-6 border-b border-slate-800">
                        <ShieldCheck className="text-blue-400 mr-2" />
                        <span className="font-bold text-lg tracking-wide">ProcureChain</span>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <NavLink icon={<Leaf size={20} />} label="Overview" active />
                        <NavLink icon={<TrendingUp size={20} />} label="My Listings" />
                        <NavLink icon={<History size={20} />} label="Transaction History" />
                        <div className="pt-4 pb-2">
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2">Settings</div>
                        </div>
                        <NavLink icon={<Settings size={20} />} label="Profile & KYC" />
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">RK</div>
                            <div>
                                <div className="text-sm font-medium">Ramesh Kumar</div>
                                <div className="text-xs text-slate-400">Verified Farmer</div>
                            </div>
                            <LogOut size={16} className="ml-auto text-slate-500 hover:text-white cursor-pointer" />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen">

                {/* Topbar */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
                    <button className="md:hidden text-slate-600" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Menu />
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Live Market Connection
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="text-right hidden sm:block">
                            <div className="text-xs text-slate-500">Wallet Balance</div>
                            <div className="font-bold font-mono text-slate-900">₹ 42,500.00</div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 p-6 md:p-8 overflow-y-auto">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                            <p className="text-slate-500">Welcome back, Ramesh. Here is today's market update.</p>
                        </div>

                        <button
                            onClick={() => setIsSellModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-blue-900/10 flex items-center gap-2 transition-all"
                        >
                            <Mic size={20} /> Sell Produce via Voice
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatCard label="Active Listings" value="3" subtext="2 Pending Approval" />
                        <StatCard label="Total Sales (Fy26)" value="₹ 8.5 Lakh" subtext="+12% vs last year" />
                        <StatCard label="Reputation Score" value="98/100" subtext="Top 5% in District" />
                    </div>

                    {/* Widgets (Refactored) */}
                    <FarmerWidgets />

                    {/* Listings Table (New) */}
                    <FarmerListings />

                </div>
            </main>

            {/* Modal Injection */}
            <SellModal isOpen={isSellModalOpen} onClose={() => setIsSellModalOpen(false)} />
        </div>
    );
}

function NavLink({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
    return (
        <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
            {icon}
            <span className="font-medium">{label}</span>
        </a>
    );
}

function StatCard({ label, value, subtext }: { label: string, value: string, subtext: string }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-sm font-medium text-slate-500 mb-2">{label}</div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
            <div className="text-xs text-green-600 font-medium">{subtext}</div>
        </div>
    );
}
