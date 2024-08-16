"use client";
import clsx from "clsx";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Tag from "../Tag";
import { Post } from "@/app/service/posts";

const PostCard = ({
  post: { id, title, date, description, tag, path },
  carousel,
}: {
  post: Post;
  carousel?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  // errorhandling 기록하기 ->
  const handleClick = () => {
    if (pathname.endsWith("/posts-non-tech")) {
      router.push(`/posts-non-tech/${path}`);
    } else {
      router.push(`/posts/${path}`);
    }
  };
  const titleFont = pathname.startsWith("/posts")
    ? "text-[24px] font-[500]"
    : "text-[18px] font-[600]";

  return (
    <article
      onClick={handleClick}
      className={clsx(cardStyle, carousel && carouselCardStyle)}
    >
      <div
        className={clsx(
          imageContainerStyle,
          carousel && "!h-[160px] md:!h-[200px]"
        )}
      >
        <Image
          className={imageStyle}
          src={`/images/${id}.jpg`}
          alt={`mylove/${id}`}
          width={340}
          height={340}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        className={clsx(
          infoContainerStyle,
          carousel && "!p-[8px] sm:!p-[14px]"
        )}
      >
        <div className={clsx(infoRowStyle, carousel && "gap-[2px]")}>
          <div className={dateStyle}>{date}</div>
          <div className={clsx(mainInfoRowStyle, carousel && "gap-[4px]")}>
            <div
              className={clsx(
                titleFont,
                carousel && "!text-[14px] font-[600]",
                titleStyle
              )}
            >
              {title}
            </div>
            {!carousel && <div className={descStyle}>{description}</div>}
          </div>
        </div>
        {!carousel && (
          <div className={tagContainerStyle}>
            <div className={lineStyle} />
            <div className={tagWrapperStyle}>
              {tag.map((tag, index) => {
                return <Tag tag={tag} key={index} />;
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard;

const tagWrapperStyle = "flex flex-row gap-[8px]";

const lineStyle = "w-full h-[1px] bg-[#2f2f30]";

const tagContainerStyle = "w-full flex flex-col gap-[12px]";

const descStyle = "text-[#666666] text-[12px] truncate";

const titleStyle =
  "group-hover:text-orange-400 transition-all duration-100 ease-linear text-ellipsis overflow-hidden";

const imageStyle =
  "w-full transition-all duration-100 ease-linear group-hover:scale-105";

const dateStyle = "text-[#666666] text-[12px]";

const mainInfoRowStyle = "flex flex-col gap-[14px]";

const infoRowStyle = "w-full flex flex-col gap-[12px]";

const imageContainerStyle = "!w-full flex justify-start overflow-hidden";

const infoContainerStyle =
  "w-full p-[14px] sm:p-[24px] flex flex-col gap-[6px] justify-between";

const cardStyle =
  "border border-solid border-[#2f2f30] overflow-hidden group cursor-pointer w-full h-[360px] md:h-[300px] flex sm:flex-row flex-col";

const carouselCardStyle = "!flex-col !h-[140px] md:!h-[240px]";
