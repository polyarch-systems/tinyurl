import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TinyURL — Modern Link Management Platform",
  description:
    "The modern link management platform for teams who care about performance, security, and brand presence. Shorten, track, and optimize your links.",
  keywords: [
    "URL shortener",
    "link management",
    "branded links",
    "link analytics",
  ],
  openGraph: {
    title: "TinyURL — Modern Link Management Platform",
    description:
      "Shorten links. Own your brand. The modern link management platform trusted by 10,000+ teams.",
    type: "website",
    siteName: "TinyURL",
  },
  twitter: {
    card: "summary_large_image",
    title: "TinyURL — Modern Link Management Platform",
    description:
      "Shorten links. Own your brand. The modern link management platform trusted by 10,000+ teams.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col dark">{children}</body>
    </html>
  );
}