"use client";
import { Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSelector() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors border border-slate-200">
                <Globe size={16} className="text-blue-600" />
                <span className="text-xs font-bold uppercase">{language}</span>
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden hidden group-hover:block z-50">
                {['en', 'hi', 'ta', 'te'].map((lang) => (
                    <button
                        key={lang}
                        onClick={() => setLanguage(lang as any)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors flex items-center gap-2 ${language === lang ? 'font-bold text-blue-600' : 'text-slate-600'}`}
                    >
                        <span className="uppercase">{lang}</span>
                        {lang === 'en' && 'English'}
                        {lang === 'hi' && 'हिंदी'}
                        {lang === 'ta' && 'தமிழ்'}
                        {lang === 'te' && 'తెలుగు'}
                    </button>
                ))}
            </div>
        </div>
    );
}
