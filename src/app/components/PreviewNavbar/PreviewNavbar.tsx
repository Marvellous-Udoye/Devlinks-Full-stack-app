"use client"

import Link from "next/link";

export default function Preview() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Devlinks",
          text: "Checkout my profile on social media",
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing content', error);
      }
    } else {
      alert('Web Share API is not supported in your browser');
    }
  };

  return (
    <nav className="flex justify-between p-6 bg-[#633CFF] sm:p-0 sm:bg-white">
      <div className="flex items-center justify-between rounded-[12px] pl-6 pr-4 py-4 bg-white w-full">
        <Link href='/home'>
          <button className="py-[11px] sm:px-[20px] px-[27px] rounded-[8px] border border-[#633CFF] text-[16px] font-[600] leading-[24px] transform transition ease-in-out duration-100 hover:bg-[#EFEBFF] text-[#633CFF]">
            Back to Editor
          </button>
        </Link>
        <button
          onClick={handleShare}
          className="py-[11px] sm:px-[20px] px-[27px] rounded-[8px] border border-[#633CFF] text-[16px] font-[600] leading-[24px] transform transition ease-in-out duration-100 bg-[#633CFF] text-white"
        >
          Share Link
        </button>
      </div>
    </nav>
  );
}