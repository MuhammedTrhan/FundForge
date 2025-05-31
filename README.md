# 💰 Stellar-Soroban Funding DApp

This project is a startup funding dApp built using **Stellar and Soroban**. Investors can invest in their favorite startup companies and receive returns proportional to their share when the funding target is reached.

## 🚀 Features

* 🌐 **Next.js** based modern frontend
* 📜 **Rust / Soroban** smart contracts
* 🔑 **Freighter wallet** integration
* 💼 Startup company listing and detail viewing
* 💰 Secure investment system
* 📊 Real-time funding progress tracking
* ✅ Funding target achievement status monitoring
* 🎨 Elegant and intuitive user interface (with Tailwind CSS)

## 📂 Project Structure

```bash
/contract             # Rust/Soroban smart contract code
/app                  # Next.js application
  ├── /components     # React components
  ├── /pages          # Page components
  └── /styles         # CSS files
/tailwind.config.js   # Tailwind configuration
/README.md            # This document!
```

## 🛠️ Installation

### 1️⃣ **Clone the repository:**

```bash
git clone https://github.com/<username>/stellar-funding-dapp.git
cd stellar-funding-dapp
```

### 2️⃣ **Install dependencies:**

```bash
npm install
```

### 3️⃣ **Start the development server:**

```bash
npm run dev
```

### 4️⃣ **To build the smart contract:**

```bash
cd contract
cargo build --target wasm32-unknown-unknown --release
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/funding_contract.wasm --source alice --network testnet
```

## ⚙️ Usage

* Connect your wallet on the homepage (Freighter Wallet required)
* View the list of startup companies
* Click on your preferred company to view details
* Enter the amount you want to invest and confirm
* Receive notification when funding target is reached

## 💡 How It Works?

1. **Company Registration**: Startups introduce themselves on the platform and set their funding target
2. **Investment**: Users invest in companies using XLM
3. **Tracking**: Funding progress is tracked in real-time
4. **Success**: Funding is completed when the target amount is reached
5. **Share Distribution**: Share rights information is provided proportional to investment

## 🔧 Technology Stack

* **Frontend**: Next.js 13+, React, TypeScript
* **Styling**: Tailwind CSS
* **Blockchain**: Stellar Network, Soroban Smart Contracts
* **Language**: Rust (Smart Contract), JavaScript/TypeScript (Frontend)
* **Wallet**: Freighter Wallet Integration

## 📸 Screenshots

[Screenshots will be added here]

## 📄 License

This project is licensed under the MIT License.

## ✨ **Want to contribute?**

* We welcome your PRs!
* You can open new feature suggestions and bug reports.

## 🔗 **Links:**

* 🌐 [Stellar Developer Docs](https://developers.stellar.org/)
* 🔧 [Soroban Documentation](https://soroban.stellar.org/)
* 💼 [Freighter Wallet](https://www.freighter.app/)
* 🎯 [Stellar Testnet](https://laboratory.stellar.org/)

**Note:** Make sure to complete the Soroban smart contract compilation in the `contract` folder before running the project! You'll also need testnet XLM.

## 🚨 Important Warnings

* This project is for educational and testing purposes only
* Evaluate risks before making real money investments
* Works on testnet, additional security measures required for mainnet usage

**Developer**: Muhammed Turhan | **Contact**: meheme4434@gmail.com
