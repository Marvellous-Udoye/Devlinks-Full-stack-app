"use client"

import Image from "next/image";
import styles from "./ProfilePrev.module.css";
import arrow from "../../../../public/images/mdi_arrow-right.svg";
import defaultImage from "../../../../public/images/logo.svg"

interface ProfilePreviewProps {
  profilePreviewData: {
    firstName: string;
    lastName: string;
    email: string;
    selectedImage: string | null;
  } | null;
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ profilePreviewData }) => {
  if (!profilePreviewData) {
    return <div className={styles.profile_preview_ctn}>
      <div className={styles.profile_ctn_holder}></div>
      <div className={styles.profile_preview}>
        <div className="flex flex-col gap-[25px] ">
          <Image
            src={defaultImage}
            alt="Profile Picture"
            width={104}
            height={104}
            className="rounded-50 mx-auto"
          />
          <div>
            <p className="text-center font-[700] text-[32px] leading-48px">{ }</p>
            <p className="text-center font-[400] text-[16px] text-[#737373]">{ }</p>
          </div>
        </div>

        <div className="flex flex-col gap-[20px]">
          <div className="flex justify-between p-4 w-full bg-[#000] text-[#fff] rounded-[12px]">
            Github
            <Image
              src={arrow}
              alt="Arrow"
              width={16}
              height={16}
            />
          </div>
          <div className="flex justify-between p-4 w-full text-[#fff] rounded-[12px] bg-[#EE3939]">
            Youtube
            <Image
              src={arrow}
              alt="Arrow"
              width={16}
              height={16}
            />
          </div>
          <div className="flex justify-between p-4 w-full text-[#fff] rounded-[12px] bg-[#2D68FF]">
            Linkedin
            <Image
              src={arrow}
              alt="Arrow"
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>
    </div>;
  }

  const { firstName, lastName, email, selectedImage } = profilePreviewData;

  return (
    <div className={styles.profile_preview_ctn}>
      <div className={styles.profile_ctn_holder}></div>
      <div className={styles.profile_preview}>
        <div className="flex flex-col gap-[25px] ">
          {profilePreviewData.selectedImage ? (
            <Image
              src={profilePreviewData.selectedImage}
              alt="Profile Picture"
              width={104}
              height={104}
              className="rounded-50 mx-auto"
            />
          ) : (
            <Image
              src={defaultImage}
              alt="Profile Picture"
              width={104}
              height={104}
              className="rounded-50 mx-auto"
            />
          )}
          <div>
            <p className="text-center font-[700] text-[32px] leading-48px">{profilePreviewData.firstName} {profilePreviewData.lastName}</p>
            <p className="text-center font-[400] text-[16px] text-[#737373]">{profilePreviewData.email || ''}</p>
          </div>
        </div>

        <div className="flex flex-col gap-[20px]">
          <div className="flex justify-between p-4 w-full bg-[#000] text-[#fff] rounded-[12px]">
            Github
            <Image
              src={arrow}
              alt="Arrow"
              width={16}
              height={16}
            />
          </div>
          <div className="flex justify-between p-4 w-full text-[#fff] rounded-[12px] bg-[#EE3939]">
            Youtube
            <Image
              src={arrow}
              alt="Arrow"
              width={16}
              height={16}
            />
          </div>
          <div className="flex justify-between p-4 w-full text-[#fff] rounded-[12px] bg-[#2D68FF]">
            Linkedin
            <Image
              src={arrow}
              alt="Arrow"
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePreview