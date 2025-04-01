import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UnitsProvider } from "@/context/UnitsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AccuWeather",
  description: "Aplicación de clima usando la API de AccuWeather",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        <UnitsProvider>{children}</UnitsProvider>
      </body>
    </html>
  );
}
