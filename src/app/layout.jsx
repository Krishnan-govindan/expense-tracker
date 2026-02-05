import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./calendar.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Expense Tracker - Track Your Daily Expenses",
  description: "A simple and elegant expense tracker to manage your daily spending with date tracking and category breakdown.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
