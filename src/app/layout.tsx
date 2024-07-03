import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
const dosis = Work_Sans({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Silvr.log", template: "Silvr.log | %s" },
  description: "software engineer eunjae's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          dosis.className,
          "flex flex-col max-w-screen-2xl mx-auto w-full bg-white"
        )}
      >
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
