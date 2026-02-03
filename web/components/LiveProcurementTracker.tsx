"use client";
import { Check, Clock, Package, FileText, Truck, Landmark } from "lucide-react";

interface TrackerProps {
    status: "LISTED" | "BIDDING" | "LOCKED" | "APPROVED" | "PAID";
    currentStep: number; // 0 to 4
}

export default function LiveProcurementTracker({ status, currentStep }: TrackerProps) {
    const steps = [
        { id: 0, label: "Farmer Listed", icon: Package, date: "Oct 24, 10:00 AM" },
        { id: 1, label: "Bidding Live", icon: Clock, date: "Oct 25, 02:00 PM" },
        { id: 2, label: "L1 Locked", icon: FileText, date: "Oct 26, 05:30 PM" },
        { id: 3, label: "Quality Approved", icon: Check, date: "PENDING" },
        { id: 4, label: "Payment Released", icon: Landmark, date: "PENDING" },
    ];

    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between relative px-4">
                {/* Progress Bar Background */}
                <div className="absolute top-5 left-8 right-8 h-1 bg-slate-200 -z-10" />

                {/* Progress Bar Fill */}
                <div
                    className="absolute top-5 left-8 h-1 bg-blue-600 -z-10 transition-all duration-1000 ease-in-out"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100 - 5}%` }}
                />

                {steps.map((step, idx) => {
                    const isCompleted = idx <= currentStep;
                    const isCurrent = idx === currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-2">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500
                                ${isCompleted ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-200 text-slate-300"}
                                ${isCurrent ? "ring-4 ring-blue-100 scale-110" : ""}
                                `}
                            >
                                <step.icon size={16} />
                            </div>
                            <div className="text-center">
                                <div className={`text-xs font-bold ${isCompleted ? "text-slate-900" : "text-slate-400"}`}>
                                    {step.label}
                                </div>
                                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                                    {idx > currentStep ? "--" : step.date}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Real-time Pulse */}
            <div className="mt-8 flex justify-center">
                <div className="bg-slate-900 text-slate-200 px-4 py-2 rounded-full text-xs font-mono flex items-center gap-2 shadow-lg">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Live Tracking ID: <span className="text-white font-bold">#TRK-992-882</span>
                </div>
            </div>
        </div>
    );
}
