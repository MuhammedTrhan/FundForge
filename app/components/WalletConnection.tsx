"use client";
import React from "react";
import freighterApi from "@stellar/freighter-api";

interface WalletConnectionProps {
    publicKey: string | null;
    setPublicKey: (key: string | null) => void;
}

export default function WalletConnection({ publicKey, setPublicKey }: WalletConnectionProps) {
    const handleConnectWallet = async () => {
        try {
            await freighterApi.setAllowed();
            const { address } = await freighterApi.getAddress();
            setPublicKey(address);
        } catch (error) {
            console.error("Cüzdan bağlanırken hata:", error);
            alert("Cüzdan bağlanırken hata oluştu. Freighter cüzdanının yüklü olduğundan emin olun.");
        }
    };

    const handleDisconnect = () => {
        setPublicKey(null);
    };

    const formatAddress = (address: string) => {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    return (
        <div className="flex items-center space-x-4">
            {publicKey ? (
                <div className="flex items-center space-x-3">
                    <div className="bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2">
                        <span className="text-green-400 text-sm font-medium">
                            {formatAddress(publicKey)}
                        </span>
                    </div>
                    <button
                        onClick={handleDisconnect}
                        className="bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 px-4 py-2 rounded-full transition-all duration-300"
                    >
                        Bağlantıyı Kes
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleConnectWallet}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
                >
                    Cüzdan Bağla
                </button>
            )}
        </div>
    );
}