import { RootState } from "@/app/redux/store";
import Image from "next/image";
import { useSelector } from "react-redux";
import arrow from "../../../../public/images/mdi_arrow-right.svg";

export default function DisplayLink() {
  const profile = useSelector((state: RootState) => state.profile);
  const links = useSelector((state: RootState) => state.links.links);
  const name = `${profile.firstName} ${profile.lastName}`
  const truncatedName = name.length > 25 ? name.slice(0, 12) + "..." : name;
  const email = profile.email;
  const truncatedEmail = email.length > 25 ? email.slice(0, 25) + "..." : email;
  const defaultImg = <div className=" w-[154px] h-[154px] rounded-full bg-[#EEEEEE]"></div>;
  const defaultImage = `/${defaultImg}`;

  const getLinkBackgroundColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return "bg-[#000]";
      case "youtube":
        return "bg-[#EE3939]";
      case "linkedin":
        return "bg-[#2D68FF]";
      case "whatsapp":
        return "bg-[#1daa61]";
      case "portfolio":
        return "bg-[#b261ff]"
      case "figma":
        return "bg-[#f65021]";
      default:
        return "bg-[#000]";
    }
  };

  return (
    <div className="tb:hidden w-[858px] bg-[#FAFAFA] pl-6 pb-6">
      <aside className="max-w-[560px] bg-white rounded-[12px] h-full flex items-start justify-center pt-10">
        <div className="border-[#737373] w-[307px] h-[631px] border rounded-[60px] grid place-content-center">
          <div className="w-[285px] h-[611px]">
            <div className="relative">
              <svg className="absolute" xmlns="http://www.w3.org/2000/svg" width="285" height="611" viewBox="0 0 286 612" fill="none">
                <path d="M1 45.5C1 20.9233 20.9233 1 45.5 1H69.5C75.8513 1 81 6.14873 81 12.5C81 20.5081 87.4919 27 95.5 27H190.5C198.508 27 205 20.5081 205 12.5C205 6.14873 210.149 1 216.5 1H240.5C265.077 1 285 20.9233 285 45.5V566.5C285 591.077 265.077 611 240.5 611H45.5C20.9233 611 1 591.077 1 566.5V45.5Z" fill="white" stroke="#737373" />
              </svg>
              <div className="absolute w-full flex flex-col gap-[56px] px-[23.5px] pt-[53.5px] pb-[43.5px]">
                <div className="flex flex-col gap-[25px] grid place-items-center">
                  <Image
                    src={profile.selectedImage || defaultImage}
                    alt=""
                    width={154}
                    height={154}
                    className={`${profile.selectedImage ? 'border border-[4px] border-[#633CFF] brightness-[.7]' : ''} w-[154px] h-[154px] rounded-full bg-[#EEEEEE]`}
                  />
                  <div className="flex flex-col gap-[16px] mx-auto">
                    {profile.firstName && profile.lastName ?
                      <p className="h-4 mx-auto font-semibold text-[18px]">{truncatedName}</p>
                      :
                      <p className="bg-[#EEEEEE] h-4 w-[200px] mx-auto rounded-full"></p>
                    }
                    {profile.email ?
                      <p className="h-4 mx-auto">{truncatedEmail}</p>
                      :
                      <span className="bg-[#EEEEEE] h-3 w-20 mx-auto rounded-full"></span>
                    }
                  </div>
                </div>

                <div className="flex flex-col gap-[20px]">
                  {links.length > 0 ?
                    <>
                      {links.map((link) => (
                        <div key={link.id}>
                          <div className={`flex justify-between p-4 w-full text-[#fff] rounded-[12px] ${getLinkBackgroundColor(link.platform)}`}>
                            <div className="flex gap-4 items-center">
                              <div className="flex items-center">
                                {link.icon}
                              </div>
                              {link.platform}
                            </div>
                            <Image
                              src={arrow}
                              alt="Arrow"
                              width={16}
                              height={16}
                            />
                          </div>
                        </div>
                      ))}
                    </>
                    :
                    <div className="flex flex-col gap-5">
                      <div className="bg-[#EEEEEE] h-[44px] w-full rounded-[8px] cursor-pointer"></div>
                      <div className="bg-[#EEEEEE] h-[44px] w-full rounded-[8px] cursor-pointer"></div>
                      <div className="bg-[#EEEEEE] h-[44px] w-full rounded-[8px] cursor-pointer"></div>
                    </div>
                  }
                </div>

              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}