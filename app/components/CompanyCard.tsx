import React from 'react';

interface Company {
    id: string;
    name: string;
    description: string;
    targetAmount: number;
    currentAmount: number;
    imageUrl: string;
    category: string;
}

interface CompanyCardProps {
    company: Company;
    isWalletConnected: boolean;
}

export default function CompanyCard({ company, isWalletConnected }: CompanyCardProps) {
    const progressPercentage = (company.currentAmount / company.targetAmount) * 100;
    const remainingAmount = company.targetAmount - company.currentAmount;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'teknoloji':
                return '⚡';
            case 'saglik':
                return '🏥';
            case 'blockchain':
                return '🔗';
            default:
                return '🚀';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'teknoloji':
                return 'from-blue-500 to-cyan-500';
            case 'saglik':
                return 'from-green-500 to-emerald-500';
            case 'blockchain':
                return 'from-purple-500 to-pink-500';
            default:
                return 'from-gray-500 to-slate-500';
        }
    };

    return (
        <div className="group relative">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>

            {/* Main card */}
            <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 group-hover:transform group-hover:scale-[1.02] shadow-xl">
                {/* Category badge */}
                <div className="absolute top-4 right-4 z-10">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(company.category)} text-white shadow-lg`}>
                        <span className="mr-1">{getCategoryIcon(company.category)}</span>
                        {company.category === 'teknoloji' ? 'Teknoloji' :
                            company.category === 'saglik' ? 'Sağlık' :
                                company.category === 'blockchain' ? 'Blockchain' : company.category}
                    </span>
                </div>

                {/* Company image */}
                <div className="relative mb-6 overflow-hidden rounded-xl">
                    <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                        <div className="text-6xl opacity-50">
                            {getCategoryIcon(company.category)}
                        </div>
                    </div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                    {/* Progress indicator overlay */}
                    <div className="absolute bottom-2 left-2 right-2">
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                            <div className="flex justify-between items-center text-xs text-white mb-1">
                                <span className="font-medium">İlerleme</span>
                                <span className="font-bold">{Math.round(progressPercentage)}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                                <div
                                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Company info */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-300 transition-colors">
                            {company.name}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                            {company.description}
                        </p>
                    </div>

                    {/* Funding stats */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-400">
                                    {formatCurrency(company.currentAmount)}
                                </p>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Toplanan</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-blue-400">
                                    {formatCurrency(company.targetAmount)}
                                </p>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Hedef</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-purple-400">
                                    {formatCurrency(remainingAmount)}
                                </p>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Kalan</p>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="space-y-2">
                            <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000 ease-out relative"
                                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                >
                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>{Math.round(progressPercentage)}% tamamlandı</span>
                                <span>{Math.round(100 - progressPercentage)}% kaldı</span>
                            </div>
                        </div>
                    </div>

                    {/* Action button */}
                    <div className="pt-2">
                        {isWalletConnected ? (
                            <button className="w-full btn-primary group/btn">
                                <span className="flex items-center justify-center gap-2">
                                    <span>Yatırım Yap</span>
                                    <svg
                                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </button>
                        ) : (
                            <button className="w-full btn-secondary opacity-50 cursor-not-allowed">
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>Cüzdan Bağlayın</span>
                                </span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Hover effects */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
        </div>
    );
}