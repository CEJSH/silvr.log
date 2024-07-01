import clsx from "clsx";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  categories: { name: string; label: string }[];
  onClick: (category: string) => void;
};

export default function Categories({ categories, onClick }: Props) {
  const pathname = usePathname();
  return (
    <div
      className={clsx("w-full flex items-center tracking-wider text-[18px]")}
    >
      {pathname.includes("/posts") ? (
        <div className="w-full flex flex-row flex-wrap gap-y-[4px] text-[18px] self-start justify-center mb-[20px]">
          {categories.map((cat, i) => {
            return (
              <div
                key={i}
                className="flex-none hover:cursor-pointer mr-[12px]"
                onClick={() => {
                  onClick(cat.name);
                }}
              >
                {cat.label}
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
