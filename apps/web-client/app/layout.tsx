import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/providers";

export const metadata: Metadata = {
  title: "نیک راد - صفحه اصلی",
  description: "پلتفرم فروشگاهی نیک راد",
};

const iranSans = localFont({
  src: [
    {
      path: "/fonts/IRANSansWebFaNum-Light.woff2",
      style: "normal",
    },
    {
      path: "/fonts/IRANSansXFaNum-Medium.woff2",
      style: "normal",
    },
  ],
  variable: "--font-iransans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" >
      <body className={iranSans.variable} >
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
