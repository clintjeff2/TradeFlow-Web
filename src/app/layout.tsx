import "./globals.css";
import React from "react";
import { Inter } from "next/font/google";
import ToasterProvider from "../components/general/ToasterProvider";
import { SlippageProvider } from "../contexts/SlippageContext";
import { ExpertModeProvider } from "../contexts/ExpertModeContext";
import Footer from "../components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "TradeFlow",
  description: "TradeFlow RWA Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans min-h-screen flex flex-col">
        <SlippageProvider>
          <ExpertModeProvider>
            <div className="flex-1">
              {children}
            </div>
          </ExpertModeProvider>
        </SlippageProvider>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}
