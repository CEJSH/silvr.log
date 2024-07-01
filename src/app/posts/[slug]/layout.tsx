import CarouselPosts from "@/components/Carousel";

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full justify-center">
      {children}
      <div className="w-[700px] mt-[54px] self-center">
        <CarouselPosts />
      </div>
    </div>
  );
}
