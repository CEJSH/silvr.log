import React from "react";
import { getAllPosts, PostType } from "../service/posts";
import FilterablePosts from "@/components/FilterablePosts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All NonTech Posts",
  description: "blog posts not related to tech",
};

export default async function PostsPage() {
  const posts = await getAllPosts(PostType.NONTECH);
  const categories = [...new Set(posts.flatMap((post) => post.tag))];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full sm:w-[680px] md:w-[800px] !px-[16px] mx-0 sm:mx-[40px] lg:mx-[100px] flex flex-col pt-[16px]">
        <FilterablePosts posts={posts} categories={categories} />
      </div>
    </div>
  );
}
