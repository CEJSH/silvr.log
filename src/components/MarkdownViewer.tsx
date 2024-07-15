"use client";

import clsx from "clsx";
import Image from "next/image";
import React from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <Markdown
      className="prose lg:prose-lg !text-[#3b3b3b] text-[14px]"
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { children, ref, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag={"div"}
              {...rest}
              style={oneDark}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
        p: (p) => {
          const { children, ref, className, node, ...rest } = p;
          return (
            <p className={clsx(className, "text-[17px] leading-1.53")}>
              {children}
            </p>
          );
        },
        img: (image) => (
          <Image
            className="w-full max-h-60 object-cover"
            src={image.src || ""}
            alt={image.alt || ""}
            width={500}
            height={350}
          />
        ),
      }}
    >
      {content}
    </Markdown>
  );
}
