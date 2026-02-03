"use client";
import { useState } from "react";
import { X, Gavel, ShieldCheck, Lock, AlertTriangle } from "lucide-react";

interface BidModalProps {
    isOpen: boolean;
    onClose: () => void;
    tenderId: string;
    currentL1: number;
    commodity: string;
}

export default function BidModal({ isOpen, onClose, tenderId, currentL1, commodity }: BidModalProps) {
    const [bidAmount, setBidAmount] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate Blockchain Transaction
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setSuccess(true);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">

                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={24} />
                </button>

                {!success ? (
                    <>
                        <div className="bg-slate-50 border-b border-slate-100 p-6">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Gavel className="text-blue-600" />
                                Place Secure Bid
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">
                                Tender: <span className="font-mono font-medium text-slate-700">{tenderId}</span> • {commodity}
                            </p>
                        </div>

                        <div className="p-6 space-y-6">

                            {/* Sealed Bid Notice */}
                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-start gap-3">
                                <Lock className="text-slate-400 mt-1" size={20} />
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">Blind Sealed Bid</h4>
                                    <p className="text-xs text-slate-500">
                                        You are submitting a closed envelope bid. Competitor prices are hidden.
                                        Winner is revealed only after deadline.
                                    </p>
                                </div>
                            </div>

                            {/* Input Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Your Bid Amount (₹ / MT)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3.5 text-slate-400 font-bold">₹</span>
                                    <input
                                        type="number"
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg font-bold text-slate-900 transition-all placeholder:font-normal placeholder:text-slate-300"
                                        placeholder="Enter your best offer..."
                                    />
                                </div>
                            </div>

                            {/* Encryption Notice */}
                            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
                                <Lock size={12} />
                                <span>Bid amount will be <strong>hashed & encrypted</strong> before submitting to blockchain.</span>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={!bidAmount || isSubmitting}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 text-lg transition-all"
                            >
                                {isSubmitting ? (
                                    <>Processing <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /></>
                                ) : (
                                    "Confirm & Sign Bid"
                                )}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6 animate-in zoom-in spin-in-180 duration-500">
                            <ShieldCheck size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Bid Submitted!</h3>
                        <p className="text-slate-500 mb-8">
                            Transaction Hash: <span className="font-mono bg-slate-100 px-1 rounded text-slate-700">0x8f2...9a1</span>
                            <br />
                            Your bid is now recorded on the immutable ledger.
                        </p>
                        <button onClick={onClose} className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl">
                            Return to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
