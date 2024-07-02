import path from "path";
import { promises as fs } from "fs";

export type Post = {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  path: string;
  tag: string[];
};

export type PostData = Post & { content: string };

export async function getAllPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  return fs
    .readFile(filePath, "utf-8")
    .then<Post[]>(JSON.parse)
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
}

export async function getPost(path: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((item) => item.path === path);
}

export async function getPostData(filename: string): Promise<PostData> {
  const filePath = path.join(process.cwd(), "data", `${filename}.md`);
  const metadata = await getAllPosts().then((posts) =>
    posts.find((post) => post.path === filename)
  );
  if (!metadata)
    throw new Error(`${filename}에 해당하는 포스트를 찾을 수 없음`);
  const content = await fs.readFile(filePath, "utf-8");
  return { ...metadata, content };
}
