import clsx from "clsx";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  selected: string;
  categories: string[];
  onClick: (category: string) => void;
};

export default function Categories({ selected, categories, onClick }: Props) {
  const pathname = usePathname();
  return (
    <div
      className={clsx("w-full flex items-center tracking-wider text-[18px]")}
    >
      {pathname.includes("/posts") ? (
        <div className="w-full flex flex-row flex-wrap gap-y-[8x] text-[18px] self-start justify-center mb-[20px]">
          {categories.map((cat, i) => {
            return (
              <div
                key={i}
                className="hover:text-orange-300 flex-none cursor-pointer mr-[14px]"
                onClick={() => {
                  onClick(cat);
                }}
              >
                {cat === selected ? "(0) " : "( ) "}
                {cat}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-[32px] mb-[36px]">TRAIN OF THOUGHT</div>
      )}
    </div>
  );
}
