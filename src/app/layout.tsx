import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sdrk-dev-tools.vercel.app"),
  title: "Free Developer Tools Online — JSON, Code, JWT, Regex & More | SDRK Dev Tools",
  description: "20+ free developer tools: JSON Formatter, Code Minifier, JWT Decoder, Regex Tester, UUID Generator, SQL Formatter, Base64 Encode Decode, Hash Generator and more. Instant results. No login required.",
  keywords: "json formatter, code minifier, jwt decoder, regex tester, uuid generator, sql formatter, base64 encode decode, hash generator",
  openGraph: {
    title: "Free Online Developer Tools — JSON, Code, Regex & More",
    description: "20+ free online developer utilities. Instant results. No login.",
    type: "website",
    url: "https://sdrk-dev-tools.vercel.app/",
    images: ["/og-devtools.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${inter.variable} min-h-screen bg-background font-sans antialiased flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delay={0}>
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
