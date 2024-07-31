import React from "react";
import MarkdownViewer from "./MarkdownViewer";
import { PostData } from "@/app/service/posts";

export default function PostContent({ post }: { post: PostData }) {
  const { title, date, content, tag } = post;
  return (
    <>
      <section className="p-1">
        <h1 className="text-[#3b3b3b] text-[36px] sm:text-[48px] font-[700] mt-[20px]">
          {title}
        </h1>
        <div className="w-full flex flex-row mt-[20px]">
          {tag?.map((tag, index) => {
            return (
              <div
                className="cursor-pointer text-[13px] px-[10px] py-[4px] border border-solid border-transparent mr-[8px] mb-[10px] bg-[#fbfaf9] rounded-[19px] text-gray-700 hover:text-orange-300"
                key={index}
              >
                {`#${tag}`}
              </div>
            );
          })}
        </div>
        <section className="w-full sm:mt-[20px]">
          <div className="text-[#8B95A1] text-[14px]">{`${date.slice(
            0,
            4
          )}년 ${date.slice(4, 6)}월 ${date.slice(6, 8)}일`}</div>
        </section>
      </section>
      <div className="text-[#333d4b] mt-[20px] sm:mt-[54px] w-full flex flex-col p-1">
        <MarkdownViewer content={content} />
      </div>
    </>
  );
}
