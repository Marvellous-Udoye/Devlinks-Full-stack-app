"use client"

import Image from "next/image";
import Link from "next/link";
import styles from '../login.module.css';
import logo from '../../../public/images/logo.svg';
import devlinks from '../../../public/images/devlinks.svg'
import React, { useEffect, useState } from "react";
import { error } from "console";

export default function createAcc() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const [showpassword, setShowPassword] = useState(false)
  type validationError = {
    email?: string
    password?: string
    confirmpassword?: string
  }
  const [errors, setErrors] = useState<validationError>({})

  useEffect(() => {
    if (password.length >= 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: undefined }))
    }
  }, [password])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (errors.email) {
      setErrors((prevErrors) => ({ prevErrors, email: undefined }))
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (errors.password) {
      setErrors((prevErrors) => ({ prevErrors, password: undefined }))
    }
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmpassword(e.target.value)
    if (errors.confirmpassword) {
      setErrors((prevErrors) => ({ prevErrors, confirmpassword: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setErrors({})

    let valid = true
    const newError: validationError = {}

    if (!email) {
      valid = false
      newError.email = "Can't be empty"
    } else if (!email.endsWith('@gmail.com')) {
      valid = false
      newError.email = "Invalid email"
    }

    if (password.length < 8) {
      valid = false
      newError.password = "Please check again"
    }

    if (password.length < 8) {
      valid = false
      newError.confirmpassword = ''
    }
    if (password.length >= 8 && confirmpassword != password) {
      valid = false
      newError.confirmpassword = "Please check again"
    }

    if (!valid) {
      setErrors(newError)
    } else {
      window.location.href = '/HomePage'
    }

  }

  return (
    <div className="bg-[#FAFAFA] h-screen">
      <div className={styles.logincard}>
        <div className="flex justify-center gap-1.5 max-mb-[51px]">
          <Image
            src={logo}
            alt="Devlinks Logo"
            width={40}
            height={40}
          />
          <Image
            src={devlinks}
            alt="Devlinks"
            width={135}
            height={26.25}
          />
        </div>

        <div className="max-w-[476px] w-full mt-10 flex flex-col gap-10">
          <div className="flex flex-col gap-2 w-full">
            <p className="text-[32px] font-[700] leading-[48px]">Create account</p>
            <p className="text-[16px] font-[400] leading-[24px] text-[#737373]">Let’s get you started sharing your links!</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col w-full relative gap-1">
              <label
                htmlFor="email"
                className={`font-[400] text-[12px] ${errors.email ? styles['invalid-label'] : ''}`}>Email address
              </label>
              <input
                id="email"
                type="email"
                onChange={handleEmailChange}
                placeholder="e.g. alex@email.com"
                className={`rounded-[8px] border px-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF] ${errors.email ? styles['invalid'] : ''}`}
              />
              <p className="absolute right-4 top-12 transform -translate-y-1/2 font-[400] text-[12px] text-[#FF3939]">{errors.email}</p>
            </div>
            <div className="flex flex-col w-full relative gap-1">
              <label
                htmlFor="createPassword"
                className={`font-[400] text-[12px] ${errors.password ? styles['invalid-label'] : ''}`}>Create Password
              </label>
              <input
                id="createPassword"
                type={showpassword ? "text" : "password"}
                onChange={handlePasswordChange}
                placeholder="At least 8 characters"
                className={`rounded-[8px] border px-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF] ${errors.password ? styles['invalid'] : ''}`}
              />
              {password && !errors.password && (<button
                type="button"
                onClick={() => setShowPassword(!showpassword)}
                className="absolute right-4 top-12 transform -translate-y-1/2 font-[400] text-[12px] text-[#633CFF] focus:outline-none"
              >
                {showpassword ? 'Hide' : 'Show'}
              </button>)}
              {errors.password && <p className="absolute right-4 top-12 transform -translate-y-1/2 font-[400] text-[12px] text-[#FF3939]">{errors.password}</p>}
            </div>
            <div className="flex flex-col w-full relative gap-1">
              <label
                htmlFor="confirmPassword"
                className={`font-[400] text-[12px] ${errors.confirmpassword ? styles['invalid-label'] : ''}`}>Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showpassword ? "text" : "password"}
                onChange={handleConfirmPasswordChange}
                placeholder="At least 8 characters"
                className={`rounded-[8px] border px-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF] ${errors.confirmpassword ? styles['invalid'] : ''}`}
              />
              {errors.confirmpassword && <p className="absolute right-4 top-12 transform -translate-y-1/2 font-[400] text-[12px] text-[#FF3939]">{errors.confirmpassword}</p>}
            </div>
            <p className="text-[#737373] font-[400] text-[12px]">Password must contain at least 8 characters</p>
            <button
              type="submit"
              className="active:shadow-custom-focus active:opacity-50 focus:outline-none cursor-pointer rounded-[8px] bg-[#633CFF] py-[11px] px-[27px] w-full text-[16px] font-[600] text-white"
            >Create new account</button>
          </form>
          <p className="text-center">Already have an account? <Link className="text-[#633CFF]" href='/'>Login</Link></p>
        </div>

      </div>
    </div>
  );
}
