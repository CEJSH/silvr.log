"use client";
import clsx from "clsx";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Tag from "./Tag";
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
  const handleClick = () => {
    router.push(`/posts/${path}`);
  };
  return (
    <article
      onClick={handleClick}
      className={clsx(
        "border border-solid border-[#2f2f30] overflow-hidden",
        "group cursor-pointer w-full h-[360px] md:h-[300px] flex sm:flex-row flex-col",
        carousel && "!flex-col !h-[240px]"
      )}
    >
      <div
        className={clsx(
          "!w-full flex justify-start overflow-hidden",
          carousel && "h-[200px]"
        )}
      >
        <Image
          className={clsx(
            "w-full transition-all duration-100 ease-linear group-hover:scale-105"
          )}
          src={`/images/${id}.jpg`}
          alt={`mylove/${id}`}
          width={340}
          height={340}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        className={clsx(
          "w-full p-[14px] sm:p-[24px] flex flex-col gap-[6px] justify-between",
          carousel && "!p-[14px]"
        )}
      >
        <div
          className={clsx(
            "w-full flex flex-col gap-[12px]",
            carousel && "gap-[2px]"
          )}
        >
          <div className="text-[#666666] text-[12px]">{date}</div>
          <div
            className={clsx(
              "flex flex-col gap-[14px]",
              carousel && "gap-[4px]"
            )}
          >
            <div
              className={clsx(
                pathname.startsWith("/posts")
                  ? "text-[24px] font-[500]"
                  : "text-[18px] font-[600]",
                carousel && "!text-[14px] font-[600]",
                "group-hover:text-orange-400 transition-all duration-100 ease-linear"
              )}
            >
              {title}
            </div>
            <div className="text-[#666666] text-[12px] truncate">
              {description}
            </div>
          </div>
        </div>
        {!carousel && (
          <div className="w-full flex flex-col gap-[12px]">
            <div className="w-full h-[1px] bg-[#2f2f30]" />
            <div className="flex flex-row gap-[8px]">
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
