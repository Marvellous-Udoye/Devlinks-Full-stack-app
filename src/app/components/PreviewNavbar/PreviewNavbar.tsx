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
      <nav className={styles.preview_navbar}>
        <div className="flex items-center justify-between rounded-[12px] px-6 py-4 bg-[#fff] w-full">
          <Link href='/HomePage'>
            <button className={`${styles.preview_btn} hover:bg-[#EFEBFF] text-[#633CFF]`}>
              Back to Editor
            </button>
          </Link>
          <button
            onClick={handleShare}
            className={`${styles.preview_btn} bg-[#633CFF] text-[#fff]`}>
            Share Link
          </button>
        </div>
      </nav>
    </div>
  );
}

