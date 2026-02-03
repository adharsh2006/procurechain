"use client";
import { useState } from "react";
import { ShieldCheck, FileCheck, Users, Activity, Lock, Key, Menu, Bell, CheckCircle } from "lucide-react";

export default function OfficerDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [approvingId, setApprovingId] = useState<string | null>(null);

    const handleApprove = (id: string) => {
        setApprovingId(id);
        // Simulate Digital Signature Delay
        setTimeout(() => {
            alert(`Tender ${id} Approved! Digital Signature Appended on Blockchain.`);
            setApprovingId(null);
        }, 2000);
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
                        <NavLink icon={<FileCheck size={20} />} label="Pending Approvals" active />
                        <NavLink icon={<Users size={20} />} label="Vendor Registry" />
                        <NavLink icon={<Activity size={20} />} label="System Health" />
                    </nav>

                    <div className="p-4 border-t border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">PO</div>
                            <div>
                                <div className="text-sm font-medium">Rajesh Verma</div>
                                <div className="text-xs text-slate-400">Chief Officer</div>
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
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded-full border border-indigo-200 flex items-center gap-1">
                            <Key size={12} /> Admin Access Level 3
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Bell size={20} className="text-slate-500" />
                    </div>
                </header>

                <div className="p-6 md:p-8 overflow-y-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900">Pending Approvals</h1>
                        <p className="text-slate-500">Decrypt Sealed Bids and Attach Digital Signatures for fund release.</p>
                    </div>

                    {/* Pending Actions Table */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-3">Reference ID</th>
                                    <th className="px-6 py-3">Description</th>
                                    <th className="px-6 py-3">Vendor</th>
                                    <th className="px-6 py-3">Bid Value</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Signature</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <Row
                                    id="APR-2026-X82"
                                    desc="Wheat Procurement - Bulk Order Grade A+"
                                    vendor="Venkatesh Logistics"
                                    value="₹ 22,50,000"
                                    status="Pending Review"
                                    loading={approvingId === "APR-2026-X82"}
                                    onApprove={() => handleApprove("APR-2026-X82")}
                                />
                                <Row
                                    id="APR-2026-X89"
                                    desc="Emergency Onion Stock - Nashik Hub"
                                    vendor="Global Exports Ltd"
                                    value="₹ 5,40,000"
                                    status="Sealed (Decrypting...)"
                                    loading={false}
                                    locked
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

import SmartValidator from "../../../components/SmartValidator";

function Row({ id, desc, vendor, value, status, loading, locked, onApprove }: any) {
    const [isValidating, setIsValidating] = useState(false);
    const [isReadyToSign, setIsReadyToSign] = useState(false);

    const handleRunValidation = () => {
        setIsValidating(true);
    };

    return (
        <>
            <tr className={`hover:bg-slate-50/50 ${isValidating ? "bg-slate-50" : ""}`}>
                <td className="px-6 py-4 font-mono text-xs text-indigo-600 font-bold">{id}</td>
                <td className="px-6 py-4 font-medium text-slate-900">{desc}</td>
                <td className="px-6 py-4 text-slate-600">{vendor}</td>
                <td className="px-6 py-4 font-bold text-slate-900">{value}</td>
                <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${locked ? "bg-amber-50 text-amber-700 border-amber-200 animate-pulse" : isReadyToSign ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}>
                        {locked ? status : isReadyToSign ? "Optimization Complete" : status}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                    {locked ? (
                        <button disabled className="text-slate-400 flex items-center gap-1 ml-auto text-xs font-bold cursor-not-allowed">
                            <Lock size={12} /> Encrypted
                        </button>
                    ) : !isReadyToSign ? (
                        <button
                            onClick={handleRunValidation}
                            disabled={isValidating}
                            className="bg-slate-900 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2 ml-auto"
                        >
                            {isValidating ? <Activity className="animate-spin" size={12} /> : <Activity size={12} />}
                            {isValidating ? "Running Smart Checks..." : "Run Auto-Validation"}
                        </button>
                    ) : (
                        <button
                            onClick={onApprove}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md shadow-emerald-200 flex items-center gap-2 ml-auto animate-in zoom-in"
                        >
                            <Key size={12} /> Sign Approval
                        </button>
                    )}
                </td>
            </tr>
            {isValidating && !isReadyToSign && (
                <tr>
                    <td colSpan={6} className="px-6 pb-6 pt-0 bg-slate-50 border-b border-slate-100">
                        <SmartValidator onComplete={() => setIsReadyToSign(true)} />
                    </td>
                </tr>
            )}
        </>
    );
}

function NavLink({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
    return (
        <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? "bg-slate-800 text-white border-l-4 border-indigo-500" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
            {icon}
            <span className="font-medium">{label}</span>
        </a>
    );
}
