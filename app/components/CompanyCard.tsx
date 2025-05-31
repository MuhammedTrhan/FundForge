"use client";
import React, { useState } from "react";
import InvestmentModal from "../InvestmentModal";

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
    const [showModal, setShowModal] = useState(false);

    const progressPercentage = (company.currentAmount / company.targetAmount) * 100;
    const remainingAmount = company.targetAmount - company.currentAmount;
    const isCompleted = progressPercentage >= 100;

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const handleInvestClick = () => {
        if (!isWalletConnected) {
            alert("Yatırım yapmak için önce cüzdanınızı bağlamanız gerekiyor.");
            return;
        }
        if (isCompleted) {
            alert("Bu proje hedef fonlamaya ulaştı. Yeni yatırım kabul edilmiyor.");
            return;
        }
        setShowModal(true);
    };

    return (
        <>
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
                {/* Company Image */}
                <div className="relative h-48 bg-gradient-to-br from-purple-600 to-blue-600">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h3 className="text-2xl font-bold text-white">{company.name}</h3>
                    </div>
                    {isCompleted && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Tamamlandı
                        </div>
                    )}
                </div>

                <div className="p-6">
                    {/* Company Info */}
                    <h3 className="text-xl font-bold text-white mb-2">{company.name}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{company.description}</p>

                    {/* Category Badge */}
                    <div className="mb-4">
                        <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/30">
                            {company.category === "teknoloji" ? "Teknoloji" :
                                company.category === "saglik" ? "Sağlık" : "Blockchain"}
                        </span>
                    </div>

                    {/* Progress Section */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300 text-sm">İlerleme</span>
                            <span className="text-white font-semibold">{Math.round(progressPercentage)}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                            <div
                                className={`h-2 rounded-full transition-all duration-500 ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-blue-500'
                                    }`}
                                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                            ></div>
                        </div>

                        {/* Amount Info */}
                        <div className="flex justify-between items-center text-sm">
                            <div>
                                <span className="text-gray-400">Toplanan: </span>
                                <span className="text-white font-semibold">{formatAmount(company.currentAmount)}</span>
                            </div>
                            <div>
                                <span className="text-gray-400">Hedef: </span>
                                <span className="text-white font-semibold">{formatAmount(company.targetAmount)}</span>
                            </div>
                        </div>

                        {!isCompleted && (
                            <div className="mt-2">
                                <span className="text-purple-300 text-sm">
                                    Kalan: {formatAmount(remainingAmount)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Investment Button */}
                    <button
                        onClick={handleInvestClick}
                        disabled={isCompleted}
                        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${isCompleted
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : isWalletConnected
                                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
                                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                            }`}
                    >
                        {isCompleted
                            ? "Fonlama Tamamlandı"
                            : isWalletConnected
                                ? "Yatırım Yap"
                                : "Cüzdan Bağla"
                        }
                    </button>

                    {isCompleted && (
                        <div className="mt-3 p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                            <p className="text-blue-300 text-xs">
                                ✅ Bu proje hedef fonlamaya ulaştı! Yatırımcılara hisse dağıtımı yakında başlayacak.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Investment Modal */}
            {showModal && (
                <InvestmentModal
                    company={company}
                    onClose={() => setShowModal(false)}
                    remainingAmount={remainingAmount}
                />
            )}
        </>
    );
}