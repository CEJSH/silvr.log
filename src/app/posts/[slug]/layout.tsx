import CarouselPosts from "@/components/shared/Carousel";

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={layoutStyle}>
      <article className={pageStyle}>{children}</article>
      <div className={carouselWrapperStyle}>
        <CarouselPosts />
      </div>
    </div>
  );
}

const layoutStyle = "flex flex-col w-full justify-center";

const pageStyle = "w-full h-full flex justify-center px-[8px]";

const carouselWrapperStyle = "w-full lg:w-[700px] mt-[54px] self-center px-2";
