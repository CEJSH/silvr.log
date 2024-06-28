import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import clsx from "clsx";
const dosis = Work_Sans({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eunj.log",
  description: "eunjae's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(dosis.className, "bg-white h-[100vh]")}>
        <header className="flex flex-col justify-between items-center py-[8px]">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-[56px] font-[500] text-[#2f2f30] tracking-widest"
            >
              Ej.log
            </Link>
          </div>
          <nav
            className={
              "text-[12px] flex items-center my-[16px] gap-[36px] justify-center w-full h-[32px] border border-[#2f2f30] border-solid border-b-1 border-t-1"
            }
          >
            <div className="h-full w-[1px] bg-[#2f2f30]" />
            <span className="text-orange-400">
              <Link href="/">Home</Link>
            </span>
            <div className="h-full w-[1px] bg-[#2f2f30]" />
            <span>
              <Link href="/products">Posts</Link>
            </span>
            <div className="h-full w-[1px] bg-[#2f2f30]" />
            <span>
              <Link href="/contact">Album</Link>
            </span>
            <div className="h-full w-[1px] bg-[#2f2f30]" />
            <span>
              <Link href="/about">About</Link>
            </span>
            <div className="h-full w-[1px] bg-[#2f2f30]" />
            <span>
              <Link href="https://github.com/CEJSH">github</Link>
            </span>
            <div className="h-full w-[1px] bg-[#2f2f30]" />
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
