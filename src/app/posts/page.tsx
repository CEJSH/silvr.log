import React from "react";
import { getAllPosts, PostType } from "../service/posts";
import { Metadata } from "next";
import FilterablePosts from "@/components/shared/FilterablePosts";

export const metadata: Metadata = {
  title: "All Posts",
  description: "blog posts related to development",
};
async function FilterablePostsSection() {
  const posts = await getAllPosts(PostType.TECH);
  const categories = [...new Set(posts.flatMap((post) => post.tag))];
  return <FilterablePosts posts={posts} categories={categories} />;
}

export default function PostsPage() {
  return (
    <div className={postPageStyle}>
      <div className={filterablePostsContainer}>
        <FilterablePostsSection />
      </div>
    </div>
  );
}

const filterablePostsContainer =
  "w-full sm:w-[680px] md:w-[800px] !px-[16px] mx-0 sm:mx-[40px] lg:mx-[100px] flex flex-col pt-[16px]";

const postPageStyle = "w-full flex justify-center";
