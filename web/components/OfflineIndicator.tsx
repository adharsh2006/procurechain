"use client";
import { useState, useEffect } from "react";
import { WifiOff, Wifi } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function OfflineIndicator() {
    const [isOffline, setIsOffline] = useState(false);
    const { speak } = useLanguage();

    useEffect(() => {
        const handleOffline = () => {
            setIsOffline(true);
            speak("You are offline. Voice Mode is still active.");
        };
        const handleOnline = () => setIsOffline(false);

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, [speak]);

    if (!isOffline) return null;

    return (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-600/90 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-3 backdrop-blur-md animate-bounce">
            <WifiOff className="w-4 h-4" />
            <span className="text-sm font-bold">Offline Mode Active: Using Cached Voice Data</span>
        </div>
    );
}
