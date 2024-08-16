import clsx from "clsx";
import { usePathname } from "next/navigation";

type Props = {
  selected: string;
  categories: string[];
  onClick: (category: string) => void;
};

export default function Categories({ selected, categories, onClick }: Props) {
  const pathname = usePathname();
  return (
    <div className={categoryStyle}>
      {pathname.includes("/posts") ? (
        <div className={catContainerStyle}>
          {categories.map((cat, i) => {
            return (
              <div
                key={i}
                className={catNameStyle}
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
        <div className={labelStyle}>TRAIN OF THOUGHT</div>
      )}
    </div>
  );
}

const catNameStyle = "hover:text-orange-300 flex-none cursor-pointer mr-[14px]";

const catContainerStyle =
  "w-full flex flex-row flex-wrap gap-y-[8x] text-[18px] self-start justify-center mb-[20px]";

const labelStyle = "mt-[32px] mb-[36px]";

const categoryStyle = "w-full flex items-center tracking-wider text-[18px]";
