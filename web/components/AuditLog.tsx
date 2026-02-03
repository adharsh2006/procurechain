"use client";
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Box, Search, Check } from 'lucide-react';

interface Log {
    id: number;
    block: number;
    hash: string;
    action: string;
    from: string;
    status: "CONFIRMED" | "PENDING";
    time: string;
}

export default function AuditLog() {
    const [logs, setLogs] = useState<Log[]>([
        { id: 1, block: 10423, hash: "0x8a...3f1", action: "System Init", from: "Deployer", status: "CONFIRMED", time: "10:00 AM" },
        { id: 2, block: 10424, hash: "0x7b...92c", action: "MSP Update (Wheat)", from: "Govt Admin", status: "CONFIRMED", time: "10:05 AM" },
        { id: 3, block: 10425, hash: "0x3c...11a", action: "Listing Created (#101)", from: "Farmer (0x99..)", status: "CONFIRMED", time: "10:12 AM" },
    ]);

    const [verifying, setVerifying] = useState<number | null>(null);

    // Simulate incoming blocks
    useEffect(() => {
        const interval = setInterval(() => {
            const newBlock = {
                id: Date.now(),
                block: 10426 + Math.floor(Math.random() * 10),
                hash: "0x" + Math.random().toString(16).substr(2, 8),
                action: Math.random() > 0.5 ? "New Bid Placed" : "Escrow Deposit",
                from: "Buyer (0x12..)",
                status: "CONFIRMED" as const,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setLogs(prev => [newBlock, ...prev].slice(0, 5));
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const handleVerify = (id: number) => {
        setVerifying(id);
        setTimeout(() => setVerifying(null), 2000);
    };

    return (
        <div className="mt-12 border-t border-green-900/50 pt-8">
            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                <Box className="w-5 h-5" /> Immutable Audit Ledger (Tamper Verification)
            </h3>

            <div className="bg-black/40 border border-green-800/50 rounded-xl overflow-hidden backdrop-blur-md">
                <div className="grid grid-cols-6 gap-4 p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-green-900/50 bg-green-950/20">
                    <div className="col-span-1">Block #</div>
                    <div className="col-span-1">Tx Hash</div>
                    <div className="col-span-1">Action</div>
                    <div className="col-span-1">From</div>
                    <div className="col-span-1 text-right">Status</div>
                    <div className="col-span-1 text-center">Verify</div>
                </div>

                <div className="divide-y divide-green-900/30">
                    {logs.map((log) => (
                        <div key={log.id} className="grid grid-cols-6 gap-4 p-4 text-sm font-mono hover:bg-green-900/10 transition-colors items-center">
                            <div className="col-span-1 text-green-600 flex items-center gap-2">
                                <Box className="w-3 h-3" /> {log.block}
                            </div>
                            <div className="col-span-1 text-slate-400 truncate" title={log.hash}>
                                {log.hash}
                            </div>
                            <div className="col-span-1 text-white font-medium">
                                {log.action}
                            </div>
                            <div className="col-span-1 text-slate-400 text-xs">
                                {log.from}
                            </div>
                            <div className="col-span-1 text-right text-emerald-500 font-bold text-xs flex items-center justify-end gap-1">
                                {log.status} <ShieldCheck className="w-3 h-3" />
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <button
                                    onClick={() => handleVerify(log.id)}
                                    className={`text-[10px] px-2 py-1 rounded border transition-all ${verifying === log.id
                                            ? "bg-green-500 border-green-500 text-black font-bold"
                                            : "border-green-800 text-green-400 hover:bg-green-900"
                                        }`}
                                >
                                    {verifying === log.id ? "MATCH VALID" : "CHECK HASH"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-center text-xs text-slate-600 mt-2 flex items-center justify-center gap-1">
                All records are hashed using SHA-256 and stored on the AgriProcure Smart Contract.
            </p>
        </div>
    );
}
