export default function Home() {
  return (
    <div className="h-full flex flex-col">
      <div className="h-[40px]">최상위</div>
      <div className="h-[1px] w-full bg-[#2f2f30] mb-[2px]" />
      <div className="flex w-full h-full">
        <div className="flex w-2/3">좌</div>
        <div className="w-[1px] h-full bg-[#2f2f30]" />
        <div className="flex w-1/3">우</div>
      </div>
    </div>
  );
}
