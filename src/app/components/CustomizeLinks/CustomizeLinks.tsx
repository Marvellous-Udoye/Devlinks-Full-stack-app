import Image from "next/image";
import styles from "./Customize.module.css";
import phone from "../../../../public/images/Group 273.svg"

export default function CustomizeLinks() {
  return (
    <div className="w-full bg-[#FAFAFA] px-6 pb-6 ">
      <section className={styles.customize_ctn}>
        <div className={styles.custom_head}>
          <p className="text-[32px] font-[700] leading-[48px] mb-[8px]">Customize your links</p>
          <p className="text-[16px] font-[400] text-[#737373]">Add/edit/remove links below and then share all your profiles with the world!</p>
        </div>
        <div className="grid grid-cols-1 gap-[24px]">
          <button className="w-full text-[#633CFF] text-[16px] font-[600] py-[11px] px-[27px] border-[1.5px] border-[#633CFF] rounded-[8px] focus:outline-none hover:bg-[#EFEBFF] transform transition ease duration-100 ">+ Add new link</button>
          <div className={styles.Links}>
            <Image
              src={phone}
              alt="Phone"
              width={249.53}
              height={160}
              className="mx-auto"
            />
            <div className="flex flex-col gap-[24px]">
              <p className="text-[32px] font-[700] text-center">Let's get you started</p>
              <p className="text-[16px] font-[400] text-center text-[#737373] max-w-[488px] mx-auto">Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-[24px] px-[40px] flex justify-end border-t-[1px] border-t-[#D9D9D9] bg-[#fff] ">
        <button className={styles.save_btn}>Save</button>
      </section>
    </div>
  );
}