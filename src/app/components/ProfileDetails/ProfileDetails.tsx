"use client";

import Image from "next/image";
import styles from "./Profile.module.css";
import { useState, useRef } from "react";
import image from "../../../../public/images/ph_image.svg";
import imageChange from "../../../../public/images/ph_image_white.svg";

export default function CustomizeLinks() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<ValidationError>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  type ValidationError = {
    firstName?: string
    lastName?: string
    email?: string
  };

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    }
  }

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.firstName) {
      setErrors((prevErrors) => ({ prevErrors, firstName: undefined }))
    }
  }

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.lastName) {
      setErrors((prevErrors) => ({ prevErrors, lastName: undefined }))
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.email) {
      setErrors((prevErrors) => ({ prevErrors, email: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({})

    let valid = true;
    const newErrors: ValidationError = {};

    if (!firstName) {
      valid = false
      newErrors.firstName = "Can't be empty"
    }

    if (!lastName) {
      valid = false
      newErrors.lastName = "Can't be empty"
    }

    if (email && !email.endsWith('@gmail.com')) {
      valid = false
      newErrors.email = "Please check again"
    }


    if (!valid) {
      setErrors(newErrors);
    }
  };

  return (
    <div className={styles.profile_details_component}>
      <section className={styles.profile_ctn}>
        <div className={styles.profile_head}>
          <p className="text-[32px] font-[700] leading-[48px] mb-[8px]">Profile Details</p>
          <p className="text-[16px] font-[400] text-[#737373]">
            Add your details to create a personal touch to your profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.profile_picture}>
          <p className="max-w-[240px] w-full text-[16px] font-[400px] text-[#737373]">Profile Picture</p>

          {selectedImage ? (
            <div className={styles.upload_image}>
              <Image
                src={selectedImage}
                alt="Selected Image"
                width={193}
                height={193}
                className={`rounded-[12px] w-full h-[193px] object-cover brightness-50 ${styles.upload_image_small_screen}`}
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="rounded-[12px] absolute inset-0 opacity-0"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <div
                  onClick={handleDivClick}
                  className={`absolute top-[30%] left-[20%] flex flex-col gap-2 cursor-pointer ${styles.file_change_small_screen}`}
                >
                  <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M33.75 6.25H6.25C5.58696 6.25 4.95107 6.51339 4.48223 6.98223C4.01339 7.45107 3.75 8.08696 3.75 8.75V31.25C3.75 31.913 4.01339 32.5489 4.48223 33.0178C4.95107 33.4866 5.58696 33.75 6.25 33.75H33.75C34.413 33.75 35.0489 33.4866 35.5178 33.0178C35.9866 32.5489 36.25 31.913 36.25 31.25V8.75C36.25 8.08696 35.9866 7.45107 35.5178 6.98223C35.0489 6.51339 34.413 6.25 33.75 6.25ZM33.75 8.75V24.8047L29.6766 20.7328C29.4444 20.5006 29.1688 20.3164 28.8654 20.1907C28.5621 20.0651 28.2369 20.0004 27.9086 20.0004C27.5802 20.0004 27.2551 20.0651 26.9518 20.1907C26.6484 20.3164 26.3728 20.5006 26.1406 20.7328L23.0156 23.8578L16.1406 16.9828C15.6718 16.5143 15.0362 16.2512 14.3734 16.2512C13.7107 16.2512 13.075 16.5143 12.6062 16.9828L6.25 23.3391V8.75H33.75ZM6.25 26.875L14.375 18.75L26.875 31.25H6.25V26.875ZM33.75 31.25H30.4109L24.7859 25.625L27.9109 22.5L33.75 28.3406V31.25ZM22.5 15.625C22.5 15.2542 22.61 14.8916 22.816 14.5833C23.022 14.275 23.3149 14.0346 23.6575 13.8927C24.0001 13.7508 24.3771 13.7137 24.7408 13.786C25.1045 13.8584 25.4386 14.037 25.7008 14.2992C25.963 14.5614 26.1416 14.8955 26.214 15.2592C26.2863 15.6229 26.2492 15.9999 26.1073 16.3425C25.9654 16.6851 25.725 16.978 25.4167 17.184C25.1084 17.39 24.7458 17.5 24.375 17.5C23.8777 17.5 23.4008 17.3025 23.0492 16.9508C22.6975 16.5992 22.5 16.1223 22.5 15.625Z" fill="white" />
                  </svg>
                  <p className="text-[16px] font-[600] text-[#fff] text-center">
                    Change Image
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.upload_image}>
              <input
                type="file"
                accept="image/*"
                className="rounded-[12px] absolute inset-0 opacity-0"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div
                onClick={handleDivClick}
                className={`absolute top-[30%] left-[20%] flex flex-col gap-2 cursor-pointer ${styles.file_change_small_screen}`}
              >
                <div className="flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M33.75 6.25H6.25C5.58696 6.25 4.95107 6.51339 4.48223 6.98223C4.01339 7.45107 3.75 8.08696 3.75 8.75V31.25C3.75 31.913 4.01339 32.5489 4.48223 33.0178C4.95107 33.4866 5.58696 33.75 6.25 33.75H33.75C34.413 33.75 35.0489 33.4866 35.5178 33.0178C35.9866 32.5489 36.25 31.913 36.25 31.25V8.75C36.25 8.08696 35.9866 7.45107 35.5178 6.98223C35.0489 6.51339 34.413 6.25 33.75 6.25ZM33.75 8.75V24.8047L29.6766 20.7328C29.4444 20.5006 29.1688 20.3164 28.8654 20.1907C28.5621 20.0651 28.2369 20.0004 27.9086 20.0004C27.5802 20.0004 27.2551 20.0651 26.9518 20.1907C26.6484 20.3164 26.3728 20.5006 26.1406 20.7328L23.0156 23.8578L16.1406 16.9828C15.6718 16.5143 15.0362 16.2512 14.3734 16.2512C13.7107 16.2512 13.075 16.5143 12.6062 16.9828L6.25 23.3391V8.75H33.75ZM6.25 26.875L14.375 18.75L26.875 31.25H6.25V26.875ZM33.75 31.25H30.4109L24.7859 25.625L27.9109 22.5L33.75 28.3406V31.25ZM22.5 15.625C22.5 15.2542 22.61 14.8916 22.816 14.5833C23.022 14.275 23.3149 14.0346 23.6575 13.8927C24.0001 13.7508 24.3771 13.7137 24.7408 13.786C25.1045 13.8584 25.4386 14.037 25.7008 14.2992C25.963 14.5614 26.1416 14.8955 26.214 15.2592C26.2863 15.6229 26.2492 15.9999 26.1073 16.3425C25.9654 16.6851 25.725 16.978 25.4167 17.184C25.1084 17.39 24.7458 17.5 24.375 17.5C23.8777 17.5 23.4008 17.3025 23.0492 16.9508C22.6975 16.5992 22.5 16.1223 22.5 15.625Z" fill="#633CFF" />
                  </svg>
                </div>
                <p className="text-[16px] font-[600] text-[#633CFF]">
                  + Upload Image
                </p>
              </div>
            </div>
          )}

          <div>
            <p className="text-[12px] font-[400px] text-[#737373]">Image must be below 1024x1024px. Use PNG or JPG format.</p>
          </div>
        </form>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-[20px] bg-[#FAFAFA] rounded-[12px]">
          <div className={styles.profile_details}>
            <label
              htmlFor="firstName"
              className="font-[400] text-[16px] text-[#737373]"
            >
              First Name*
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onFocus={handleFirstNameChange}
              placeholder="e.g. John"
              className={`max-w-[432px] w-full rounded-[8px] border px-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF] ${errors.firstName ? styles['invalid'] : ''}`}
            />
            {errors.firstName &&
              <p className={`${styles.error_message} font-[400] text-[12px] text-[#FF3939]`}>
                {errors.firstName}
              </p>
            }
          </div>

          <div className={styles.profile_details}>
            <label
              htmlFor="lastName"
              className="font-[400] text-[16px] text-[#737373]"
            >
              Last Name*
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onFocus={handleLastNameChange}
              placeholder="e.g. Appleseed"
              className={`max-w-[432px] w-full rounded-[8px] border px-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF] ${errors.lastName ? styles['invalid'] : ''}`}
            />
            {errors.lastName &&
              <p className={`${styles.error_message} font-[400] text-[12px] text-[#FF3939]`}>
                {errors.lastName}
              </p>
            }
          </div>

          <div className={styles.profile_details}>
            <label
              htmlFor="email"
              className="font-[400] text-[16px] text-[#737373]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleEmailChange}
              placeholder="e.g. email@example.com"
              className={`max-w-[432px] w-full rounded-[8px] border px-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF] ${errors.email ? styles['invalid'] : ''}`}
            />
            {errors.email &&
              <p className={`${styles.error_message} font-[400] text-[12px] text-[#FF3939]`}>
                {errors.email}
              </p>
            }
          </div>
        </form>

      </section>
      <section className={styles.btn_section}>
        <button
          onClick={handleSubmit}
          id="save"
          type="submit"
          className={styles.save_btn}
        >
          Save
        </button>
      </section>
    </div>
  );
}


