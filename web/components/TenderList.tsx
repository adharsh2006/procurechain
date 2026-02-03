"use client";
import Link from 'next/link';

// Mock Data representing Indian Defence Tenders
const MOCK_TENDERS = [
  { id: 1, title: "High Mobility Vehicle 6x6", category: "Capital", end: "2h 15m", status: "OPEN", bids: 12, amount: "₹15.5 Cr" },
  { id: 2, title: "Night Vision Goggles (Gen 3)", category: "Revenue", end: "Closed", status: "REVIEW", bids: 45, amount: "₹2.3 Cr" },
  { id: 3, title: "155mm Artillery Ammunition", category: "Capital", end: "5d 12h", status: "OPEN", bids: 8, amount: "₹120.0 Cr" },
];

export default function TenderList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_TENDERS.map((t) => (
        <div key={t.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-50 font-mono text-xs text-slate-500">#{t.id.toString().padStart(4, '0')}</div>
          
          <div className="flex justify-between items-start mb-4">
            <span className={`px-2 py-1 rounded text-xs font-bold tracking-wide ${
              t.category === 'Capital' ? 'bg-amber-500/10 text-amber-500' : 'bg-purple-500/10 text-purple-500'
            }`}>
              {t.category.toUpperCase()}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-bold tracking-wide flex items-center gap-1 ${
              t.status === 'OPEN' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
            }`}>
              <span className={`w-2 h-2 rounded-full ${t.status === 'OPEN' ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`}></span>
              {t.status}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">{t.title}</h3>
          
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Est. Value</span>
              <span className="text-slate-200 font-mono">{t.amount}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-400">
              <span>Bids Received</span>
              <span className="text-slate-200 font-mono">{t.bids}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-400">
              <span>Time Left</span>
              <span className="text-red-400 font-mono">{t.end}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
              View Specs
            </button>
            {t.status === 'OPEN' && (
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
                Bid Now
              </button>
            )}
            {t.status === 'REVIEW' && (
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20">
                Reveal
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
