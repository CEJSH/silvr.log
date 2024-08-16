"use client";
import Image from "next/image";
import computer from "../../public/images/23.jpg";
import React from "react";
import { useRouter } from "next/navigation";

export default function MainPost() {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts-non-tech/how-i-got-into-programming`);
  };

  return (
    <section onClick={handleClick} className={mainPostStyle}>
      <div className={imageContainerStyle}>
        <div className={imageRowStyle}>
          <Image
            className={imageStyle}
            priority
            src={computer}
            alt="image"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className={postDescContainerStyle}>
        <div className={dateStyle}>2024 00 00 </div>
        <div className={postDescStyle}>
          <div className={postTitleStyle}>How I Got Into Programming</div>
          <div className={postSummaryStyle}>
            모 개발자님의 유년시절 이야기를 담은 글을 보고 인상이 깊어 쓰는 첫
            블로그 글입니다.
          </div>
        </div>
      </div>
      <div className={labelContainerStyle}>
        <div className={labelStyle}>FEATURED POST</div>
      </div>
    </section>
  );
}

const imageStyle =
  "w-full transition-all duration-100 ease-linear group-hover:scale-105";

const labelStyle =
  "w-full text-center tracking-widest text-[12px] sm:text-[13px]";

const labelContainerStyle =
  "w-[200px] md:w-[240px] h-[32px] sm:h-[38px] absolute flex items-center justify-center bg-white border border-black border-solid -left-[1px] -top-4";

const postTitleStyle =
  "group-hover:text-orange-400 transition-all duration-100 ease-linear text-[17px] font-[700]";

const postSummaryStyle = "text-[#666666] text-[12px]";

const dateStyle = "text-[#666666] text-[10px]";

const postDescStyle = "flex flex-col gap-[10px] sm:gap-[14px]";

const postDescContainerStyle =
  "p-[14px] sm:p-[16px] flex flex-col gap-[8px] sm:gap-[12px]";

const imageRowStyle = "!w-full flex overflow-hidden";

const imageContainerStyle =
  "w-full flex flex-row justify-center h-[240px] sm:h-[380px]";

const mainPostStyle =
  "group cursor-pointer relative flex flex-col border border-solid border-[#2f2f30] w-[700px]";
