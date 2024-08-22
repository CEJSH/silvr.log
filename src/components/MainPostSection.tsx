export default function MainPostSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={mainPostContainerStyle}>{children}</div>;
}
const mainPostContainerStyle =
  "px-[20px] w-full h-full flex justify-center mt-[46px] border-[#2f2f30] border-solid border-b-[1px] pb-[58px]";
