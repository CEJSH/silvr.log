"use client";
import Image from "next/image";
import babe from "../../public/images/0.jpg";
import computer from "../../public/images/23.jpg";
import React from "react";
import { useRouter } from "next/navigation";
export default function MainPost() {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/posts-non-tech/how-i-got-into-programming`);
  };
  return (
    <section
      onClick={handleClick}
      className="group cursor-pointer relative flex flex-col border border-solid border-[#2f2f30] w-[700px]"
    >
      <div className="w-full flex flex-row justify-center h-[240px] sm:h-[380px]">
        <div className="!w-full flex overflow-hidden">
          <Image
            className="w-full transition-all duration-100 ease-linear group-hover:scale-105"
            priority
            src={computer}
            alt="image"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="p-[14px] sm:p-[16px] flex flex-col gap-[8px] sm:gap-[12px]">
        <div className="text-[#666666] text-[10px]">2024 00 00 </div>
        <div className="flex flex-col gap-[10px] sm:gap-[14px]">
          <div className="group-hover:text-orange-400 transition-all duration-100 ease-linear text-[17px] font-[700]">
            How I Got Into Programming
          </div>
          <div className="text-[#666666] text-[12px]">
            모 개발자님의 유년시절 이야기를 담은 글을 보고 인상이 깊어 쓰는 첫
            블로그 글입니다.
          </div>
        </div>
      </div>
      <div className="w-[200px] md:w-[240px] h-[32px] sm:h-[38px] absolute flex items-center justify-center bg-white border border-black border-solid -left-[1px] -top-4">
        <div className="w-full text-center tracking-widest text-[12px] sm:text-[13px]">
          FEATURED POST
        </div>
      </div>
    </section>
  );
}
