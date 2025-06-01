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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 glass-dark border-b border-purple-500/20 backdrop-blur-md">
        <div className="container-custom py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Stellar<span className="gradient-text">Fund</span>
            </h1>
          </div>
          <WalletConnection publicKey={publicKey} setPublicKey={setPublicKey} />
        </div>
      </header>

      <main className="relative z-10 container-custom py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-24 fade-in-up">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Geleceğin Startup'larına
              <span className="block gradient-text mt-2">Yatırım Yapın</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stellar blockchain üzerinde güvenli ve şeffaf fonlama platformu.
              İnovatif projeleri destekleyin ve hisse sahibi olun.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-4 text-lg">
                Keşfetmeye Başla
              </button>
              <button className="btn-outline px-8 py-4 text-lg">
                Nasıl Çalışır?
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-20">
          <div className="modern-card text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">₺2.5M+</div>
            <div className="text-gray-400">Toplam Yatırım</div>
          </div>
          <div className="modern-card text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">150+</div>
            <div className="text-gray-400">Desteklenen Proje</div>
          </div>
          <div className="modern-card text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">5000+</div>
            <div className="text-gray-400">Aktif Yatırımcı</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="glass-card rounded-2xl p-2 inline-flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
          {filteredCompanies.map((company, index) => (
            <div
              key={company.id}
              className="fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CompanyCard
                company={company}
                isWalletConnected={!!publicKey}
              />
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="modern-card mb-16 md:mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nasıl <span className="gradient-text">Çalışır?</span>
            </h3>
            <p className="text-gray-400 text-lg">
              Üç basit adımda yatırım yapmaya başlayın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Proje Seçin</h4>
              <p className="text-gray-400 leading-relaxed">
                Beğendiğiniz startup projesini seçin ve detaylarını inceleyin
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Yatırım Yapın</h4>
              <p className="text-gray-400 leading-relaxed">
                Stellar blockchain ile güvenli ve hızlı ödeme yapın
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Hisse Alın</h4>
              <p className="text-gray-400 leading-relaxed">
                Fonlama tamamlandığında otomatik olarak hisse sahibi olun
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="modern-card">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xl">🔒</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Güvenli Blockchain</h4>
                <p className="text-gray-400 leading-relaxed">
                  Stellar blockchain teknolojisi ile tüm işlemleriniz şeffaf ve güvenli bir şekilde kaydedilir.
                </p>
              </div>
            </div>
          </div>

          <div className="modern-card">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xl">⚡</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Hızlı İşlemler</h4>
                <p className="text-gray-400 leading-relaxed">
                  Düşük ücret ve yüksek hız ile anında yatırım yapın ve sonuçları görün.
                </p>
              </div>
            </div>
          </div>

          <div className="modern-card">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xl">📊</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Şeffaf Raporlama</h4>
                <p className="text-gray-400 leading-relaxed">
                  Real-time olarak yatırımlarınızı takip edin ve detaylı raporlara erişin.
                </p>
              </div>
            </div>
          </div>

          <div className="modern-card">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xl">🌟</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Kaliteli Projeler</h4>
                <p className="text-gray-400 leading-relaxed">
                  Özenle seçilmiş ve değerlendirilmiş yüksek potansiyelli startup projelerine yatırım yapın.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center modern-card">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hayallerinizi <span className="gradient-text">Gerçekleştirin</span>
          </h3>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Bugün başlayın ve geleceğin teknoloji şirketlerine yatırım yaparak portföyünüzü güçlendirin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4 text-lg">
              Yatırıma Başla
            </button>
            <button className="btn-secondary px-8 py-4 text-lg">
              Daha Fazla Bilgi
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 glass-dark border-t border-purple-500/20 mt-20">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Stellar<span className="gradient-text">Fund</span>
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Blockchain teknolojisi ile geleceğin startup'larına yatırım yapın.
                Güvenli, şeffaf ve karlı yatırım deneyimi.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Projeler</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Yatırımcılar</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">İstatistikler</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Destek</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Yardım Merkezi</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">İletişim</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Gizlilik</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Şartlar</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2025 StellarFund. Tüm hakları saklıdır.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Discord</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Telegram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}