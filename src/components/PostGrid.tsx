import React from "react";

export default function PostGrid({ children }: { children: React.ReactNode }) {
  return <div className={gridStyle}>{children}</div>;
}

const gridStyle = "px-[8px] w-full flex flex-col gap-[24px]";
