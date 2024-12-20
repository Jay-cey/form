import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeRegistry from "./components/ThemeRegistry/EmotionCache";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <nav className="h-16 w-full bg-slate-950 px-6 flex items-center sticky">
          <ul className="w-full">
            <li className="place-self-end text-2xl font-bold text-orange-500">Carribian!</li>
          </ul>
        </nav>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
