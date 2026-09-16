import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { Footer } from "@/components/layout/Footer/Footer";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";
import styles from "./layout.module.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.crp}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "psicóloga",
    "terapia online",
    "atendimento psicológico",
    "Júlia Alves de Araújo",
    "Abordagem Centrada na Pessoa",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.crp}`,
    description: siteConfig.description,
    // TODO: adicionar /public/images/og-image.jpg (1200x630) e referenciar aqui.
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.crp}`,
    description: siteConfig.description,
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#637351",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={jakarta.variable}>
      <body className={styles.body}>
        <a href="#inicio" className={styles.skipLink}>
          Pular para o conteúdo
        </a>
        <Navbar />
        <main id="conteudo" className={styles.main}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
