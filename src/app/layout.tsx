import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MouseShadow from "@/components/MouseShadow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Persona Chat App - AI Mentors Edition",
  description: "Chat with legendary Indian tech educators Hitesh Choudhary and Piyush Garg. Get personalized programming guidance, tech advice, and coding insights in their authentic styles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MouseShadow />
        {children}
      </body>
    </html>
  );
}
