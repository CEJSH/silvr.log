"use client";
import Image from "next/image";
import babe from "../../public/images/0.jpg";
import React from "react";
import { useRouter } from "next/navigation";
export default function MainPost() {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/posts/${1}`);
  };
  return (
    <section
      onClick={handleClick}
      className="group hover:cursor-pointer relative flex flex-col border border-solid border-[#2f2f30] w-[700px]"
    >
      <div className="w-full flex flex-row justify-center h-[240px] sm:h-[380px]">
        <div className="!w-full flex overflow-hidden">
          <Image
            className="transition-all duration-100 ease-linear group-hover:scale-105"
            priority
            src={babe}
            alt="myloves"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="p-[14px] sm:p-[16px] flex flex-col gap-[8px] sm:gap-[12px]">
        <div className="text-[#666666] text-[10px]">date</div>
        <div className="flex flex-col gap-[10px] sm:gap-[14px]">
          <div className="group-hover:text-orange-400 transition-all duration-100 ease-linear text-[17px] font-[700]">
            내일은 화요일입니다. 벌써 6월이 끝났네요. 일년 빠르다
          </div>
          <div className="text-[#666666] text-[12px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            pariatur, ipsam, molestiae, eius odio quasi praesentium amet dolorem
            blanditiis illo reprehenderit omnis porro dolore quaerat
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
