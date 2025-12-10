import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EadFácil - Plataforma de Cursos Online",
  description: "Plataforma simples e completa para professores criarem e gerenciarem seus cursos online. Aulas organizadas, alunos engajados e pagamentos facilitados.",
  keywords: ["EadFácil", "cursos online", "EAD", "educação", "plataforma de ensino"],
  authors: [{ name: "EadFácil Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "EadFácil - Plataforma de Cursos Online",
    description: "Plataforma simples e completa para professores criarem e gerenciarem seus cursos online",
    url: "https://eadfacil.com",
    siteName: "EadFácil",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EadFácil - Plataforma de Cursos Online",
    description: "Plataforma simples e completa para professores criarem e gerenciarem seus cursos online",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
