"use client";
import React, { useState } from "react";
import freighterApi from "@stellar/freighter-api";

interface Company {
    id: string;
    name: string;
    description: string;
    targetAmount: number;
    currentAmount: number;
    imageUrl: string;
    category: string;
}

interface InvestmentModalProps {
    company: Company;
    onClose: () => void;
    remainingAmount: number;
}

export default function InvestmentModal({ company, onClose, remainingAmount }: InvestmentModalProps) {
    const [amount, setAmount] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Sadece sayı ve nokta karakterlerine izin ver
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            setAmount(value);
            setError("");
        }
    };

    const validateAmount = (): boolean => {
        const numAmount = parseFloat(amount);

        if (!amount || isNaN(numAmount)) {
            setError("Geçerli bir miktar girin");
            return false;
        }

        if (numAmount <= 0) {
            setError("Miktar 0'dan büyük olmalıdır");
            return false;
        }

        if (numAmount > remainingAmount) {
            setError(`Maksimum yatırım miktarı: ${formatAmount(remainingAmount)}`);
            return false;
        }

        if (numAmount < 10) {
            setError("Minimum yatırım miktarı $10'dur");
            return false;
        }

        return true;
    };

    const handleInvest = async () => {
        if (!validateAmount()) return;

        setIsLoading(true);
        setError("");

        try {
            // Bu kısımda gerçek Stellar işlemi yapılacak
            // Şimdilik mock işlem
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Başarılı işlem
            alert(`${formatAmount(parseFloat(amount))} tutarında yatırımınız başarıyla gerçekleşti!`);
            onClose();

            // Sayfa yenileme veya state güncelleme burada yapılabilir
            window.location.reload();

        } catch (error) {
            console.error("Yatırım hatası:", error);
            setError("Yatırım işlemi başarısız oldu. Lütfen tekrar deneyin.");
        } finally {
            setIsLoading(false);
        }
    };

    const quickAmounts = [50, 100, 500, 1000];

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 rounded-2xl max-w-md w-full border border-purple-500/30 shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-gray-700">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white">Yatırım Yap</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-purple-300">{company.name}</h3>
                        <p className="text-gray-400 text-sm mt-1">{company.description}</p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Investment Info */}
                    <div className="bg-black/30 rounded-lg p-4 mb-6 border border-purple-500/20">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-400">Mevcut Fonlama</span>
                                <p className="text-white font-semibold">{formatAmount(company.currentAmount)}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Kalan Miktar</span>
                                <p className="text-purple-300 font-semibold">{formatAmount(remainingAmount)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Amount Input */}
                    <div className="mb-6">
                        <label className="block text-white font-medium mb-2">
                            Yatırım Miktarı (USD)
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                            <input
                                type="text"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder="0.00"
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                            />
                        </div>
                        {error && (
                            <p className="text-red-400 text-sm mt-2">{error}</p>
                        )}
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="mb-6">
                        <label className="block text-white font-medium mb-3">Hızlı Seçim</label>
                        <div className="grid grid-cols-4 gap-2">
                            {quickAmounts.map((quickAmount) => (
                                <button
                                    key={quickAmount}
                                    onClick={() => setAmount(quickAmount.toString())}
                                    disabled={quickAmount > remainingAmount}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${quickAmount > remainingAmount
                                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                            : "bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30"
                                        }`}
                                >
                                    ${quickAmount}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Investment Preview */}
                    {amount && !error && parseFloat(amount) > 0 && (
                        <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                            <h4 className="text-blue-300 font-semibold mb-2">Yatırım Özeti</h4>
                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Yatırım Miktarı:</span>
                                    <span className="text-white font-semibold">${amount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Tahmini Hisse Oranı:</span>
                                    <span className="text-blue-300 font-semibold">
                                        {((parseFloat(amount) / company.targetAmount) * 100).toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                        >
                            İptal
                        </button>
                        <button
                            onClick={handleInvest}
                            disabled={isLoading || !amount || error !== ""}
                            className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    İşleniyor...
                                </div>
                            ) : (
                                "Yatırım Yap"
                            )}
                        </button>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-4 p-3 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
                        <p className="text-yellow-300 text-xs">
                            ⚠️ Bu bir yatırım tavsiyesi değildir. Yatırım yapmadan önce riskleri değerlendirin.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}