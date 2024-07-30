"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AboutMe = () => {
  const router = useRouter();

  return (
    <div className="mx-auto w-[300px] sm:w-[500px] px-[16px] md:px-[80px] flex justify-center">
      <div className="flex flex-col pt-[32px]">
        <div className="flex items-center mb-[20px] sm:mb-[36px]">
          <div className="tracking-wider text-[18px]">ABOUT ME</div>
        </div>
        <div
          onClick={() => {
            router.push("/about");
          }}
          className="w-full flex flex-col gap-[24px]"
        >
          {/**사진 */}
          <div className="cursor-pointer w-full h-[240px] md:h-[180px] flex flex-row border border-solid border-[#2f2f30]">
            <div className="!w-full flex justify-center overflow-hidden">
              <Image
                src={`/images/me.jpg`}
                alt={`na`}
                width={300}
                height={200}
                style={{ objectFit: "cover" }}
                className="w-full h-full"
              />
            </div>
          </div>
          {/*소개 */}
          <div className="text-[13px]">
            1년차 웹 개발자 최은재입니다. <br />
            <br />
            자신의 생각과 상상을 실현시킬 수 있는 개발자로서 나 뿐만 아니라
            개인의 일상을 편리하게 만들고 싶습니다.
            <br />
            <br /> 자극과 영감을 주고, 상호 의지할 수 있는 동료 개발자들과 함께
            성장하는 것을 지향합니다.
          </div>
          {/**줄 */}
          <div className="w-full h-[1px] bg-[#2f2f30]"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
