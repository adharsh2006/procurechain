"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Loader2, CheckCircle2, QrCode } from "lucide-react";

interface IoTData {
    weight: number;
    grade: string;
    verified: boolean;
}

export default function IoTScanner({ onScanComplete }: { onScanComplete: (data: IoTData) => void }) {
    const { t, speak } = useLanguage();
    const [scanning, setScanning] = useState(false);
    const [scannedData, setScannedData] = useState<IoTData | null>(null);

    const handleScan = () => {
        setScanning(true);
        // Simulate Camera/Connectivity Delay
        setTimeout(() => {
            const mockData = {
                weight: 520, // 5.2 Quintals (520kg)
                grade: "A+",
                verified: true
            };
            setScannedData(mockData);
            setScanning(false);
            onScanComplete(mockData);
            speak("iot_verified");
        }, 2000);
    };

    if (scannedData) {
        return (
            <div className="bg-emerald-950/30 border border-emerald-500/50 p-4 rounded-xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-wider">{t('iot_verified')}</h4>
                    <p className="text-white font-mono text-lg">
                        {scannedData.weight} Kg <span className="text-slate-400">|</span> Grade {scannedData.grade}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="border-2 border-dashed border-green-800 rounded-xl p-8 flex flex-col items-center justify-center bg-black/20 hover:bg-black/40 transition-all cursor-pointer group" onClick={handleScan}>
            {scanning ? (
                <>
                    <Loader2 className="w-12 h-12 text-green-500 animate-spin mb-3" />
                    <p className="text-green-400 font-mono text-sm animate-pulse">Connecting to IoT Scale...</p>
                </>
            ) : (
                <>
                    <div className="w-16 h-16 bg-green-900/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <QrCode className="w-8 h-8 text-green-500" />
                    </div>
                    <p className="text-slate-300 font-medium">Tap to Scan Scale QR</p>
                    <p className="text-xs text-slate-500 mt-1">Verifies Weight & Quality Instantly</p>
                </>
            )}
        </div>
    );
}
