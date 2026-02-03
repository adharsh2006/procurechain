"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RoleCard from "../components/RoleCard";
import { User, Truck, FileText, BarChart3, ShieldAlert, Lock } from "lucide-react";
import Image from "next/image";

import LanguageSelector from "../components/LanguageSelector";
import { useLanguage } from "../context/LanguageContext";

export default function LandingPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useLanguage();

  const handleLogin = (role: string) => {
    setSelectedRole(role);
    if (role === 'FARMER') {
      router.push('/farmer');
    } else if (role === 'VENDOR') {
      router.push('/vendor');
    } else if (role === 'OFFICER') {
      router.push('/officer');
    } else if (role === 'AUDITOR') {
      router.push('/auditor');
    } else {
      alert(`Redirecting to ${role} Secure Application... (Coming Soon)`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/20">
              P
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">ProcureChain</span>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-blue-600 transition-colors">{t('platform')}</a>
              <a href="#" className="hover:text-blue-600 transition-colors">{t('governance')}</a>
              <a href="#" className="hover:text-blue-600 transition-colors">{t('contact')}</a>
            </nav>
            <div className="h-4 w-px bg-slate-300 hidden md:block"></div>
            <LanguageSelector />
            <button className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
              {t('connect_wallet')}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <header className="relative pt-20 pb-16 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-8 shadow-sm">
          <span className="block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Blockchain Network Live • Block #892,104</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
          {t('hero_title')} <span className="text-blue-700">{t('hero_immutable')}</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
          {t('hero_desc')}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-blue-700 text-white px-8 py-3.5 rounded-lg font-semibold shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center gap-2">
            <ShieldAlert size={18} /> {t('emergency_audit')}
          </button>
          <button className="bg-white text-slate-700 border border-slate-300 px-8 py-3.5 rounded-lg font-semibold hover:bg-slate-50 transition-all flex items-center gap-2">
            <FileText size={18} /> {t('view_tenders')}
          </button>
        </div>
      </header>

      {/* Role Selection Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">{t('select_portal')}</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RoleCard
            title={t('role_farmer')}
            description={t('desc_farmer')}
            icon={<User size={32} className="text-emerald-600" />}
            colorClass="bg-emerald-600"
            onClick={() => handleLogin('FARMER')}
            buttonText={t('access_portal')}
          />

          <RoleCard
            title={t('role_vendor')}
            description={t('desc_vendor')}
            icon={<Truck size={32} className="text-blue-600" />}
            colorClass="bg-blue-600"
            onClick={() => handleLogin('VENDOR')}
            buttonText={t('access_portal')}
          />

          <RoleCard
            title={t('role_officer')}
            description={t('desc_officer')}
            icon={<ShieldAlert size={32} className="text-indigo-600" />}
            colorClass="bg-indigo-600"
            onClick={() => handleLogin('OFFICER')}
            buttonText={t('access_portal')}
          />

          <RoleCard
            title={t('role_auditor')}
            description={t('desc_auditor')}
            icon={<BarChart3 size={32} className="text-slate-600" />}
            colorClass="bg-slate-600"
            onClick={() => handleLogin('AUDITOR')}
            buttonText={t('access_portal')}
          />
        </div>
      </main>

      {/* Footer / Stats */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-slate-500 text-sm">
            © 2026 Ministry of Agri-Tech & Blockchain. Secure connection.
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">₹450 Cr+</div>
              <div className="text-xs text-slate-400 uppercase">Volume Processed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">12k+</div>
              <div className="text-xs text-slate-400 uppercase">Farmers Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">100%</div>
              <div className="text-xs text-slate-400 uppercase">Uptime</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
