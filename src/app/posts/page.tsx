import React from "react";
import { getAllPosts } from "../service/posts";
import FilterablePosts from "@/components/FilterablePosts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Posts",
  description: "blog posts related to development",
};

export default async function PostsPage() {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.flatMap((post) => post.tag))];
  // console.log(categories);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[500px] sm:w-[680px] md:w-[800px] !px-[16px] mx-0 sm:mx-[40px] lg:mx-[100px] flex flex-col pt-[16px]">
        <FilterablePosts posts={posts} categories={categories} />
      </div>
    </div>
  );
}
