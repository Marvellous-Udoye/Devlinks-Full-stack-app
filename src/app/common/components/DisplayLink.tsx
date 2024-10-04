import Image from "next/image";

export default function DisplayLink() {
  return (
    <div className="tb:hidden w-[858px] bg-[#FAFAFA] pl-6 pb-6">
      <aside className="max-w-[560px] bg-white rounded-[12px] h-full flex items-start justify-center pt-20">
        <div className="border-[#737373] w-[307px] h-[631px] border rounded-[60px] grid place-content-center">
          <div className="w-[285px] h-[611px]">
            <div className="relative">
              <svg className="absolute" xmlns="http://www.w3.org/2000/svg" width="285" height="611" viewBox="0 0 286 612" fill="none">
                <path d="M1 45.5C1 20.9233 20.9233 1 45.5 1H69.5C75.8513 1 81 6.14873 81 12.5C81 20.5081 87.4919 27 95.5 27H190.5C198.508 27 205 20.5081 205 12.5C205 6.14873 210.149 1 216.5 1H240.5C265.077 1 285 20.9233 285 45.5V566.5C285 591.077 265.077 611 240.5 611H45.5C20.9233 611 1 591.077 1 566.5V45.5Z" fill="white" stroke="#737373" />
              </svg>
              <div className="absolute w-full flex flex-col gap-[56px] px-[23.5px] pt-[53.5px] pb-[43.5px]">
                <div className="flex flex-col gap-[25px] grid place-items-center">
                  <Image
                    src={''}
                    alt=""
                    width={96}
                    height={96}
                    className="w-[96px] h-[96px] rounded-full bg-[#EEEEEE]"
                  />
                  <div className="flex flex-col gap-[13px] grid place-items-center">
                    <p className="bg-[#EEEEEE] h-4 w-40 rounded-full"></p>
                    <span className="bg-[#EEEEEE] h-2 w-16 rounded-full"></span>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="bg-[#EEEEEE] h-[44px] w-full rounded-[8px] cursor-pointer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}