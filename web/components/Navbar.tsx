"use client";
import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Sprout, ShoppingBag, Shield } from "lucide-react";

interface NavbarProps {
    role: string;
    setRole: (role: string) => void;
}

export default function Navbar({ role, setRole }: NavbarProps) {
    const [wallet, setWallet] = useState<string | null>(null);
    const { t, setLanguage, language } = useLanguage();

    const connectWallet = async () => {
        setWallet("0x71...9A2");
    };

    const roles = [
        { id: 'farmer', label: 'Farmer', icon: Sprout },
        { id: 'buyer', label: 'Buyer', icon: ShoppingBag },
        { id: 'official', label: 'Official', icon: Shield },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#051c14]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl">
            <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">

                {/* Brand */}
                <div className="flex flex-col">
                    <span className="text-lg font-black tracking-tighter text-white leading-none">
                        AGRI<span className="text-blue-500">PULSE</span>
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest pl-0.5">SmartTrade Hub</span>
                </div>

                {/* Role Switcher (Compact Segmented Control) */}
                <div className="flex bg-black/40 rounded-lg p-1 border border-white/10">
                    {roles.map((r) => {
                        const Icon = r.icon;
                        const isActive = role === r.id;
                        return (
                            <button
                                key={r.id}
                                onClick={() => setRole(r.id)}
                                className={`p-2 rounded-md transition-all ${isActive
                                    ? "bg-green-600 text-white shadow-lg"
                                    : "text-slate-500 hover:text-green-400"
                                    }`}
                                title={r.label}
                            >
                                <Icon className="w-4 h-4" />
                            </button>
                        );
                    })}
                </div>

                {/* Wallet/Lang (Tiny) */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-300"
                    >
                        {language.toUpperCase()}
                    </button>
                    <div className={`w-2 h-2 rounded-full ${wallet ? "bg-green-500 shadow-[0_0_10px_#22c55e]" : "bg-slate-600"}`}></div>
                </div>
            </div>
        </nav>
    );
}
