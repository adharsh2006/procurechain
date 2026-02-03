"use client";
import { useState } from "react";
import { Truck, Search, FileText, Lock, Bell, ShieldCheck, Menu, Filter, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import BidModal from "../../../components/BidModal";

export default function VendorDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedTender, setSelectedTender] = useState<any>(null);
    const [isBidModalOpen, setIsBidModalOpen] = useState(false);

    const openBidModal = (tender: any) => {
        setSelectedTender(tender);
        setIsBidModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">

            {/* Sidebar (Desktop) */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}>
                <div className="h-full flex flex-col">
                    <div className="h-16 flex items-center px-6 border-b border-slate-800">
                        <ShieldCheck className="text-blue-400 mr-2" />
                        <span className="font-bold text-lg tracking-wide">ProcureChain</span>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <NavLink icon={<FileText size={20} />} label="Active Tenders" active />
                        <NavLink icon={<Lock size={20} />} label="My Sealed Bids" />
                        <NavLink icon={<Truck size={20} />} label="Logistics" />
                    </nav>

                    <div className="p-4 border-t border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">VL</div>
                            <div>
                                <div className="text-sm font-medium">Venkatesh Logistics</div>
                                <div className="text-xs text-slate-400">Class-A Contractor</div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
                    <button className="md:hidden text-slate-600" onClick={() => setSidebarOpen(!sidebarOpen)}><Menu /></button>
                    <div className="flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full border border-blue-200 flex items-center gap-1">
                            <Lock size={12} /> Secure Bidding Channel
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Bell size={20} className="text-slate-500" />
                        <div className="text-right hidden sm:block">
                            <div className="text-xs text-slate-500">Escrow Balance</div>
                            <div className="font-bold font-mono text-slate-900">₹ 25,00,000</div>
                        </div>
                    </div>
                </header>

                <div className="p-6 md:p-8 overflow-y-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900">Active Government Tenders</h1>
                        <p className="text-slate-500">Securely submit sealed bids. All inputs are encrypted before chain submission.</p>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-4 mb-6">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input type="text" placeholder="Search by Commodity or Tender ID..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50">
                            <Filter size={18} /> Filter
                        </button>
                    </div>

                    {/* Tender Listing */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-3">Tender ID</th>
                                    <th className="px-6 py-3">Commodity</th>
                                    <th className="px-6 py-3">Bid Type</th>
                                    <th className="px-6 py-3">Deadline</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { id: "GOV-TN-2026-003", title: "Public Distribution Wheat", qty: "5000 MT", due: "12 Hours", status: "Open" },
                                    { id: "GOV-TN-2026-004", title: "Mid-Day Meal Rice", qty: "2000 MT", due: "2 Days", status: "Open" },
                                    { id: "GOV-TN-2026-001", title: "Emergency Onion Stock", qty: "500 MT", due: "Closed", status: "Evaluating" },
                                ].map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4 font-mono text-xs text-blue-600 font-bold">{item.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{item.title}</div>
                                            <div className="text-xs text-slate-500">{item.qty}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 text-slate-600 font-medium">
                                                <Lock size={14} className="text-slate-400" /> Sealed
                                            </div>
                                            <div className="text-[10px] text-slate-400">Hidden until Reveal</div>
                                        </td>
                                        <td className="px-6 py-4 text-orange-600 font-bold flex items-center gap-1"><ClockIcon /> {item.due}</td>
                                        <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                                        <td className="px-6 py-4 text-right">
                                            {item.status === 'Open' ? (
                                                <button
                                                    onClick={() => openBidModal(item)}
                                                    className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2 ml-auto"
                                                >
                                                    <FileText size={12} /> Place Sealed Bid
                                                </button>
                                            ) : (
                                                <button disabled className="text-slate-400 text-xs font-medium cursor-not-allowed">
                                                    Locked
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Modal Injection */}
            {selectedTender && (
                <BidModal
                    isOpen={isBidModalOpen}
                    onClose={() => setIsBidModalOpen(false)}
                    tenderId={selectedTender.id}
                    commodity={selectedTender.title}
                    currentL1={selectedTender.l1}
                />
            )}
        </div>
    );
}

function NavLink({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
    return (
        <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? "bg-slate-800 text-white border-l-4 border-blue-500" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
            {icon}
            <span className="font-medium">{label}</span>
        </a>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles = { "Open": "bg-green-50 text-green-700 border-green-200", "Evaluating": "bg-purple-50 text-purple-700 border-purple-200 animate-pulse" };
    return <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles] || "bg-slate-100"}`}>{status}</span>;
}

function ClockIcon() { return <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }
