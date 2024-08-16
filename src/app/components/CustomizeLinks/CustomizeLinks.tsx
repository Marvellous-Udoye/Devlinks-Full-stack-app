"use client";

import styles from "./Customize.module.css";
import { useCallback, useState } from "react";
import Select, { components } from "react-select";
import { StylesConfig } from 'react-select';
import { useEffect } from "react";
import { FaGithub, FaYoutube, FaLinkedin, FaWhatsapp, FaFigma, FaUserAlt } from 'react-icons/fa';


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
    label: string;
    icon: JSX.Element;
  };

  const options: OptionType[] = [
    { value: 'Github', label: 'Github', icon: <FaGithub /> },
    { value: 'Youtube', label: 'Youtube', icon: <FaYoutube /> },
    { value: 'Linkedin', label: 'Linkedin', icon: <FaLinkedin /> },
    { value: 'WhatsApp', label: 'WhatsApp', icon: <FaWhatsapp /> },
    { value: 'Figma', label: 'Figma', icon: <FaFigma /> },
    { value: 'Ffrontend Mentor', label: 'Frontend Mentor', icon: <FaUserAlt /> },
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
      // Handle successful form submission 
    }
  };

  const addLink = () => {
    const newLinkId = validateCustomLinks.links.length > 0 ? (validateCustomLinks.links[validateCustomLinks.links.length - 1].id || 0) + 1 : 1;
    const newLinks = [...validateCustomLinks.links, { id: newLinkId, platform: "", url: "" }];
    setLinks(newLinks);
    setErrors({});
    setIsSaveButtonActive(true);
  };

  const removeLink = (linkId: number) => {
    const updatedLinks = validateCustomLinks.links.filter((link) => link.id !== linkId);
    setLinks(updatedLinks);
    setErrors({});
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

  const CustomOption = (props: any) => {
    return (
      <components.Option {...props}>
        <span className="flex items-center gap-3">{props.data.icon} {props.data.label}</span>
      </components.Option>
    );
  };

  const CustomSingleOption = (props: any) => {
    return (
      <components.SingleValue {...props}>
        <span className="flex items-center gap-3">
          {props.data.icon} {props.data.label}
        </span>
      </components.SingleValue>
    );
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
                    components={{ Option: CustomOption, SingleValue: CustomSingleOption }}
                    value={options.find(option => option.value === link.platform) || null}
                    onChange={(newValue) => handleLinkChange(index, "platform", (newValue as OptionType)?.value || '')}
                    styles={customStyles}
                    classNamePrefix="select"
                  />
                  {validateCustomLinks.errors[index]?.platform && (
                    <p className="text-right font-[400] text-[12px] text-[#FF3939] mr-4">
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
                  <svg className="absolute left-4 top-12 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8.52312 11.7207C8.59304 11.7903 8.64852 11.8731 8.68638 11.9643C8.72423 12.0555 8.74372 12.1532 8.74372 12.2519C8.74372 12.3506 8.72423 12.4484 8.68638 12.5395C8.64852 12.6307 8.59304 12.7135 8.52312 12.7832L8.15187 13.1544C7.44839 13.8579 6.49425 14.2531 5.49937 14.2531C4.50449 14.2531 3.55036 13.8579 2.84687 13.1544C2.14339 12.4509 1.74817 11.4968 1.74817 10.5019C1.74817 9.50702 2.14339 8.55289 2.84687 7.8494L4.35437 6.34253C5.0303 5.66493 5.93973 5.27142 6.89639 5.2426C7.85304 5.21378 8.78451 5.55184 9.5 6.18753C9.57387 6.25319 9.63408 6.33276 9.6772 6.42169C9.72032 6.51062 9.7455 6.60717 9.7513 6.70583C9.7571 6.8045 9.74342 6.90333 9.71102 6.99671C9.67863 7.09008 9.62816 7.17616 9.5625 7.25003C9.49684 7.3239 9.41727 7.38411 9.32834 7.42723C9.23941 7.47035 9.14286 7.49552 9.04419 7.50133C8.94553 7.50713 8.84669 7.49345 8.75332 7.46105C8.65995 7.42866 8.57387 7.37819 8.5 7.31253C8.07095 6.93148 7.51252 6.72877 6.93895 6.74584C6.36537 6.76292 5.81999 6.9985 5.41437 7.4044L3.90812 8.9094C3.4861 9.33143 3.24901 9.90382 3.24901 10.5007C3.24901 11.0975 3.4861 11.6699 3.90812 12.0919C4.33015 12.5139 4.90254 12.751 5.49937 12.751C6.09621 12.751 6.6686 12.5139 7.09062 12.0919L7.46187 11.7207C7.53153 11.6509 7.61424 11.5956 7.70529 11.5579C7.79634 11.5201 7.89394 11.5007 7.9925 11.5007C8.09106 11.5007 8.18866 11.5201 8.2797 11.5579C8.37075 11.5956 8.45347 11.6509 8.52312 11.7207ZM13.1531 2.84565C12.4491 2.14325 11.4951 1.74878 10.5006 1.74878C9.5061 1.74878 8.55219 2.14325 7.84812 2.84565L7.47687 3.2169C7.33598 3.3578 7.25682 3.54889 7.25682 3.74815C7.25682 3.94741 7.33598 4.13851 7.47687 4.2794C7.61777 4.4203 7.80887 4.49945 8.00812 4.49945C8.20738 4.49945 8.39848 4.4203 8.53937 4.2794L8.91062 3.90815C9.33265 3.48613 9.90504 3.24903 10.5019 3.24903C11.0987 3.24903 11.6711 3.48613 12.0931 3.90815C12.5152 4.33018 12.7522 4.90257 12.7522 5.4994C12.7522 6.09624 12.5152 6.66863 12.0931 7.09065L10.5862 8.59815C10.1803 9.00388 9.63459 9.23912 9.06087 9.25574C8.48715 9.27235 7.92877 9.06908 7.5 8.68753C7.42613 8.62187 7.34005 8.5714 7.24668 8.539C7.15331 8.50661 7.05447 8.49292 6.9558 8.49873C6.85714 8.50453 6.76059 8.52971 6.67166 8.57283C6.58273 8.61595 6.50316 8.67616 6.4375 8.75003C6.37184 8.8239 6.32137 8.90997 6.28898 9.00335C6.25658 9.09672 6.24289 9.19556 6.2487 9.29422C6.2545 9.39288 6.27968 9.48944 6.3228 9.57837C6.36592 9.6673 6.42613 9.74687 6.5 9.81253C7.21499 10.4481 8.14583 10.7863 9.10204 10.7581C10.0582 10.7299 10.9675 10.3373 11.6437 9.66065L13.1512 8.15378C13.8545 7.44989 14.2496 6.49571 14.25 5.50073C14.2503 4.50575 13.8559 3.55129 13.1531 2.8469V2.84565Z" fill="#737373" />
                  </svg>
                  <input
                    id={`link-${link.id}`}
                    type="text"
                    value={link.url || ""}
                    onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                    placeholder="e.g. https://www.github.com/johnappleseed"
                    className={`rounded-[8px] border pl-11 pr-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF] ${validateCustomLinks.errors[index]?.url ? styles['invalid'] : ''}`}
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
          className={`${styles.save_btn} ${validateCustomLinks.isSaveButtonActive ? styles['opacity-100'] : styles['opacity-25']} transition-opacity duration-300 ${validateCustomLinks.links.length == 0 ? styles['opacity-25'] : styles['opacity-100']}`}
        >
          Save
        </button>
      </section>
    </div>
  );
}
