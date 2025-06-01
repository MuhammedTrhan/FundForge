"use client";
import React, { useEffect, useState } from "react";
import freighterApi from "@stellar/freighter-api";
import CompanyCard from "./components/CompanyCard";
import WalletConnection from "./components/WalletConnection";

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
          const publicKey = await freighterApi.getPublicKey();
          setPublicKey(publicKey);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Animated background gradients */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div
        className="absolute top-0 -right-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ animationDelay: '4s' }}
      />

      {/* Header */}
      <header className="relative bg-black/30 backdrop-blur-xl border-b border-gray-700/30 shadow-2xl">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Stellar<span className="text-purple-400">Fund</span>
            </h1>
          </div>
          <WalletConnection publicKey={publicKey} setPublicKey={setPublicKey} />
        </div>
      </header>

      <main className="relative container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 backdrop-blur-sm">
              🚀 Blockchain Destekli Yatırım Platformu
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Geleceğin
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Startup'larına
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Yatırım Yapın
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Stellar blockchain üzerinde güvenli ve şeffaf fonlama platformu.
            İnovatif projeleri destekleyin, hisse sahibi olun ve geleceği şekillendirin.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 group">
              <span className="flex items-center gap-2">
                Keşfetmeye Başla
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button className="px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-xl hover:bg-gray-800 hover:border-purple-500 transition-all duration-300">
              Nasıl Çalışır?
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <span className="text-3xl font-bold text-green-400">$345K</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Toplam Fonlama</h3>
            <p className="text-gray-400 text-sm">Şimdiye kadar toplanan</p>
          </div>

          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🏢</span>
              </div>
              <span className="text-3xl font-bold text-blue-400">12</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Aktif Proje</h3>
            <p className="text-gray-400 text-sm">Fonlama bekleyen</p>
          </div>

          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <span className="text-3xl font-bold text-purple-400">1.2K</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Yatırımcı</h3>
            <p className="text-gray-400 text-sm">Platformu kullanan</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-16">
          <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-2 border border-gray-700/30 shadow-2xl">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-4 rounded-xl mx-1 transition-all duration-300 font-medium ${selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25 transform scale-105"
                    : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  }`}
              >
                {category === "all" ? "🌟 Tümü" :
                  category === "teknoloji" ? "⚡ Teknoloji" :
                    category === "saglik" ? "🏥 Sağlık" : "🔗 Blockchain"}
              </button>
            ))}
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              isWalletConnected={!!publicKey}
            />
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/30 shadow-2xl">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Nasıl Çalışır?
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Üç basit adımda yatırım yapın ve startup'ların büyümesine ortak olun
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <div className="absolute top-12 right-0 w-16 h-0.5 bg-gradient-to-r from-purple-500 to-transparent hidden md:block" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Proje Seçin</h4>
              <p className="text-gray-400 leading-relaxed">
                Beğendiğiniz startup projesini inceleyin ve potansiyelini değerlendirin
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <div className="absolute top-12 right-0 w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent hidden md:block" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Yatırım Yapın</h4>
              <p className="text-gray-400 leading-relaxed">
                Stellar blockchain üzerinden güvenli ve şeffaf ödeme yapın
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Hisse Alın</h4>
              <p className="text-gray-400 leading-relaxed">
                Fonlama tamamlandığında otomatik olarak hisse sahibi olun
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-gray-900/50 backdrop-blur-xl border-t border-gray-700/30 mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <h3 className="text-xl font-bold text-white">StellarFund</h3>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed">
                Blockchain teknolojisi ile güvenli ve şeffaf startup yatırım platformu.
                Geleceğin girişimlerine bugünden ortak olun.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Nasıl Çalışır</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Güvenlik</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ücretler</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Destek</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Yardım Merkezi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Topluluk</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700/30 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 StellarFund. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Discord</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}