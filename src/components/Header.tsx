import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="flex flex-col justify-between items-center py-[8px]">
      <div className="flex items-center">
        <Link
          href="/"
          className="md:my-[8px] mt-[12px] text-[42px] md:text-[56px] font-[600] text-[#2f2f30] tracking-widest"
        >
          Silvr.log
        </Link>
      </div>
      <nav
        className={
          "text-[12px] flex items-center mt-[16px] gap-[24px] xs:gap-[36px] sm:gap-[54px] justify-center w-full h-[34px] border border-[#2f2f30] border-solid border-y-1 border-x-0"
        }
      >
        <div className="h-full w-[1px] bg-[#2f2f30]" />
        <span className="text-orange-400">
          <Link href="/">Home</Link>
        </span>
        <div className="h-full w-[1px] bg-[#2f2f30]" />
        <span>
          <Link href="/posts">
            {`Posts`} <span className="font-[600]">{`[tech]`}</span>
          </Link>
        </span>
        <div className="h-full w-[1px] bg-[#2f2f30]" />
        <span>
          <Link href="/posts-non-tech">
            {`Posts `} <span className="font-[600]">{`[non_tech]`}</span>
          </Link>
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
  );
}
