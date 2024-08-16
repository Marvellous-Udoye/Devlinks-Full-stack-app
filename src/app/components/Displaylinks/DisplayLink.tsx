import Image from "next/image";
import styles from "./DisplayLink.module.css";

export default function DisplayLink() {
  return (
    <div className={`${styles.display_ctn_holder} tb:hidden w-[858px] bg-[#FAFAFA] pl-6 pb-6 `}>
      <aside className={styles.display_ctn}>

      </aside>
    </div>
  );
}