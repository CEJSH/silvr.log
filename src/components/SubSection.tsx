export default function SubSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={postsContainerStyle}>{children}</div>;
}

const postsContainerStyle =
  "px-[8px] md:px-[16px] w-full h-full flex flex-row xl:flex-nowrap flex-wrap";
