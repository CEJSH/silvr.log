import { getAllPosts, PostType } from "@/app/service/posts";
import PostCard from "./PostCard";
import MultiCarousel from "./MultiCarousel";
export default async function CarouselPosts() {
  const posts = await getAllPosts(PostType.TECH);
  return (
    <section className="mt-[54px]">
      <h2>YOU MAY ALSO LIKE</h2>
      <MultiCarousel>
        {posts.map((post) => (
          <PostCard carousel={true} post={post} key={post.id} />
        ))}
      </MultiCarousel>
    </section>
  );
}
