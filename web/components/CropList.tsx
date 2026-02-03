"use client";
import { Mic, Eye, Gavel } from "lucide-react";
import { useState } from "react";
import PaymentModal from "./PaymentModal";

const MOCK_CROPS = [
    { id: 1, crop: "Wheat (Sharbati)", farmer: "Palanisaamy", qty: "50 Qt", lowestBid: "₹2,100", msp: "₹2,125", status: "BIDDING" },
    { id: 2, crop: "Basmati Rice", farmer: "Senthil", qty: "100 Qt", lowestBid: "₹3,900", msp: "₹3,800", status: "SOLD" },
    { id: 3, crop: "Red Onion", farmer: "Bala", qty: "200 Qt", lowestBid: "₹1,400", msp: "₹1,200", status: "BIDDING" },
    { id: 4, crop: "Soybean", farmer: "Ravi", qty: "30 Qt", lowestBid: "₹4,100", msp: "₹4,000", status: "ESCROW" },
    { id: 5, crop: "Turmeric", farmer: "Palanisaamy", qty: "25 Qt", lowestBid: "₹6,100", msp: "₹6,000", status: "LISTED" },
];

interface CropListProps {
    viewMode: string;
}

export default function CropList({ viewMode }: CropListProps) {
    const [selectedCrop, setSelectedCrop] = useState<{ name: string, price: string } | null>(null);

    const handleBuy = (crop: any) => {
        setSelectedCrop({
            name: crop.crop,
            price: crop.lowestBid
        });
    };

    // Filter Logic
    const filteredCrops = MOCK_CROPS.filter(c => {
        if (viewMode === 'farmer') return c.farmer === 'Palanisaamy';
        return true;
    });

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCrops.map((c) => {
                    const bidVal = parseInt(c.lowestBid.replace(/[^0-9]/g, ''));
                    const mspVal = parseInt(c.msp.replace(/[^0-9]/g, ''));
                    const safe = bidVal >= mspVal;

                    const isMyListing = c.farmer === 'Palanisaamy';

                    return (
                        <div key={c.id} className="bg-green-950/30 border border-green-800/50 rounded-xl p-6 hover:border-green-500/50 transition-all group relative overflow-hidden backdrop-blur-sm">
                            <div className="absolute top-0 right-0 p-2 opacity-50 font-mono text-xs text-green-400">ID #{c.id}</div>

                            <div className="flex justify-between items-start mb-4">
                                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-amber-500/20 text-amber-500 border border-amber-500/20">
                                    {c.crop}
                                </span>
                                <span className={`px-2 py-1 rounded text-xs font-bold tracking-wide flex items-center gap-1 ${c.status === 'BIDDING' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
                                    }`}>
                                    <span className={`w-2 h-2 rounded-full ${c.status === 'BIDDING' ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`}></span>
                                    {c.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl">
                                    {isMyListing ? "👤" : "👨‍🌾"}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                                        {isMyListing ? "You (Palanisaamy)" : c.farmer}
                                    </h3>
                                    <p className="text-xs text-slate-400">Tamil Nadu, District Erode</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6 bg-black/20 p-3 rounded-lg">
                                <div className="flex justify-between text-sm text-slate-300">
                                    <span>Quantity</span>
                                    <span className="text-white font-mono font-bold">{c.qty}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-300">
                                    <span>Govt MSP</span>
                                    <span className="text-yellow-400 font-mono">{c.msp}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-300">
                                    <span>Mandi Rate (Ref)</span>
                                    <span className="text-blue-400 font-mono text-xs">₹2,200 (Live)</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-300">
                                    <span>Current Bid</span>
                                    <span className={`font-mono font-bold ${safe ? 'text-green-400' : 'text-red-500'}`}>
                                        {c.lowestBid} {!safe && "⚠️"}
                                    </span>
                                </div>
                            </div>

                            {/* Conditional Actions based on View Mode */}
                            <div className="flex gap-2">
                                {viewMode === 'buyer' && (
                                    <>
                                        <button
                                            onClick={() => handleBuy(c)}
                                            className="flex-1 bg-green-700 hover:bg-green-600 text-white py-3 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-green-900/50 flex items-center justify-center gap-2"
                                        >
                                            Place Sealed Bid
                                        </button>
                                        <button className="w-12 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center justify-center transition-colors">
                                            <Mic size={14} />
                                        </button>
                                    </>
                                )}

                                {viewMode === 'farmer' && (
                                    <button className="w-full bg-slate-800 text-slate-400 py-3 rounded-lg text-xs font-bold cursor-default border border-slate-700">
                                        Waiting for Bids...
                                    </button>
                                )}

                                {viewMode === 'official' && (
                                    <button className="w-full bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 py-3 rounded-lg text-sm font-bold border border-blue-800/50 flex items-center justify-center gap-2">
                                        <Eye size={14} /> Inspect Listing
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Payment Modal (Only renders content if active) */}
            <PaymentModal
                isOpen={!!selectedCrop}
                onClose={() => setSelectedCrop(null)}
                amount={selectedCrop?.price || "0"}
                cropName={selectedCrop?.name || ""}
            />
        </>
    );
}
