"use client";

import Image from "next/image";
import styles from "./Customize.module.css";
import phone from "../../../../public/images/Group 273.svg";
import { useState } from "react";

export default function CustomizeLinks() {
  const [links, setLinks] = useState<{ id: number; platform: string; url: string }[]>([]);
  const [errors, setErrors] = useState<ValidationError>({});
  const [isSaveButtonActive, setIsSaveButtonActive] = useState(false); 

  type ValidationError = {
    [key: number]: { platform?: string; url?: string };
    isSaveButtonActive?: boolean
  };

  const handleLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setLinks(updatedLinks);

    if (errors[index] && errors[index][field as keyof ValidationError[keyof ValidationError]]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [index]: { ...prevErrors[index], [field]: undefined },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    const newErrors: ValidationError = {};

    links.forEach((link, index) => {
      if (!link.url) {
        valid = false;
        newErrors[index] = { ...newErrors[index], url: "Can't be empty" };
      } else if (!link.url.startsWith("https://")) {
        valid = false;
        newErrors[index] = { ...newErrors[index], url: "Please check the URL" };
      } else if (!link.url.endsWith(".com")) {
        valid = false;
        newErrors[index] = { ...newErrors[index], url: "Please check the URL" };
      }
    });

    if (!valid) {
      setErrors(newErrors);
    }
  };

  const removeLink = (linkId: number) => {
    setLinks(links.filter((link) => link.id !== linkId));
  };

  const addLink = () => {
    const newLinkId = links.length > 0 ? links[links.length - 1].id + 1 : 1;
    setLinks([...links, { id: newLinkId, platform: "", url: "" }]);
    setIsSaveButtonActive(true); 
  };

  return (
    <div className="w-full bg-[#FAFAFA] px-6 pb-6">
      <section className={styles.customize_ctn}>
        <div className={styles.custom_head}>
          <p className="text-[32px] font-[700] leading-[48px] mb-[8px]">Customize your links</p>
          <p className="text-[16px] font-[400] text-[#737373]">
            Add/edit/remove links below and then share all your profiles with the world!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[24px]">
          <button
            onClick={addLink}
            className="w-full text-[#633CFF] text-[16px] font-[600] py-[11px] px-[27px] border-[1.5px] border-[#633CFF] rounded-[8px] focus:outline-none hover:bg-[#EFEBFF] transform transition ease duration-100"
          >
            + Add new link
          </button>

        {links.length === 0 && (
          <div className={styles.links_ctn}>
            <Image
              src={phone}
              alt="Phone"
              width={249.53}
              height={160}
              className="mx-auto"
            />
            <div className={styles.empty_links}>
              <p className="text-[32px] font-[700] text-center">Let's get you started</p>
              <p className="text-[16px] font-[400] text-center text-[#737373] max-w-[488px] mx-auto">
                Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!
              </p>
            </div>
          </div>
        )}

          {links.map((link, index) => (
            <div className={styles.links} key={link.id}>
              <div className="flex justify-between display-inline-block">
                <p className="text-[16px] font-[700] text-[#737373] flex gap-2">
                  <span className="font-[400] flex flex-col gap-1 my-auto">
                    <span className="w-[12px] h-[1px] bg-[#737373]"></span>
                    <span className="w-[12px] h-[1px] bg-[#737373]"></span>
                  </span>
                  <span>Link #{index + 1}</span>
                </p>
                <button
                  onClick={() => removeLink(link.id)}
                  className="text-[16px] font-[400] text-[#737373]"
                >
                  Remove
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor={`platform-${link.id}`}
                    className="font-[400] text-[12px] text-[#333]"
                  >
                    Platform
                  </label>
                  <select
                    id={`platform-${link.id}`}
                    value={link.platform}
                    onChange={(e) => handleLinkChange(index, "platform", e.target.value)}
                    className="rounded-[8px] border px-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF]"
                  >
                    <option value="Github">Github</option>
                    <option value="Youtube">Youtube</option>
                    <option value="Linkedin">Linkedin</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Frontend Mentor">Frontend Mentor</option>
                  </select>
                </div>

                <div className="relative flex flex-col w-full gap-1">
                  <label
                    htmlFor={`link-${link.id}`}
                    className={`font-[400] text-[12px] text-[#333] ${errors[index]?.url ? styles['invalid-label'] : ''}`}
                  >
                    Link
                  </label>
                  <input
                    id={`link-${link.id}`}
                    type="text"
                    value={link.url}
                    onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                    placeholder="e.g. https://www.github.com/johnappleseed"
                    className={`rounded-[8px] border px-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF] ${errors[index]?.url ? styles['invalid'] : ''}`}
                  />
                  {errors[index]?.url && (
                    <p className="absolute right-4 top-12 transform -translate-y-1/2 font-[400] text-[12px] text-[#FF3939]">
                      {errors[index].url}
                    </p>
                  )}
                </div>
              </form>
            </div>
          ))}
        </div>
      </section>
      <section className="py-[24px] px-[40px] flex justify-end border-t-[1px] border-t-[#D9D9D9] bg-[#fff]">
        <button
          onClick={handleSubmit}
          id="save"
          type="submit"
          className={`${styles.save_btn} ${isSaveButtonActive ? styles['opacity-100'] : styles['opacity-25']} transition-opacity duration-300 ${links.length == 0 ? styles['opacity-25'] : ''}`}
        >
          Save
        </button>
      </section>
    </div>
  );
}
