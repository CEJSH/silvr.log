import path from "path";
import { promises as fs } from "fs";
import { cache } from "react";

export type Post = {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  featured: boolean;
  path: string;
  tag: string[];
};

export type PostData = Post & {
  content: string;
  next: Post | null;
  prev: Post | null;
};
export enum PostType {
  TECH = "TECH",
  NONTECH = "NONTECH",
}

export async function getFeaturedPosts(postType: PostType): Promise<Post[]> {
  return getAllPosts(postType) //
    .then((posts) => posts.filter((post) => post.featured));
}

// fetch는 여러번 호출할 때 자동으로 한번만 요청하도록 하는데
// 데이터베이스에 또는 파일에 접근하는 함수들은 한번 렌더링 될 때 여러번 호출하면 자동으로 중복 방지가 안 됨.
// but, 방지해줄 수 있는 게 있음-> 함수선언 + React에서 제공하는 캐시 사용(비동기이므로 async)
// 한 번 렌더링되는 한해서만 캐시를 해줌 무슨말이냐,

export const getAllPosts = cache(async (postType: PostType) => {
  console.log("getAllTechPosts");
  const folderName = postType === PostType.TECH ? "data" : "data/non_tech";
  console.log(folderName);
  const filePath = path.join(process.cwd(), folderName, "posts.json");
  return fs
    .readFile(filePath, "utf-8")
    .then<Post[]>(JSON.parse)
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
});

export async function getPost(
  path: string,
  postType: PostType
): Promise<Post | undefined> {
  const posts = await getAllPosts(postType);
  return posts.find((item) => item.path === path);
}

export async function getPostData(
  filename: string,
  postType: PostType
): Promise<PostData> {
  const folderName = postType === PostType.TECH ? "data" : "data/non_tech";
  const filePath = path.join(process.cwd(), folderName, `${filename}.md`);
  const posts = await getAllPosts(postType);
  const post = posts.find((post) => post.path === filename);

  if (!post) throw new Error(`${filename}에 해당하는 포스트를 찾을 수 없음`);
  const index = posts.indexOf(post);
  const next = index > 0 ? posts[index - 1] : null;
  const prev = index < posts.length ? posts[index + 1] : null;
  const content = await fs.readFile(filePath, "utf-8");

  return { ...post, content, next, prev };
}
