"use client";

import styles from "./Customize.module.css";
import { useCallback, useState } from "react";
import Select from "react-select";
import { StylesConfig } from 'react-select';
import { useEffect } from "react";

export default function CustomizeLinks() {
  const [validateCustomLinks, setValidateCustomLinks] = useState<{
    links: LinkType;
    errors: ValidationError;
    isSaveButtonActive: boolean;
  }>({
    links: [],
    errors: {},
    isSaveButtonActive: false
  });

  type ValidationError = {
    [key: number]: {
      platform?: string;
      url?: string;
    };
  };

  type LinkType = {
    id?: number;
    platform?: string;
    url?: string;
  }[];

  type OptionType = {
    value: string;
    label: string
  };

  const options: OptionType[] = [
    { value: 'Github', label: 'Github' },
    { value: 'Youtube', label: 'Youtube' },
    { value: 'Linkedin', label: 'Linkedin' },
    { value: 'WhatsApp', label: 'WhatsApp' },
    { value: 'Frontend Mentor', label: 'Frontend Mentor' },
  ];

  const setLinks = (newLinks: LinkType) => {
    setValidateCustomLinks((prevState) => ({ ...prevState, links: newLinks }));
    saveLinksToLocalStorage(newLinks);
  };

  const setErrors = (newCustomErrors: ValidationError) => {
    setValidateCustomLinks((prevState) => ({ ...prevState, errors: newCustomErrors }));
  };

  const setIsSaveButtonActive = (isActive: boolean) => {
    setValidateCustomLinks((prevState) => ({ ...prevState, isSaveButtonActive: isActive }));
  };

  const handleLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...validateCustomLinks.links];
    const updatedErrors = { ...validateCustomLinks.errors };
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setLinks(updatedLinks);

    if (updatedErrors[index] && updatedErrors[index][field as keyof ValidationError[number]]) {
      updatedErrors[index] = { ...updatedErrors[index], [field]: undefined };
      setErrors(updatedErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    const newErrors: ValidationError = {};

    validateCustomLinks.links.forEach((link, index) => {
      const errors: ValidationError[number] = {};
      if (!link.platform) {
        valid = false;
        errors.platform = "Select a platform";
      }
      if (!link.url) {
        valid = false;
        errors.url = "Can't be empty";
      } else if (!link.url.startsWith("https://")) {
        valid = false;
        errors.url = "Please check the URL";
      }

      if (Object.keys(errors).length > 0) {
        newErrors[index] = errors;
      }
    });

    if (!valid) {
      setErrors(newErrors);
    } else {
      setErrors({});
      // Handle successful form submission logic here
    }
  };

  const addLink = () => {
    const newLinkId = validateCustomLinks.links.length > 0 ? (validateCustomLinks.links[validateCustomLinks.links.length - 1].id || 0) + 1 : 1;
    const newLinks = [...validateCustomLinks.links, { id: newLinkId, platform: "", url: "" }];
    setLinks(newLinks);
    setIsSaveButtonActive(true);
  };

  const removeLink = (linkId: number) => {
    const updatedLinks = validateCustomLinks.links.filter((link) => link.id !== linkId);
    setLinks(updatedLinks);
  };

  const customStyles: StylesConfig<OptionType, false> = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '8px',
      padding: '4px 8px',
      borderColor: state.isFocused ? '#633CFF' : '#D1D5DB',
      boxShadow: state.isFocused ? '0px 0px 32px 0px rgba(99, 60, 255, 0.25)' : 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#EFEBFF' : 'white',
      color: state.isSelected ? '#633CFF' : '#333',
      '&:hover': {
        backgroundColor: '#EFEBFF',
        color: '#633CFF'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#333'
    })
  };

  const saveLinksToLocalStorage = (links: LinkType) => {
    localStorage.setItem("links", JSON.stringify(links));
  }

  const getLinksFromlocalStorage = useCallback(() => {
    const storedLinks = localStorage.getItem("links")
    if (storedLinks) {
      setLinks(JSON.parse(storedLinks))
    } else {
      localStorage.removeItem("links")
    }
  }, [])

  useEffect(() => {
    getLinksFromlocalStorage();
  }, [getLinksFromlocalStorage]);

  return (
    <div className={styles.customize_links_component}>
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

          {validateCustomLinks.links.length === 0 && (
            <div className={styles.links_ctn}>
              <svg className={`${styles.phone} mx-auto`} xmlns="http://www.w3.org/2000/svg" width="250" height="161" viewBox="0 0 250 161" fill="none">
                <path opacity="0.3" d="M48.6936 15.4213C23.3786 25.2238 4.59362 50.0679 0.857884 80.1285C-2.26282 105.459 5.19347 133.446 49.0884 141.419C134.494 156.939 222.534 158.754 242.952 116.894C263.369 75.0336 235.427 8.00293 192.079 3.36363C157.683 -0.326546 98.1465 -3.7206 48.6936 15.4213Z" fill="white" />
                <path d="M157.022 9.56714H93.044C89.0309 9.56714 85.7776 12.8204 85.7776 16.8336V137.744C85.7776 141.757 89.0309 145.01 93.044 145.01H157.022C161.036 145.01 164.289 141.757 164.289 137.744V16.8336C164.289 12.8204 161.036 9.56714 157.022 9.56714Z" fill="#333333" />
                <path opacity="0.03" d="M125.033 140.872C128.174 140.872 130.72 138.326 130.72 135.185C130.72 132.044 128.174 129.498 125.033 129.498C121.892 129.498 119.346 132.044 119.346 135.185C119.346 138.326 121.892 140.872 125.033 140.872Z" fill="#333333" />
                <path d="M156.628 21.321H93.4314V126.78H156.628V21.321Z" fill="#EFEBFF" />
                <path opacity="0.03" d="M117.797 120.508C118.938 120.508 119.862 119.583 119.862 118.443C119.862 117.302 118.938 116.377 117.797 116.377C116.656 116.377 115.732 117.302 115.732 118.443C115.732 119.583 116.656 120.508 117.797 120.508Z" fill="#333333" />
                <path opacity="0.44" d="M125.033 120.508C126.174 120.508 127.099 119.583 127.099 118.443C127.099 117.302 126.174 116.377 125.033 116.377C123.893 116.377 122.968 117.302 122.968 118.443C122.968 119.583 123.893 120.508 125.033 120.508Z" fill="white" />
                <path opacity="0.03" d="M132.269 120.508C133.41 120.508 134.335 119.583 134.335 118.443C134.335 117.302 133.41 116.377 132.269 116.377C131.129 116.377 130.204 117.302 130.204 118.443C130.204 119.583 131.129 120.508 132.269 120.508Z" fill="#333333" />
                <path opacity="0.03" d="M148.199 32.9534H101.867V72.5051H148.199V32.9534Z" fill="#333333" />
                <path opacity="0.03" d="M134.373 80.1285H101.867V83.7504H134.373V80.1285Z" fill="#333333" />
                <path opacity="0.03" d="M148.199 80.1285H136.567V83.7504H148.199V80.1285Z" fill="#333333" />
                <path opacity="0.03" d="M117.053 91.2371H101.867V94.8589H117.053V91.2371Z" fill="#333333" />
                <path opacity="0.03" d="M148.199 91.2371H120.28V94.8589H148.199V91.2371Z" fill="#333333" />
                <path opacity="0.03" d="M136.954 102.353H101.867V105.975H136.954V102.353Z" fill="#333333" />
                <path d="M78.6555 21.321H15.4592V126.78H78.6555V21.321Z" fill="#EFEBFF" />
                <path opacity="0.44" d="M39.8251 120.508C40.9657 120.508 41.8903 119.583 41.8903 118.443C41.8903 117.302 40.9657 116.377 39.8251 116.377C38.6844 116.377 37.7598 117.302 37.7598 118.443C37.7598 119.583 38.6844 120.508 39.8251 120.508Z" fill="white" />
                <path opacity="0.03" d="M47.0611 120.508C48.2018 120.508 49.1264 119.583 49.1264 118.443C49.1264 117.302 48.2018 116.377 47.0611 116.377C45.9205 116.377 44.9958 117.302 44.9958 118.443C44.9958 119.583 45.9205 120.508 47.0611 120.508Z" fill="#333333" />
                <path opacity="0.03" d="M54.297 120.508C55.4376 120.508 56.3623 119.583 56.3623 118.443C56.3623 117.302 55.4376 116.377 54.297 116.377C53.1563 116.377 52.2317 117.302 52.2317 118.443C52.2317 119.583 53.1563 120.508 54.297 120.508Z" fill="#333333" />
                <path opacity="0.03" d="M70.227 32.9534H23.8948V72.5051H70.227V32.9534Z" fill="#333333" />
                <path opacity="0.03" d="M56.4002 80.1285H23.8948V83.7504H56.4002V80.1285Z" fill="#333333" />
                <path opacity="0.03" d="M70.2274 80.1285H58.595V83.7504H70.2274V80.1285Z" fill="#333333" />
                <path opacity="0.03" d="M39.0807 91.2371H23.8948V94.8589H39.0807V91.2371Z" fill="#333333" />
                <path opacity="0.03" d="M70.2272 91.2371H42.3079V94.8589H70.2272V91.2371Z" fill="#333333" />
                <path opacity="0.03" d="M58.9819 102.353H23.8948V105.975H58.9819V102.353Z" fill="#333333" />
                <path d="M234.6 21.321H171.403V126.78H234.6V21.321Z" fill="#EFEBFF" />
                <path opacity="0.03" d="M195.769 120.508C196.91 120.508 197.834 119.583 197.834 118.443C197.834 117.302 196.91 116.377 195.769 116.377C194.629 116.377 193.704 117.302 193.704 118.443C193.704 119.583 194.629 120.508 195.769 120.508Z" fill="#333333" />
                <path opacity="0.03" d="M203.005 120.508C204.146 120.508 205.071 119.583 205.071 118.443C205.071 117.302 204.146 116.377 203.005 116.377C201.865 116.377 200.94 117.302 200.94 118.443C200.94 119.583 201.865 120.508 203.005 120.508Z" fill="#333333" />
                <path opacity="0.44" d="M210.242 120.508C211.382 120.508 212.307 119.583 212.307 118.443C212.307 117.302 211.382 116.377 210.242 116.377C209.101 116.377 208.176 117.302 208.176 118.443C208.176 119.583 209.101 120.508 210.242 120.508Z" fill="white" />
                <path opacity="0.03" d="M226.171 32.9534H179.839V72.5051H226.171V32.9534Z" fill="#333333" />
                <path opacity="0.03" d="M212.345 80.1285H179.839V83.7504H212.345V80.1285Z" fill="#333333" />
                <path opacity="0.03" d="M226.171 80.1285H214.539V83.7504H226.171V80.1285Z" fill="#333333" />
                <path opacity="0.03" d="M195.025 91.2371H179.839V94.8589H195.025V91.2371Z" fill="#333333" />
                <path opacity="0.03" d="M226.179 91.2371H198.26V94.8589H226.179V91.2371Z" fill="#333333" />
                <path opacity="0.03" d="M214.926 102.353H179.839V105.975H214.926V102.353Z" fill="#333333" />
                <path opacity="0.1" d="M146.597 145.041C146.597 144.281 144.987 113.15 146.02 108.519C147.053 103.887 156.529 81.2447 154.031 78.6023C151.533 75.96 142.383 81.9736 142.383 81.9736C142.383 81.9736 144.054 54.7073 140.105 52.7635C136.157 50.8197 134.403 58.4354 134.403 58.4354L132.3 88.9363L121.882 144.896L146.597 145.041Z" fill="#333333" />
                <path d="M139.559 113.295C140.887 107.979 142.884 102.793 144.16 97.4252C145.003 93.8717 150.455 79.0199 151.981 74.6463C152.451 73.3024 152.854 71.6775 151.943 70.5841C151.635 70.2644 151.252 70.0272 150.829 69.8946C150.406 69.7619 149.956 69.7379 149.521 69.8248C148.643 70.008 147.833 70.4312 147.182 71.0473C145.663 72.3836 142.862 78.9971 140.811 78.9895C138.329 78.9895 139.498 72.1558 139.43 70.8423C139.149 65.1855 139.566 57.9342 137.357 52.6191C135.717 48.6708 131.647 49.2023 130.69 53.4696C129.733 57.7368 129.771 75.6182 129.771 75.6182C129.771 75.6182 113.887 72.8924 111.176 77.7367C108.465 82.581 113.044 113.355 113.044 113.355L139.559 113.295Z" fill="#F4A28C" />
                <path d="M141.495 160.5L141.206 111.594L111.525 105.079L99.574 160.5H141.495Z" fill="#633CFF" />
                <path opacity="0.1" d="M141.495 160.5L141.206 111.594L127.038 108.481L124.502 160.5H141.495Z" fill="#333333" />
              </svg>
              <div className={styles.empty_links}>
                <p className="text-[32px] font-[700] text-center">Let&apos;s get you started</p>
                <p className="text-[16px] font-[400] text-center text-[#737373] max-w-[488px] mx-auto">
                  Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We&apos;re here to help you share your profiles with everyone!
                </p>
              </div>
            </div>
          )}

          {validateCustomLinks.links.map((link, index) => (
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
                  onClick={() => removeLink(link.id!)}
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
                  <Select
                    options={options}
                    value={options.find(option => option.value === link.platform) || null}
                    onChange={(newValue) => handleLinkChange(index, "platform", (newValue as OptionType)?.value || '')}
                    styles={customStyles}
                    classNamePrefix="select"
                  />
                  {validateCustomLinks.errors[index]?.platform && (
                    <p className={`${styles.error_message} font-[400] text-[12px] text-[#FF3939]`}>
                      {validateCustomLinks.errors[index].platform}
                    </p>
                  )}
                </div>

                <div className="relative flex flex-col w-full gap-1">
                  <label
                    htmlFor={`link-${link.id}`}
                    className={`font-[400] text-[12px] text-[#333] ${validateCustomLinks.errors[index]?.url ? styles['invalid-label'] : ''}`}
                  >
                    Link
                  </label>
                  <input
                    id={`link-${link.id}`}
                    type="text"
                    value={link.url || ""}
                    onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                    placeholder="e.g. https://www.github.com/johnappleseed"
                    className={`rounded-[8px] border px-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF] ${validateCustomLinks.errors[index]?.url ? styles['invalid'] : ''}`}
                  />
                  {validateCustomLinks.errors[index]?.url && (
                    <p className={`${styles.error_message} font-[400] text-[12px] text-[#FF3939]`}>
                      {validateCustomLinks.errors[index].url}
                    </p>
                  )}
                </div>
              </form>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.btn_section}>
        <button
          type="button"
          onClick={handleSubmit}
          className={`${styles.save_btn} ${validateCustomLinks.isSaveButtonActive ? styles['opacity-100'] : styles['opacity-25']} transition-opacity duration-300 ${validateCustomLinks.links.length === 0 ? styles['opacity-25'] : ''}`}
        >
          Save
        </button>
      </section>
    </div>
  );
}
