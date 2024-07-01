import { getAllPosts, getPost } from "@/app/service/posts";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
type Props = {
  params: {
    slug: string;
  };
};
export default async function PostPage({ params: { slug } }: Props) {
  const post = await getPost(slug);
  const tags = post?.tag;
  if (!post) {
    redirect("/posts");
    // notFound();
  }
  return (
    <div className="w-full h-full flex justify-center">
      <header>
        <div className="w-[700px]">
          <div className="rounded-[12px] !w-full h-[357px] mt-[28px] flex justify-start overflow-hidden">
            <Image
              src={`/images/${post.id}.jpg`}
              alt={`mylove/${post.id}`}
              width={700}
              height={300}
              style={{ objectFit: "cover" }}
            />
          </div>
          <h1 className="text-[#3b3b3b] text-[48px] font-[700] mt-[20px]">
            {post.title}
          </h1>
          <div className="w-full flex flex-row mt-[20px]">
            {tags?.map((tag, index) => {
              return (
                <div
                  className="hover:cursor-pointer text-[13px] px-[10px] py-[4px] border border-solid border-transparent mr-[8px] mb-[10px] bg-[#fbfaf9] rounded-[19px] text-gray-700 hover:text-orange-300"
                  key={index}
                >
                  {`#${tag}`}
                </div>
              );
            })}
          </div>
          <section className="w-full mt-[20px]">
            <div className="text-[#8B95A1] text-[14px]">{`${post.date.slice(
              0,
              4
            )}년 ${post.date.slice(4, 6)}월 ${post.date.slice(6, 8)}일`}</div>
          </section>
          <div className="text-[#333d4b] leading-7 mt-[54px] w-full flex flex-col">
            <p>{post.description}</p>
          </div>
        </div>
      </header>
      {/* <div className="mt-[54px]">
        <CarouselPosts />
      </div> */}
    </div>
  );
}

export async function generateStaticParams() {
  // 모든 제품의 페이지들을 미리 만들어 둘 수 있게 해줄 거임 (SSG)
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.id,
  }));
}
