"use client"

import styles from "./preview.module.css";
import Link from "next/link";

export default function Preview() {
  const handleShare = async () => {
    if (navigator.share) {
      {
        try {
          await navigator.share({
            title: "Devlinks",
            text: "Checkout my profile on social media",
            url: window.location.href,
          })
        } catch (error) {
          console.log('Error sharing content', error)
        }
      }
    }
    else {
      alert('Web Share API is not supported in your browser')
    }
  }

  return (
    <div>
      <nav className="flex justify-between p-6 bg-[#633CFF]">
        <div className="flex items-center justify-between rounded-[12px] px-6 py-4 bg-[#fff] w-full">
          <Link href='/HomePage'>
            <button className={`py-[11px] px-[27px] rounded-[8px] border-[1px] border-[#633CFF] text-[16px] font-[600] leading-[24px] transform transition ease-in-out duration-100 hover:bg-[#EFEBFF] text-[#633CFF]`}>
              Back to Editor
            </button>
          </Link>
          <button
            onClick={handleShare}
            className={`py-[11px] px-[27px] rounded-[8px] border-[1px] border-[#633CFF] text-[16px] font-[600] leading-[24px] transform transition ease-in-out duration-100 bg-[#633CFF] text-[#fff]`}>
            Share Link
          </button>
        </div>
      </nav>
    </div>
  );
}

