import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlowEffect from "@/components/ui/GlowEffect";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  title: "AI ART - Create Stunning Art with Artificial Intelligence",
  description:
    "Explore the most comprehensive collection of AI art tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased noise-bg`}>
        <AuthProvider>
          <GlowEffect />
          <Navbar />
          <main id="main-content" role="main">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}