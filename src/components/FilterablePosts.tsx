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

  const all = selected === ALL_POSTS ? `( 0 ) ALL_POSTS` : `(   ) ALL_POSTS`;
  const nextCat = selected === "next" ? `( 0 ) Next` : `(   ) Next`;
  const reactCat = selected === "react" ? `( 0 ) React` : `(   ) React`;
  const backendCat = selected === "backend" ? `( 0 ) Backend` : `(   ) Backend`;
  const cssCat =
    selected === "tailwind-css" ? `( 0 ) tailwind-css` : `(   ) tailwind-css`;

  const categoryLabels: { [key: string]: string } = {
    ALL_POSTS: all,
    next: nextCat,
    react: reactCat,
    backend: backendCat,
    "tailwind-css": cssCat,
  };

  const categoryList: { name: string; label: string }[] = [
    ALL_POSTS,
    ...categories,
  ].reduce<{ name: string; label: string }[]>((acc, cat) => {
    const label = categoryLabels[cat];
    if (label) {
      acc.push({
        name: cat,
        label: label,
      });
    }
    return acc;
  }, []);
  // .map(
  //   (cat) => ({
  //     name: cat,
  //     label: categoryLabels[cat] || all,
  //   })
  // );

  return (
    <section>
      <Categories categories={categoryList} onClick={handleButton} />
      <PostGrid>
        {selectedPosts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </PostGrid>
    </section>
  );
}
