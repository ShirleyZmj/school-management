import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import AntdProvider from "./components/AntdProvider";
import Navbar from "./components/Navbar";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "School Management System",
  description: "A comprehensive system for managing school resources",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
          </div>
        </AntdProvider>
      </body>
    </html>
  );
}
