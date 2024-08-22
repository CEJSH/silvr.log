import MainPost from "@/components/MainPost";
import PostsPage from "./posts/page";
import AboutMe from "@/components/shared/AboutMe";
import MainPostSection from "@/components/MainPostSection";
import SubSection from "@/components/SubSection";

export default function HomePage() {
  return (
    <section className={homeSectionStyle}>
      <MainPostSection>
        <MainPost />
      </MainPostSection>
      <SubSection>
        <PostsPage />
        <div className={lineStyle} />
        <AboutMe />
      </SubSection>
    </section>
  );
}

const lineStyle = "w-[0px] md:w-[1px] bg-[#2f2f30]";

const homeSectionStyle = "h-full w-full flex flex-col justify-between";
