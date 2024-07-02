"use client";
import { Post } from "@/app/service/posts";
import React, { useState } from "react";
import PostGrid from "./PostGrid";
import PostCard from "./PostCard";
import Categories from "./Categories";

type Props = {
  posts: Post[];
  categories: string[];
};

const ALL_POSTS = "ALL_POSTS";
export default function FilterablePosts({ posts, categories }: Props) {
  const [selected, setSelected] = useState<string>(ALL_POSTS);

  const selectedPosts =
    selected === ALL_POSTS
      ? posts
      : posts.filter((post) => post.tag.includes(selected));

  const handleButton = (which: string) => {
    if (selected === which) {
      setSelected("");
    } else {
      setSelected(which);
    }
  };

  const category = [ALL_POSTS, ...categories];

  return (
    <section>
      <Categories
        selected={selected}
        categories={category}
        onClick={handleButton}
      />
      <PostGrid>
        {selectedPosts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </PostGrid>
    </section>
  );
}
