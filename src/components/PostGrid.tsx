import React from "react";

export default function PostGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-[24px] w-full flex flex-col gap-[24px]">{children}</div>
  );
}
