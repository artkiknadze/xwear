import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PopupWidget } from "@/components/PopupWidget";
import { Container } from "@/components/Container";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "XWEAR",
  description: "A place where you can buy quality products from Nova",
};

const GA_ID = "G-CPL282XN91";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <GoogleAnalytics ga_id={GA_ID} />
        <ThemeProvider attribute="class">
          <Navbar />
          <Container>{children}</Container>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
