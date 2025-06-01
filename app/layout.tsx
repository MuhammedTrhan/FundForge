import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "StellarFund - Geleceğin Startup'larına Yatırım Yapın",
  description: "Stellar blockchain üzerinde güvenli ve şeffaf fonlama platformu. İnovatif projeleri destekleyin ve hisse sahibi olun.",
  keywords: "stellar, blockchain, startup, yatırım, fonlama, kripto, web3",
  authors: [{ name: "StellarFund" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "StellarFund - Blockchain Tabanlı Startup Yatırım Platformu",
    description: "Stellar blockchain üzerinde güvenli ve şeffaf fonlama platformu. İnovatif projeleri destekleyin ve hisse sahibi olun.",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "StellarFund - Blockchain Tabanlı Startup Yatırım Platformu",
    description: "Stellar blockchain üzerinde güvenli ve şeffaf fonlama platformu.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${inter.variable} antialiased min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900`}
        style={{
          fontFamily: "var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
        }}
      >
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}