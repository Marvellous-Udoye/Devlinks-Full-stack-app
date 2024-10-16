"use client";

import { RootState } from "@/app/redux/store";
import Image from "next/image";
import { useSelector } from "react-redux";
import defaultImage from "../../../../public/images/logo.svg";
import arrow from "../../../../public/images/mdi_arrow-right.svg";
import Link from "next/link";

const ProfilePreview = () => {
  const profileData = useSelector((state: RootState) => state.profile);
  const links = useSelector((state: RootState) => state.links.links)

  const PreviewContent = () => (
    <div className="absolute sm:top-[90px] top-[200px] sm:top-[138px] flex flex-col sm:gap-10 gap-[56px] rounded-[24px] px-[56px] sm:px-8 py-[48px] sm:py-4 sm:shadow-none shadow-custom-focus max-w-[500px] w-full bg-[#fff]">
      <div className="flex flex-col gap-[25px]">
        <Image
          src={profileData.selectedImage || defaultImage}
          alt="Profile Picture"
          width={104}
          height={104}
          objectFit="contain"
          className={`rounded-full mx-auto w-[154px] h-[154px] ${profileData.selectedImage ? 'border-[4px]' : ''} border-[#633CFF] brightness-[.7]`}
        />
        <div>
          <p className="text-center font-[700] sm:text-[24px] text-[32px] leading-[48px]">
            {profileData.firstName && profileData.lastName
              ? `${profileData.firstName} ${profileData.lastName}`
              : "Your Name"}
          </p>
          <p className="text-center font-[400] text-[16px] text-[#737373]">
            {profileData.email || "Your email"}
          </p>
        </div>
      </div>

      {links ?
        <div className="flex flex-col gap-[20px]">
          {links.map((link) => (
            <div key={link.id}>
              <Link href={link.url}>
                <div className="flex justify-between p-4 w-full bg-[#000] text-[#fff] rounded-[12px]">
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
        </div>
        :
        <div className="flex flex-col gap-[20px]">
          <Link href={''}>
            <div className="flex justify-between p-4 w-full bg-[#000] text-[#fff] rounded-[12px]">
              {profileData.firstName ? "Github" : "Link #1"}
              <Image src={arrow} alt="Arrow" width={16} height={16} />
            </div>
          </Link>
          <Link href={''}>
            <div className="flex justify-between p-4 w-full text-[#fff] rounded-[12px] bg-[#EE3939]">
              {profileData.firstName ? "Youtube" : "Link #2"}
              <Image src={arrow} alt="Arrow" width={16} height={16} />
            </div>
          </Link>
          <Link href={''}>
            <div className="flex justify-between p-4 w-full text-[#fff] rounded-[12px] bg-[#2D68FF]">
              {profileData.firstName ? "Linkedin" : "Link #3"}
              <Image src={arrow} alt="Arrow" width={16} height={16} />
            </div>
          </Link>
        </div>
      }
    </div >
  )

  return (
    <div className="flex justify-center">
      <div className="relative h-[231px] bg-[#633CFF] w-full rounded-br-[12px] rounded-bl-[12px] sm:hidden"></div>
      <PreviewContent />
    </div>
  )
}

export default ProfilePreview