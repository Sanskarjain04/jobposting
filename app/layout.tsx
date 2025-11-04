import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InstallPrompt } from "@/components/layout/InstallPrompt";
import { ServiceWorkerRegistration } from "@/components/layout/ServiceWorkerRegistration";

export const metadata: Metadata = {
  title: "JobBoard - Find Your Dream Job",
  description: "Modern job board built with Next.js, Prisma, and PostgreSQL. Browse jobs, apply with one click, and manage applications.",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "JobBoard",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  openGraph: {
    type: "website",
    siteName: "JobBoard",
    title: "JobBoard - Find Your Dream Job",
    description: "Modern job board for finding and posting job opportunities",
  },
  twitter: {
    card: "summary",
    title: "JobBoard - Find Your Dream Job",
    description: "Modern job board for finding and posting job opportunities",
  },
};

export const viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="antialiased">
        <SessionProvider>
          <ServiceWorkerRegistration />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <InstallPrompt />
        </SessionProvider>
      </body>
    </html>
  );
}