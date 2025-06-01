import React, { useState } from 'react';
import freighterApi from '@stellar/freighter-api';

interface WalletConnectionProps {
    publicKey: string | null;
    setPublicKey: (key: string | null) => void;
}

export default function WalletConnection({ publicKey, setPublicKey }: WalletConnectionProps) {
    const [isConnecting, setIsConnecting] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const connectWallet = async () => {
        setIsConnecting(true);
        try {
            const publicKey = await freighterApi.getPublicKey();
            setPublicKey(publicKey);
        } catch (error) {
            console.error('Error connecting wallet:', error);
            // You might want to show a toast notification here
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnectWallet = () => {
        setPublicKey(null);
        setShowDropdown(false);
    };

    const copyPublicKey = async () => {
        if (publicKey) {
            await navigator.clipboard.writeText(publicKey);
            // You might want to show a toast notification here
            setShowDropdown(false);
        }
    };

    const truncateAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    if (publicKey) {
        return (
            <div className="relative">
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm border-2 border-green-500/30 hover:border-green-400/50 text-white px-6 py-3 rounded-xl transition-all duration-300 focus-ring group"
                >
                    {/* Status indicator */}
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                        <span className="text-sm font-medium">
                            {truncateAddress(publicKey)}
                        </span>
                    </div>

                    {/* Dropdown arrow */}
                    <svg
                        className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown menu */}
                {showDropdown && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowDropdown(false)}
                        ></div>

                        {/* Menu */}
                        <div className="absolute right-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl z-20 overflow-hidden">
                            {/* Header */}
                            <div className="p-4 border-b border-gray-700/50 bg-gradient-to-r from-green-600/10 to-emerald-600/10">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold">Cüzdan Bağlı</p>
                                        <p className="text-green-400 text-xs font-mono">{truncateAddress(publicKey)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu items */}
                            <div className="py-2">
                                <button
                                    onClick={copyPublicKey}
                                    className="w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors flex items-center space-x-3"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <span>Adresi Kopyala</span>
                                </button>

                                <button
                                    onClick={() => {/* Add view on explorer functionality */ }}
                                    className="w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors flex items-center space-x-3"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    <span>Explorer'da Görüntüle</span>
                                </button>

                                <div className="border-t border-gray-700/50 mt-2 pt-2">
                                    <button
                                        onClick={disconnectWallet}
                                        className="w-full px-4 py-3 text-left text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors flex items-center space-x-3"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Bağlantıyı Kes</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }

    return (
        <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="flex items-center space-x-3 btn-primary disabled:opacity-50 disabled:cursor-not-allowed group"
        >
            {isConnecting ? (
                <>
                    <div className="spinner"></div>
                    <span>Bağlanıyor...</span>
                </>
            ) : (
                <>
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Cüzdan Bağla</span>
                </>
            )}
        </button>
    );
}