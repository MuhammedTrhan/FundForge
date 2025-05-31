# 💰 Stellar-Soroban Fonlama DApp

Bu proje, **Stellar ve Soroban** kullanarak oluşturulmuş bir startup fonlama dApp'idir. Yatırımcılar beğendikleri startup şirketlere yatırım yapabilir ve hedef fonlamaya ulaşıldığında hisse oranında geri dönüş alabilirler.

## 🚀 Özellikler

- 🌐 **Next.js** tabanlı modern frontend
- 📜 **Rust / Soroban** akıllı sözleşmeleri
- 🔑 **Freighter cüzdan** bağlantısı
- 💼 Startup şirket listesi ve detay görüntüleme
- 💰 Güvenli yatırım yapma sistemi
- 📊 Gerçek zamanlı fonlama ilerleme takibi
- ✅ Hedef fonlamaya ulaşma durumu kontrolü
- 🎨 Şık ve sezgisel kullanıcı arayüzü (Tailwind CSS ile)

## 📂 Proje Yapısı

```bash
/contract             # Rust/Soroban akıllı sözleşme kodları
/app                  # Next.js uygulaması
  ├── /components     # React bileşenleri
  ├── /pages          # Sayfa bileşenleri
  └── /styles         # CSS dosyaları
/tailwind.config.js   # Tailwind yapılandırması
/README.md            # Bu döküman!
```

## 🛠️ Kurulum

1️⃣ **Repoyu klonlayın:**
```bash
git clone https://github.com/<kullanici_adi>/stellar-funding-dapp.git
cd stellar-funding-dapp
```

2️⃣ **Bağımlılıkları yükleyin:**
```bash
npm install
```

3️⃣ **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

4️⃣ **Akıllı sözleşmeyi build etmek için:**
```bash
cd contract
cargo build --target wasm32-unknown-unknown --release
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/funding_contract.wasm --source alice --network testnet
```

## ⚙️ Kullanım

- Ana sayfada cüzdanınızı bağlayın (Freighter Wallet gerekli)
- Startup şirketleri listesini görüntüleyin
- Beğendiğiniz şirkete tıklayarak detaylarını inceleyin
- Yatırım yapmak istediğiniz miktarı girin ve onaylayın
- Fonlama hedefine ulaşıldığında bilgilendirme mesajı alın

## 💡 Nasıl Çalışır?

1. **Şirket Kaydı**: Startup'lar platformda kendilerini tanıtır ve hedef fonlama miktarını belirler
2. **Yatırım**: Kullanıcılar XLM ile şirketlere yatırım yapar
3. **Takip**: Gerçek zamanlı olarak fonlama ilerlemesi takip edilir
4. **Başarı**: Hedef tutara ulaşıldığında fonlama tamamlanır
5. **Hisse Dağılımı**: Yatırım oranında hisse hakları bilgilendirmesi yapılır

## 🔧 Teknoloji Yığını

- **Frontend**: Next.js 13+, React, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Stellar Network, Soroban Smart Contracts
- **Language**: Rust (Smart Contract), JavaScript/TypeScript (Frontend)
- **Wallet**: Freighter Wallet Integration

## 📸 Ekran Görüntüleri

![Ana Sayfa](./screenshots/homepage.png)
![Şirket Detayı](./screenshots/company-detail.png)
![Yatırım Sayfası](./screenshots/investment.png)

## 🌐 Canlı Demo

[Demo Linki](https://stellar-funding-dapp.vercel.app) (Yakında!)

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.

---

✨ **Katkıda bulunmak isterseniz:**  
- PR'larınızı bekliyoruz!  
- Yeni özellik önerileri ve hata bildirimleri açabilirsiniz.

---

🔗 **Bağlantılar:**
- 🌐 [Stellar Developer Docs](https://developers.stellar.org/docs/)
- 🔧 [Soroban Dökümantasyon](https://soroban.stellar.org/docs)
- 💼 [Freighter Wallet](https://freighter.app/)
- 🎯 [Stellar Testnet](https://testnet.steexp.com/)

---

> **Not:** Projeyi çalıştırmadan önce `contract` klasöründe Soroban smart contract derlemesini tamamladığınızdan emin olun! Ayrıca testnet XLM'e ihtiyacınız olacak.

## 🚨 Önemli Uyarılar

- Bu proje sadece eğitim ve test amaçlıdır
- Gerçek para yatırımı yapmadan önce riskleri değerlendirin
- Testnet üzerinde çalışır, mainnet kullanımı için ek güvenlik önlemleri alın

---

**Geliştirici**: [İsminiz] | **İletişim**: [email@domain.com]
