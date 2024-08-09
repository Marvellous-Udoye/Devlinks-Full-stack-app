import Image from "next/image";
import styles from "./DisplayLink.module.css";

export default function DisplayLink() {
    return (
        <div className="max-w-[608px] bg-[#FAFAFA] px-6 pb-6 ">
            <aside className={styles.display_ctn}>
                {/* <div className="border-[1px] border-[#737373] rounded-10"></div>
                <div className="border-[1px] border-[#737373] rounded-10 my-[10px] mx-[11px]"></div> */}
            </aside>
        </div>
    );
}