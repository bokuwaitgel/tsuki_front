import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tsuki",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <Navbar />
        <div
          className={`${inter.className} bg-slate-800 text-slate-100 w-full h-full np-4`}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
