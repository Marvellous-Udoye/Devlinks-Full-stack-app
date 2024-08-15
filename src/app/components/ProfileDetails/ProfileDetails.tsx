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
    setFirstName(e.target.value)
    if (errors.firstName) {
      setErrors((prevErrors) => ({ prevErrors, firstName: undefined }))
    }
  }

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
    if (errors.lastName) {
      setErrors((prevErrors) => ({ prevErrors, lastName: undefined }))
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
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
                className={`rounded-[12px] object-cover w-[193px] h-[193px] brightness-50 ${styles.upload_image_small_screen}`}
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
                  className={`absolute top-[30%] left-[20%] flex flex-col gap-2 cursor-pointer ${styles.file_change_small_screen}`}>
                  <Image
                    src={imageChange}
                    alt="Placeholder Image"
                    width={40}
                    height={40}
                    className="mx-auto"
                  />
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
                  <Image
                    src={image}
                    alt="Placeholder Image"
                    width={40}
                    height={40}
                  />
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
              onChange={handleFirstNameChange}
              placeholder="e.g. John"
              className={`max-w-[432px] w-full rounded-[8px] border px-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF] ${errors.firstName ? styles['invalid'] : ''}`}
            />
            {errors.firstName &&
              <p className={`${styles.error_message} font-[400] text-[12px] text-[#FF3939]`}>
                {errors.firstName}
              </p>}
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
              onChange={handleLastNameChange}
              placeholder="e.g. Appleseed"
              className={`max-w-[432px] w-full rounded-[8px] border px-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF] ${errors.lastName ? styles['invalid'] : ''}`}
            />
            {errors.lastName &&
              <p className={`${styles.error_message} font-[400] text-[12px] text-[#FF3939]`}>
                {errors.lastName}
              </p>}
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
              onChange={handleEmailChange}
              placeholder="e.g. email@example.com"
              className={`max-w-[432px] w-full rounded-[8px] border px-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF] ${errors.email ? styles['invalid'] : ''}`}
            />
            {errors.email &&
              <p className={`${styles.error_message} font-[400] text-[12px] text-[#FF3939]`}>
                {errors.email}
              </p>}
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


