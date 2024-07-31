import CarouselPosts from "@/components/Carousel";

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full justify-center">
      <article className="w-full h-full flex justify-center px-[8px]">
        {children}
      </article>
      <div className="w-full lg:w-[700px] mt-[54px] self-center px-2">
        <CarouselPosts />
      </div>
    </div>
  );
}
