"use client"

import Image from "next/image";
import arrow from "../../../../public/images/mdi_arrow-right.svg";
import defaultImage from "../../../../public/images/logo.svg";
import { useProfileData } from "../profileContext";

const ProfilePreview = () => {
  const { profileData } = useProfileData()

  const PreviewContent = () => (
    <div className="absolute sm:top-[90px] top-[200px] sm:top-[138px] flex flex-col sm:gap-10 gap-[56px] rounded-[24px] px-[56px] sm:px-8 py-[48px] sm:py-4 sm:shadow-none shadow-[0px_0px_32px_0px_rgba(0,0,0,0.1)] max-w-[500px] w-full bg-[#fff]">
      <div className="flex flex-col gap-[25px]">
        <Image
          src={profileData.selectedImage || defaultImage}
          alt="Profile Picture"
          width={104}
          height={104}
          className="rounded-full mx-auto"
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

      <div className="flex flex-col gap-[20px]">
        <div className="flex justify-between p-4 w-full bg-[#000] text-[#fff] rounded-[12px]">
          {profileData.firstName ? "Github" : "Link #1"}
          <Image src={arrow} alt="Arrow" width={16} height={16} />
        </div>
        <div className="flex justify-between p-4 w-full text-[#fff] rounded-[12px] bg-[#EE3939]">
          {profileData.firstName ? "Youtube" : "Link #2"}
          <Image src={arrow} alt="Arrow" width={16} height={16} />
        </div>
        <div className="flex justify-between p-4 w-full text-[#fff] rounded-[12px] bg-[#2D68FF]">
          {profileData.firstName ? "Linkedin" : "Link #3"}
          <Image src={arrow} alt="Arrow" width={16} height={16} />
        </div>
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