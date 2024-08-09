import Image from "next/image";
import styles from "./Customize.module.css";

export default function CustomizeLinks() {
  return (
    <div className="max-w-[831px] bg-[#FAFAFA] pr-6 pb-6 ">
      <section className={styles.customize_ctn}>
        <div className={styles.custom_head}>
          <p className="text-[32px] font-[700] ">Customize your links</p>
            <p className="text-[16px] font-[400] text-[#737373">Add/edit/remove links below and then share all your profiles with the world!</p>
        </div>
        <div className="grid column gap-[24px]">
          <button className="w-full text-[] font-[] border-[1px] border-[] rounded-[] focus:outline-none hover:bg-[] ">+ Add new link</button>
          <div className={styles.Links}>

          </div>
        </div>
      </section>
      <section>
        <button>Save</button>
      </section>
    </div>
  );
}