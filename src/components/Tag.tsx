import React from "react";

export default function Tag({ tag }: { tag: string }) {
  return (
    <div className="border border-solid text-[#666666] text-[11px] px-2 py-1">
      {tag}
    </div>
  );
}
