"use client";

import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { FaLink } from "react-icons/fa";
import { useSelector } from "react-redux";
import defaultImage from "../../public/images/logo.svg";
import arrow from "../../public/images/mdi_arrow-right.svg";

const ProfilePreview = () => {
  const profileData = useSelector((state: RootState) => state.profile);
  const links = useSelector((state: RootState) => state.links.links)
  const name = `${profileData.firstName} ${profileData.lastName}`
  const truncatedName = name.length > 25 ? name.slice(0, 12) + "..." : name;
  const email = profileData.email;
  const truncatedEmail = email.length > 25 ? email.slice(0, 25) + "..." : email;

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

  const PreviewContent = () => (
    <div className="absolute sm:top-[90px] top-[200px] sm:top-[138px] min-h-[500px] flex flex-col sm:gap-10 gap-[56px] rounded-[24px] px-[56px] sm:px-8 py-[48px] sm:py-4 sm:shadow-none shadow-custom-focus max-w-[500px] w-full bg-[#fff]">
      <div className="flex flex-col gap-[25px]">
        <Image
          src={profileData.selectedImage || defaultImage}
          alt="Profile Picture"
          width={104}
          height={104}
          objectFit="contain"
          className={`${profileData.selectedImage ? 'border border-[4px] border-[#633CFF] brightness-[.7]' : ''} w-[154px] h-[154px] rounded-full mx-auto`}
        />
        <div>
          <p className="text-center font-[700] sm:text-[24px] text-[32px] leading-[48px]">
            {profileData.firstName && profileData.lastName
              ? `${truncatedName}`
              : "Your name"}
          </p>
          <p className="text-center font-[400] text-[16px] text-[#737373]">
            {profileData.email
              ? `${truncatedEmail}`
              : "Your email"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-[20px]">
        {links.length > 0 ?
          <>
            {links.map((link) => (
              <div key={link.id}>
                <Link href={link.url}>
                  <div className={`flex justify-between p-4 w-full text-[#fff] rounded-[12px] cursor-pointer ${getLinkBackgroundColor(link.platform)}`}>
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
                </Link>
              </div>
            ))}
          </>
          :
          <div className="flex flex-col gap-5">
            <div className="flex justify-between p-4 w-full bg-[#000] text-[#fff] rounded-[12px] cursor-pointer">
              <div className="flex gap-4 items-center">
                <FaLink />
                <p>Link #1</p>
              </div>
              <Image src={arrow} alt="Arrow" width={16} height={16} />
            </div>

            <div className="flex justify-between p-4 w-full text-[#fff] rounded-[12px] bg-[#EE3939] cursor-pointer">
              <div className="flex gap-4 items-center">
                <FaLink />
                <p>Link #2</p>
              </div>
              <Image src={arrow} alt="Arrow" width={16} height={16} />
            </div>

            <div className="flex justify-between p-4 w-full text-[#fff] rounded-[12px] bg-[#2D68FF] cursor-pointer">
              <div className="flex gap-4 items-center">
                <FaLink />
                <p>Link #3</p>
              </div>
              <Image src={arrow} alt="Arrow" width={16} height={16} />
            </div>
          </div>
        }
      </div>
    </div>
  )

  return (
    <div className="flex justify-center">
      <div className="relative h-[231px] bg-[#633CFF] w-full rounded-br-[12px] rounded-bl-[12px] sm:hidden"></div>
      <PreviewContent />
    </div>
  )
}

export default ProfilePreview