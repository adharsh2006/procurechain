import { ArrowRight, ShieldCheck } from "lucide-react";

interface RoleCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick: () => void;
    colorClass: string;
    buttonText?: string;
}

export default function RoleCard({ title, description, icon, onClick, colorClass, buttonText }: RoleCardProps) {
    return (
        <div
            onClick={onClick}
            className="group relative bg-white border border-slate-200 p-6 rounded-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden"
        >
            <div className={`absolute top-0 left-0 w-1 h-full ${colorClass}`}></div>

            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg bg-opacity-10 ${colorClass.replace('bg-', 'bg-opacity-10 text-')}`}>
                    {icon}
                </div>
                <ShieldCheck className="text-slate-200 group-hover:text-slate-300 transition-colors" size={24} />
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">{description}</p>

            <div className="flex items-center text-sm font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">
                {buttonText || "Access Portal"} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    );
}
