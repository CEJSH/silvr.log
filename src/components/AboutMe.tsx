"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AboutMe = () => {
  const router = useRouter();

  return (
    <div className="mx-auto w-[300px] sm:w-[500px] px-[16px] md:px-[110px] flex justify-center">
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
              />
            </div>
          </div>
          {/*소개 */}
          <div className="text-[13px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit accusantium dolor exercitationem praesentium nulla.
            Quae modi asperiores et nostrum temporibus ullam tenetur minus
            soluta possimus quo maxime voluptas, in autem.
          </div>
          {/**줄 */}
          <div className="w-full h-[1px] bg-[#2f2f30]"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
