import { Post } from "@/app/service/posts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type Props = {
  post: Post;
  type: "prev" | "next";
};

export default function AdjacentPostCard({
  post: { path, title },
  type,
}: Props) {
  return (
    <Link href={`/posts/${path}`}>
      <Image
        src={`/images/posts/${path}.png`}
        alt={title}
        width={150}
        height={100}
      />
    </Link>
  );
}
