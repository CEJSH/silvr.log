import path from "path";
import { promises as fs } from "fs";

export type Post = {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  tag: string[];
};

export async function getAllPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  return fs.readFile(filePath, "utf-8").then<Post[]>(JSON.parse);
}

export async function getPost(id: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((item) => item.id === id);
}
