import MainPost from "@/components/MainPost";
import PostsPage from "./posts/page";
import AboutMe from "@/components/shared/AboutMe";

export default async function HomePage() {
  return (
    <section className={homeSectionStyle}>
      <div className={mainPostContainerStyle}>
        <MainPost />
      </div>
      <div className={postsContainerStyle}>
        <PostsPage />
        <div className={lineStyle} />
        <AboutMe />
      </div>
    </section>
  );
}

const mainPostContainerStyle =
  "px-[20px] w-full h-full flex justify-center mt-[46px] border-[#2f2f30] border-solid border-b-[1px] pb-[58px]";

const postsContainerStyle =
  "px-[8px] md:px-[16px] w-full h-full flex flex-row xl:flex-nowrap flex-wrap";

const lineStyle = "w-[0px] md:w-[1px] bg-[#2f2f30]";

const homeSectionStyle = "h-full w-full flex flex-col justify-between";
