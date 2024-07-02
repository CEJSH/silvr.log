import { getAllPosts, getPostData } from "@/app/service/posts";
import MarkdownViewer from "@/components/MarkdownViewer";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: Props) {
  const { id, title, content, date, description, path, tag } =
    await getPostData(slug);

  if (!title) {
    redirect("/posts");
    // notFound();
  }
  return (
    <article className="w-full h-full flex justify-center">
      <section className="w-[500px] md:w-[740px] p-2">
        <header>
          <div className="rounded-[12px] h-[357px] mt-[28px] flex justify-start overflow-hidden">
            <Image
              className="h-full"
              src={`/images/${id}.jpg`}
              alt={`mylove/${id}`}
              width={760}
              height={300}
              style={{ objectFit: "cover" }}
            />
          </div>
          <h1 className="text-[#3b3b3b] text-[48px] font-[700] mt-[20px]">
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
          <section className="w-full mt-[20px]">
            <div className="text-[#8B95A1] text-[14px]">{`${date.slice(
              0,
              4
            )}년 ${date.slice(4, 6)}월 ${date.slice(6, 8)}일`}</div>
          </section>
        </header>
        <div className="text-[#333d4b] mt-[54px] w-full flex flex-col p-2">
          <MarkdownViewer content={content} />
        </div>
      </section>
    </article>
  );
}

// 모든 제품의 페이지들을 미리 만들어 둘 수 있게 해줄 거임 (SSG)
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.path,
  }));
}
