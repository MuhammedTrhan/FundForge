"use client";
import React, { useEffect, useState } from "react";
import freighterApi from "@stellar/freighter-api";
import CompanyCard from "../components/CompanyCard";
import WalletConnection from "../components/WalletConnection";

interface Company {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  imageUrl: string;
  category: string;
}

export default function HomePage() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Mock data - gerçek uygulamada API'den gelecek
  const mockCompanies: Company[] = [
    {
      id: "1",
      name: "EcoTech Solutions",
      description: "Sürdürülebilir enerji çözümleri geliştiren startup",
      targetAmount: 100000,
      currentAmount: 45000,
      imageUrl: "/api/placeholder/300/200",
      category: "teknoloji"
    },
    {
      id: "2",
      name: "HealthAI",
      description: "AI destekli sağlık tanı sistemleri",
      targetAmount: 200000,
      currentAmount: 120000,
      imageUrl: "/api/placeholder/300/200",
      category: "saglik"
    },
    {
      id: "3",
      name: "FoodChain",
      description: "Blockchain tabanlı gıda tedarik zinciri",
      targetAmount: 150000,
      currentAmount: 80000,
      imageUrl: "/api/placeholder/300/200",
      category: "blockchain"
    }
  ];

  useEffect(() => {
    const checkWallet = async () => {
      try {
        const connected = await freighterApi.isConnected();
        if (connected) {
          const { address } = await freighterApi.getAddress();
          setPublicKey(address);
        }
      } catch (error) {
        console.error("Cüzdan bağlantısı kontrol edilirken hata:", error);
      }
    };

    setCompanies(mockCompanies);
    checkWallet();
  }, []);

  const filteredCompanies = selectedCategory === "all"
    ? companies
    : companies.filter(company => company.category === selectedCategory);

  const categories = ["all", "teknoloji", "saglik", "blockchain"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">
            Stellar<span className="text-purple-400">Fund</span>
          </h1>
          <WalletConnection publicKey={publicKey} setPublicKey={setPublicKey} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Geleceğin Startup'larına
            <span className="text-purple-400"> Yatırım Yapın</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stellar blockchain üzerinde güvenli ve şeffaf fonlama platformu.
            İnovatif projeleri destekleyin ve hisse sahibi olun.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-black/30 backdrop-blur-sm rounded-full p-2 border border-purple-500/20">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full mx-1 transition-all duration-300 ${selectedCategory === category
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                  : "text-gray-300 hover:text-white hover:bg-purple-600/20"
                  }`}
              >
                {category === "all" ? "Tümü" :
                  category === "teknoloji" ? "Teknoloji" :
                    category === "saglik" ? "Sağlık" : "Blockchain"}
              </button>
            ))}
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              isWalletConnected={!!publicKey}
            />
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-20 bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">Nasıl Çalışır?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
            <div className="text-center">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Proje Seçin</h4>
              <p>Beğendiğiniz startup projesini seçin</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Yatırım Yapın</h4>
              <p>Stellar ile güvenli ödeme yapın</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Hisse Alın</h4>
              <p>Fonlama tamamlandığında hisse sahibi olun</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm border-t border-purple-500/20 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-400">
          <p>&copy; 2025 StellarFund. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}