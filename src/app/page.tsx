import MainPost from "@/components/MainPost";
import PostsPage from "./posts/page";
import AboutMe from "@/components/AboutMe";

export default async function HomePage() {
  return (
    <section className="h-full w-full flex flex-col justify-between">
      {/** 최상위 보여지는 부분 */}
      <div className="px-[16px] w-full h-full flex justify-center mt-[46px] border-[#2f2f30] border-solid border-b-[1px] pb-[58px]">
        <MainPost />
      </div>
      <div className="px-[16px] w-full h-full flex flex-row md:flex-nowrap flex-wrap">
        <PostsPage />
        <div className="w-[0px] md:w-[1px] bg-[#2f2f30]" />
        <AboutMe />
      </div>
    </section>
  );
}
