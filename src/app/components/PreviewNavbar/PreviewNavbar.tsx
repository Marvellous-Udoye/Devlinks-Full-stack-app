"use client"

import styles from "./Preview.module.css";
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
    <nav className={styles.preview_navbar}>
      <div className={styles.preview_navbar_ctn}>
        <Link href='/Home'>
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
  );
}

