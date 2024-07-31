import { getFeaturedPosts, getPostData, PostType } from "@/app/service/posts";
import PostContent from "@/components/PostContent";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const { title, description } = await getPostData(slug, PostType.NONTECH);
  return {
    title,
    description,
  };
}

export default async function PostPage({ params: { slug } }: Props) {
  const post = await getPostData(slug, PostType.NONTECH);
  const { id, title, next, prev } = post;
  if (!title) {
    redirect("/posts-non-tech");
    // notFound();
  }
  return (
    <section className="w-full sm:w-[500px] md:w-[700px] px-2">
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
      <PostContent post={post} />
    </section>
  );
}

// 특정 페이지들을 미리 만들어 둘 수 있게 해줄 거임 (SSG)
export async function generateStaticParams() {
  const posts = await getFeaturedPosts(PostType.NONTECH);
  return posts.map((post) => ({
    slug: post.path,
  }));
}
