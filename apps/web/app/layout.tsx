import localFont from "next/font/local";
import "./globals.css";

const iranSans = localFont({
  src: [
    {
      path: "/fonts/IRANSansWebFaNum-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/IRANSansXFaNum-Medium.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-iransans",
  display: "swap",
});

export const metadata = {
  title: "My Next.js Project",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={iranSans.variable}>
      <body>{children}</body>
    </html>
  );
}
