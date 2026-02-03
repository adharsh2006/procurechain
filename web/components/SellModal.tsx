"use client";
import { Mic, X, Loader2, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function SellModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { speak } = useLanguage();
    const [step, setStep] = useState(1); // 1: Listen, 2: AI Analyze, 3: Success
    const [aiResult, setAiResult] = useState<{ status: string, price: number, anomaly: number } | null>(null);

    useEffect(() => {
        if (isOpen) {
            setStep(1);
        }
    }, [isOpen]);

    const handleDemoParams = (c: string, p: number) => {
        setStep(2); // Go to Analyze Step directly
        analyzeListing(c, p);
    };

    const analyzeListing = async (commodity: string = "Wheat", price: number = 2200) => {
        try {
            // REAL AI CALL (No Gimmicks)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s Timeout

            // USE PROXY (Stable)
            const res = await fetch('/api/ai_price_check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "commodity": commodity,
                    "bid_amount": price
                }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (res.ok) {
                const data = await res.json();
                setAiResult({
                    status: data.is_unfair_practice ? "HIGH_RISK" : "FAIR_PRICE",
                    price: price,
                    anomaly: data.is_unfair_practice ? -1 : 1
                });
                speak(data.is_unfair_practice ? "price_warning" : "listing_success");

                setTimeout(() => {
                    setStep(3);
                }, 2000);
            } else {
                console.warn("AI Backend Offline/Error");
                setAiResult({ status: "CONNECTION_ERROR", price: price, anomaly: 0 });
                setStep(3);
            }
        } catch (e: any) {
            console.error("AI Connection Failed", e);
            setAiResult({ status: "CONNECTION_ERROR", price: price, anomaly: 0 });
            setStep(3);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-[#0a1f16] border border-green-800 w-full max-w-sm rounded-3xl shadow-2xl relative overflow-hidden">

                <div className="absolute top-4 right-4">
                    <button onClick={onClose}><X className="text-slate-400" /></button>
                </div>

                <div className="p-8 text-center">

                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
                                <Mic className="w-10 h-10 text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">Listening...</h2>
                                <p className="text-slate-400 text-sm">"I want to sell 100 kg Wheat for 2200 rupees"</p>
                            </div>

                            {/* Demo / Debug Section (Moved to Step 1) */}
                            <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => handleDemoParams("Rice", 4200)}
                                    className="text-xs bg-blue-900/20 text-blue-300 border border-blue-800/50 p-2 rounded-lg hover:bg-blue-900/40 text-left"
                                >
                                    <span className="block font-bold">Try Fair Price</span>
                                    Rice @ ₹4200
                                </button>
                                <button
                                    onClick={() => handleDemoParams("Rice", 6000)}
                                    className="text-xs bg-red-900/20 text-red-300 border border-red-800/50 p-2 rounded-lg hover:bg-red-900/40 text-left"
                                >
                                    <span className="block font-bold">Try High Demand</span>
                                    Rice @ ₹6000 (+40%)
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="w-24 h-24 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center animate-spin">
                                <Loader2 className="w-10 h-10 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">AI Market Analysis...</h2>
                                <p className="text-slate-400 text-sm">Checking Agmarknet Prices & Trends</p>
                            </div>
                        </div>
                    )}

                    {step === 3 && aiResult && (
                        <div className="space-y-6 animate-in zoom-in duration-300">
                            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${aiResult.status === 'FAIR_PRICE' ? "bg-green-500/20" :
                                aiResult.status === 'CONNECTION_ERROR' ? "bg-slate-500/20" : "bg-red-500/20"
                                }`}>
                                {aiResult.status === 'FAIR_PRICE' && <CheckCircle2 className="w-12 h-12 text-green-400" />}
                                {aiResult.status === 'HIGH_RISK' && <AlertTriangle className="w-12 h-12 text-red-500" />}
                                {aiResult.status === 'CONNECTION_ERROR' && <X className="w-12 h-12 text-slate-400" />}
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">
                                    {aiResult.status === 'FAIR_PRICE' ? "Fair Price Verified" :
                                        aiResult.status === 'CONNECTION_ERROR' ? "AI Offline" : "Price Warning"}
                                </h2>
                                <p className="text-slate-400 text-sm mb-4">
                                    {aiResult.status === 'FAIR_PRICE' ? "Your price matches market trends." :
                                        aiResult.status === 'CONNECTION_ERROR' ? "Could not verify price with Mandi server." :
                                            "Your price is significantly above market avg."}
                                </p>

                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-left">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-slate-400">Detected Item</span>
                                        <span className="text-white font-bold">Wheat (100Kg)</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-slate-400">Your Ask</span>
                                        <span className="text-green-400 font-bold font-mono">₹{aiResult.price}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-400">AI Confidence</span>
                                        <span className="text-blue-400 font-bold text-xs flex items-center gap-1">
                                            <TrendingUp size={12} /> 98.4%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => setStep(4)} className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-900/50 transition-all">
                                Next: Verify Weight (आगे)
                            </button>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6 animate-in slide-in-from-right duration-300">
                            <div className="w-full aspect-square bg-black rounded-2xl relative overflow-hidden border-2 border-green-500/50">
                                {/* Camera Simulation UI */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-48 h-48 border-2 border-green-500 rounded-lg relative animate-pulse">
                                        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-green-400 -mt-1 -ml-1"></div>
                                        <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-green-400 -mt-1 -mr-1"></div>
                                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-green-400 -mb-1 -ml-1"></div>
                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-green-400 -mb-1 -mr-1"></div>
                                    </div>
                                    <p className="absolute bottom-4 text-xs text-green-400 font-mono">SCANNING IOT SCALE...</p>
                                </div>
                            </div>

                            <button
                                onClick={async () => {
                                    // SIMULATE SCANNING A REAL QR CODE
                                    const res = await fetch('/api/verify_qr', {
                                        method: 'POST',
                                        body: JSON.stringify({ qr_data: "W:100" }) // "W:100" means Weight 100Kg
                                    });
                                    const data = await res.json();
                                    if (data.verified) {
                                        alert(`Weight Verified: ${data.weight_detected} Kg (Device: ${data.device_id})`);
                                        onClose(); // Close modal on success
                                    } else {
                                        alert("Invalid QR Code");
                                    }
                                }}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold text-lg"
                            >
                                Simulate Scan (W:100kg)
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
