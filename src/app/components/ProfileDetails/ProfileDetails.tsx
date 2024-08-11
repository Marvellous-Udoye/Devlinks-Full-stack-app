"use client";

import Image from "next/image";
import styles from "./Profile.module.css";
import { useState } from "react";
import image from "../../../../public/images/ph_image.svg"

export default function CustomizeLinks() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<ValidationError>({});

  type ValidationError = {
    firstName?: string
    lastName?: string
    email?: string
  };

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

    if (!email.endsWith('@gmail.com')) {
      valid = false
      newErrors.email = "Please check again"
    }

    if (!valid) {
      setErrors(newErrors);
    }
  };


  return (
    <div className="w-full bg-[#FAFAFA] px-6 pb-6">
      <section className={styles.profile_ctn}>
        <div className={styles.profile_head}>
          <p className="text-[32px] font-[700] leading-[48px] mb-[8px]">Profile Details</p>
          <p className="text-[16px] font-[400] text-[#737373]">
            Add your details to create a personal touch to your profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.profile_picture}>
          <p className="max-w-[240px] w-full text-[16px] font-[400px] text-[#737373]">Profile Picture</p>
          <div className="flex gap-6 items-center ">
            <div className="h-[193px] w-[193px] rounded-[12px] relative bg-[#EFEBFF] ">
              <input
                type="file"
                accept="image/*" 
                className="h-[193px] w-[193px] rounded-[12px] default-none hidden"
              />
              <div className="absolute top-[30%] left-[18%] flex flex-col gap-2 hover:cursor-pointer">
                <div className="flex justify-center">
                  <Image
                    src={image}
                    alt="Image"
                    width={40}
                    height={40}
                  />
                </div>
                <p className="text-[16px] font-[600px] text-[#633CFF]">+ Upload Image</p>
              </div>
            </div>
            <div>
              <p className="text-[12px] font-[400px] text-[#737373]">Image must be below 1024x1024px. Use PNG or JPG format.</p>
            </div>
          </div>

        </form>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-[20px] bg-[#FAFAFA] rounded-[12px]">
          <div className="flex gap-1 justify-between items-center">
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
              <p className="absolute right-4 top-12 transform -translate-y-1/2 font-[400] text-[12px] text-[#FF3939]">
                {errors.firstName}
              </p>}
          </div>
          <div className="flex gap-1 justify-between items-center">
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
              <p className="absolute right-4 top-12 transform -translate-y-1/2 font-[400] text-[12px] text-[#FF3939]">
                {errors.lastName}
              </p>}
          </div>
          <div className="flex gap-1 justify-between items-center">
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
              <p className="absolute right-4 top-12 transform -translate-y-1/2 font-[400] text-[12px] text-[#FF3939]">
                {errors.email}
              </p>}
          </div>
        </form>

      </section>
      <section className="py-[24px] px-[40px] flex justify-end border-t-[1px] border-t-[#D9D9D9] bg-[#fff]">
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