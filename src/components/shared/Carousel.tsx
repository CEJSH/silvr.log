import { getAllPosts, PostType } from "@/app/service/posts";
import PostCard from "./PostCard";
import MultiCarousel from "../MultiCarousel";

async function CardsForCarousel() {
  const posts = await getAllPosts(PostType.TECH);
  return (
    <>
      {posts.map((post) => (
        <PostCard carousel={true} post={post} key={post.id} />
      ))}
    </>
  );
}

export default function CarouselPosts() {
  return (
    <section className="mt-[54px]">
      <h2>YOU MAY ALSO LIKE</h2>
      <MultiCarousel>
        <CardsForCarousel />
      </MultiCarousel>
    </section>
  );
}
