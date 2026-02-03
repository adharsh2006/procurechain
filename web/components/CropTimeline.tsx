"use client";
import { CheckCircle2, Circle } from "lucide-react";

type Status = "LISTED" | "BIDDING" | "ESCROW" | "SOLD" | "PAID";

export default function CropTimeline({ status }: { status: Status }) {
    const steps: { id: Status, label: string }[] = [
        { id: "LISTED", label: "Listed (सूचीबद्ध)" },
        { id: "BIDDING", label: "Bidding Open (बोली चालू)" },
        { id: "ESCROW", label: "Bid Won & Escrow (एस्क्रो लॉक्ड)" },
        { id: "PAID", label: "Payment Released (भुगतान)" }
    ];

    const getCurrentStepIndex = () => steps.findIndex(s => s.id === status);
    const currentIndex = getCurrentStepIndex();

    return (
        <div className="flex items-center justify-between w-full px-2">
            {steps.map((step, idx) => {
                const isCompleted = idx <= currentIndex;
                const isCurrent = idx === currentIndex;

                return (
                    <div key={step.id} className="flex flex-col items-center relative z-10 w-full group">
                        {/* Line Connector */}
                        {idx !== 0 && (
                            <div className={`absolute top-3 right-[50%] w-full h-1 -z-10 transition-colors duration-500 ${idx <= currentIndex ? 'bg-green-500' : 'bg-green-900/40'
                                }`}></div>
                        )}

                        <div className={`
                            w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-500
                            ${isCompleted ? 'bg-green-500 border-green-500' : 'bg-black border-green-900'}
                            ${isCurrent ? 'ring-4 ring-green-500/30 scale-110' : ''}
                        `}>
                            {isCompleted ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Circle className="w-4 h-4 text-green-800" />}
                        </div>
                        <span className={`text-[10px] mt-2 font-medium tracking-wide uppercase transition-colors text-center ${isCompleted ? 'text-green-400' : 'text-slate-600'}`}>
                            {step.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
