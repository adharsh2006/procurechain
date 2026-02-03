"use client";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { X, ShieldCheck, Lock, Smartphone, FileKey, Database, Gavel } from "lucide-react";
import CropTimeline from "./CropTimeline";

export default function PaymentModal({ isOpen, onClose, amount, cropName }: { isOpen: boolean, onClose: () => void, amount: string, cropName: string }) {
    const { t, speak } = useLanguage();
    const [step, setStep] = useState(1); // 1: Review, 2: Hashing/Proof, 3: Success

    if (!isOpen) return null;

    const handlePayment = () => {
        setStep(2);
        // Simulate Blockchain "Mining" / Hashing Sequence
        speak("verifying_hash");

        setTimeout(() => {
            // Step 3 after delay
            setStep(3);
            speak("escrow_locked");
        }, 3500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#0a1f16] border border-green-800 w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-green-900/50">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Gavel className="text-green-400" />
                        Place Sealed Bid
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="bg-green-900/20 p-4 rounded-xl border border-green-800/50 text-center">
                                <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Your Bid Amount</p>
                                <p className="text-3xl font-mono text-white font-bold">{amount}</p>
                                <p className="text-xs text-green-400 mt-2">Crop: {cropName}</p>
                            </div>

                            <p className="text-sm text-slate-300 bg-amber-900/20 border border-amber-500/30 p-3 rounded-lg">
                                <span className="text-amber-400 font-bold">Why Lock Funds?</span> To prevent fake bids, your bid amount is locked in the Smart Contract. If you lose, it is instantly refunded.
                            </p>

                            <div className="space-y-3">
                                <button onClick={handlePayment} className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                                    <Smartphone className="w-5 h-5" /> Confirm & Hash Bid
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 py-4 text-center">
                            {/* Hashing Animation */}
                            <div className="relative w-20 h-20 mx-auto">
                                <div className="absolute inset-0 border-4 border-green-500/30 rounded-full animate-ping"></div>
                                <div className="relative bg-black border border-green-500 rounded-full w-full h-full flex items-center justify-center">
                                    <FileKey className="w-8 h-8 text-green-400 animate-pulse" />
                                </div>
                            </div>

                            <div className="space-y-2 font-mono text-xs text-left bg-black/50 p-4 rounded-lg border border-green-900/50">
                                <p className="text-green-500">&gt; Generating SHA-256 Hash...</p>
                                <p className="text-green-500 delay-75">&gt; Signing with Private Key...</p>
                                <p className="text-emerald-400 animate-pulse">&gt; Writing to Immutable Ledger...</p>
                            </div>

                            <h3 className="text-lg text-white font-bold">Encrypting Bid...</h3>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center py-2">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(34,197,94,0.6)] animate-bounce">
                                <ShieldCheck className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Bid Placed & Locked</h3>
                            <p className="text-slate-400 mb-6 px-2 text-sm">Your bid is now active. Funds are held in Escrow until the auction ends.</p>

                            {/* Integrated Timeline */}
                            <div className="mb-4 bg-black/40 p-3 rounded-xl border border-white/5">
                                <CropTimeline status="BIDDING" />
                            </div>

                            <div className="bg-black/30 p-4 rounded-xl border border-white/10 text-left space-y-2 text-xs text-slate-300">
                                <div className="flex justify-between items-center">
                                    <span>Proof of Integrity</span>
                                    <span className="text-green-400 font-bold flex items-center gap-1"><Database className="w-3 h-3" /> ON_CHAIN</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Bid Hash</span>
                                    <span className="font-mono text-green-400 truncate w-32">0x7b...92c4</span>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button onClick={onClose} className="flex-1 bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-700 font-bold transition-all">Close</button>
                                <button className="flex-1 border border-red-500/50 text-red-400 py-3 rounded-lg hover:bg-red-950/30 font-bold text-xs flex items-center justify-center gap-2">
                                    <Gavel className="w-3 h-3" /> Raise Dispute
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}
