"use client"

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config'
import { signIn } from 'next-auth/react'

const CreateAccount = async (email: string, password: string) => {
  try {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      action: 'signup'
    })

    if (result?.error) {
      throw new Error(result.error)
    } else {
      window.location.href = '/Home'
    }
  } catch (error) {
    console.error('Error creating account:', error)
    throw error
  }
}

export default function CreateAcc() {
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth)

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
    if (errors.email) {
      setErrors((prevErrors) => ({ prevErrors, email: undefined }))
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.password) {
      setErrors((prevErrors) => ({ prevErrors, password: undefined }))
    }
  }

  const handleCreateAccount = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password)
      setEmail('')
      setPassword('')
      await CreateAccount(email, password)
      // Redirect to home page or dashboard after successful signup and auto login
    } catch (e) {
      console.error(e)
      Response.json({ Error: 'Internal Server Error' }, { status: 500 })
    }
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.confirmpassword) {
      setErrors((prevErrors) => ({ prevErrors, confirmpassword: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setErrors({});

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
      handleCreateAccount()
    }
  }

  return (
    <div className="bg-[#FAFAFA] h-screen">
      <div className="flex flex-col items-center justify-center sm:bg-white bg-[#FAFAFA] sm:px-0 sm:py-6 p-12">
        <div className="flex items-center justify-center gap-1.5 mb-10 sm:mb-0">
          <svg className="sm:w-[33.33px] sm:h-[33.33px]" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 41 40" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.5235 34.225C8.96683 36.6666 12.8935 36.6666 20.7502 36.6666C28.6068 36.6666 32.5352 36.6666 34.9752 34.225C37.4168 31.7866 37.4168 27.8566 37.4168 20C37.4168 12.1433 37.4168 8.21498 34.9752 5.77331C32.5368 3.33331 28.6068 3.33331 20.7502 3.33331C12.8935 3.33331 8.96516 3.33331 6.5235 5.77331C4.0835 8.21665 4.0835 12.1433 4.0835 20C4.0835 27.8566 4.0835 31.785 6.5235 34.225ZM16.5835 14.5833C15.5122 14.5833 14.4649 14.901 13.5742 15.4962C12.6834 16.0914 11.9891 16.9373 11.5791 17.9271C11.1692 18.9169 11.0619 20.006 11.2709 21.0567C11.4799 22.1074 11.9958 23.0726 12.7533 23.8301C13.5109 24.5877 14.476 25.1036 15.5268 25.3126C16.5775 25.5216 17.6666 25.4143 18.6564 25.0043C19.6461 24.5944 20.4921 23.9001 21.0873 23.0093C21.6825 22.1186 22.0002 21.0713 22.0002 20C22.0002 19.6685 22.1319 19.3505 22.3663 19.1161C22.6007 18.8817 22.9186 18.75 23.2502 18.75C23.5817 18.75 23.8996 18.8817 24.134 19.1161C24.3685 19.3505 24.5002 19.6685 24.5002 20C24.5002 21.5657 24.0359 23.0964 23.166 24.3982C22.2961 25.7001 21.0597 26.7148 19.6131 27.314C18.1665 27.9132 16.5747 28.07 15.039 27.7645C13.5033 27.4591 12.0927 26.7051 10.9856 25.5979C9.8784 24.4907 9.12441 23.0801 8.81895 21.5444C8.51348 20.0088 8.67026 18.417 9.26945 16.9704C9.86864 15.5238 10.8833 14.2874 12.1852 13.4175C13.4871 12.5476 15.0177 12.0833 16.5835 12.0833C16.915 12.0833 17.233 12.215 17.4674 12.4494C17.7018 12.6838 17.8335 13.0018 17.8335 13.3333C17.8335 13.6648 17.7018 13.9828 17.4674 14.2172C17.233 14.4516 16.915 14.5833 16.5835 14.5833ZM30.3335 20C30.3335 21.4366 29.7628 22.8143 28.747 23.8301C27.7312 24.846 26.3534 25.4166 24.9168 25.4166C24.5853 25.4166 24.2674 25.5483 24.0329 25.7828C23.7985 26.0172 23.6668 26.3351 23.6668 26.6666C23.6668 26.9982 23.7985 27.3161 24.0329 27.5505C24.2674 27.785 24.5853 27.9166 24.9168 27.9166C26.4826 27.9166 28.0132 27.4523 29.3151 26.5824C30.617 25.7126 31.6317 24.4761 32.2309 23.0296C32.8301 21.583 32.9868 19.9912 32.6814 18.4555C32.3759 16.9198 31.6219 15.5092 30.5148 14.4021C29.4076 13.2949 27.997 12.5409 26.4613 12.2354C24.9256 11.93 23.3338 12.0867 21.8873 12.6859C20.4407 13.2851 19.2043 14.2998 18.3344 15.6017C17.4645 16.9036 17.0002 18.4342 17.0002 20C17.0002 20.3315 17.1319 20.6494 17.3663 20.8839C17.6007 21.1183 17.9186 21.25 18.2502 21.25C18.5817 21.25 18.8996 21.1183 19.134 20.8839C19.3685 20.6494 19.5002 20.3315 19.5002 20C19.5002 18.5634 20.0708 17.1856 21.0867 16.1698C22.1025 15.154 23.4802 14.5833 24.9168 14.5833C26.3534 14.5833 27.7312 15.154 28.747 16.1698C29.7628 17.1856 30.3335 18.5634 30.3335 20Z" fill="#633CFF" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="136" height="27" viewBox="0 0 136 27" fill="none">
            <path d="M13.9972 26.15V22.195L14.3435 22.265C14.1126 23.5483 13.4201 24.575 12.2658 25.345C11.1346 26.115 9.77261 26.5 8.17974 26.5C6.56378 26.5 5.15559 26.1267 3.95516 25.38C2.77782 24.61 1.86596 23.5367 1.21957 22.16C0.573191 20.7833 0.25 19.1617 0.25 17.295C0.25 15.405 0.584734 13.76 1.2542 12.36C1.92367 10.96 2.85862 9.875 4.05904 9.105C5.28255 8.335 6.70229 7.95 8.31824 7.95C10.0035 7.95 11.3655 8.34666 12.4043 9.14C13.4662 9.93333 14.0895 11.0183 14.2742 12.395L13.8933 12.43V0.949999H19.0875V26.15H13.9972ZM9.84186 22.3C11.0654 22.3 12.058 21.8683 12.8198 21.005C13.5817 20.1183 13.9626 18.8583 13.9626 17.225C13.9626 15.5917 13.5701 14.3433 12.7852 13.48C12.0234 12.5933 11.0192 12.15 9.77261 12.15C8.57218 12.15 7.57952 12.5933 6.79463 13.48C6.03282 14.3667 5.65192 15.6267 5.65192 17.26C5.65192 18.8933 6.03282 20.1417 6.79463 21.005C7.57952 21.8683 8.59527 22.3 9.84186 22.3Z" fill="#333333" />
            <path d="M31.551 26.5C29.5887 26.5 27.8804 26.115 26.4261 25.345C24.9717 24.5517 23.8405 23.455 23.0326 22.055C22.2477 20.655 21.8552 19.045 21.8552 17.225C21.8552 15.3817 22.2477 13.7717 23.0326 12.395C23.8405 10.995 24.9602 9.91 26.3915 9.14C27.8227 8.34666 29.4849 7.95 31.3778 7.95C33.2016 7.95 34.7829 8.32333 36.1218 9.07C37.4608 9.81667 38.4996 10.855 39.2383 12.185C39.977 13.515 40.3464 15.0783 40.3464 16.875C40.3464 17.2483 40.3349 17.5983 40.3118 17.925C40.2887 18.2283 40.2541 18.52 40.2079 18.8H24.9025V15.335H36.0179L35.1176 15.965C35.1176 14.5183 34.7713 13.4567 34.0788 12.78C33.4093 12.08 32.4859 11.73 31.3086 11.73C29.9466 11.73 28.8846 12.1967 28.1228 13.13C27.3841 14.0633 27.0147 15.4633 27.0147 17.33C27.0147 19.15 27.3841 20.5033 28.1228 21.39C28.8846 22.2767 30.0158 22.72 31.5163 22.72C32.3474 22.72 33.063 22.58 33.6633 22.3C34.2635 22.02 34.7136 21.565 35.0137 20.935H39.8962C39.3191 22.6617 38.3265 24.0267 36.9183 25.03C35.5332 26.01 33.7441 26.5 31.551 26.5Z" fill="#333333" />
            <path d="M47.4302 26.15L40.47 8.3H46.0451L51.4816 24.96H48.5729L53.9748 8.3H59.4114L52.4512 26.15H47.4302Z" fill="#333333" />
            <path d="M61.4187 26.15V0.949999H66.6128V26.15H61.4187Z" fill="#333333" />
            <path d="M70.7519 26.15V8.3H75.9461V26.15H70.7519ZM70.5788 5.92V0.25H76.1192V5.92H70.5788Z" fill="#333333" />
            <path d="M80.0852 26.15V8.3H85.1754V12.5H85.2793V26.15H80.0852ZM92.378 26.15V15.09C92.378 14.11 92.124 13.375 91.6162 12.885C91.1314 12.395 90.4157 12.15 89.4693 12.15C88.6613 12.15 87.9341 12.3367 87.2877 12.71C86.6644 13.0833 86.1681 13.5967 85.7987 14.25C85.4524 14.9033 85.2793 15.6733 85.2793 16.56L84.8292 12.255C85.4063 10.9483 86.2489 9.91 87.357 9.14C88.4881 8.34666 89.8733 7.95 91.5123 7.95C93.4745 7.95 94.9751 8.51 96.0139 9.63C97.0527 10.7267 97.5721 12.2083 97.5721 14.075V26.15H92.378Z" fill="#333333" />
            <path d="M101.525 26.15V0.949999H106.719V26.15H101.525ZM112.848 26.15L105.507 16.875L112.675 8.3H118.665L110.251 17.68L110.493 16.035L119.012 26.15H112.848Z" fill="#333333" />
            <path d="M127.493 26.5C124.908 26.5 122.853 25.975 121.33 24.925C119.806 23.875 118.975 22.4283 118.836 20.585H123.477C123.592 21.3783 123.984 21.985 124.654 22.405C125.346 22.8017 126.293 23 127.493 23C128.578 23 129.363 22.8483 129.848 22.545C130.356 22.2183 130.61 21.7633 130.61 21.18C130.61 20.7367 130.46 20.3983 130.16 20.165C129.883 19.9083 129.363 19.6983 128.602 19.535L125.762 18.94C123.661 18.4967 122.115 17.8317 121.122 16.945C120.129 16.035 119.633 14.8683 119.633 13.445C119.633 11.7183 120.291 10.3767 121.607 9.42C122.923 8.44 124.758 7.95 127.113 7.95C129.444 7.95 131.302 8.42833 132.688 9.385C134.073 10.3183 134.834 11.625 134.973 13.305H130.333C130.241 12.6983 129.917 12.2433 129.363 11.94C128.809 11.6133 128.024 11.45 127.009 11.45C126.085 11.45 125.393 11.59 124.931 11.87C124.492 12.1267 124.273 12.5 124.273 12.99C124.273 13.41 124.458 13.7483 124.827 14.005C125.196 14.2383 125.808 14.4483 126.662 14.635L129.848 15.3C131.626 15.6733 132.965 16.3733 133.865 17.4C134.788 18.4033 135.25 19.5933 135.25 20.97C135.25 22.72 134.569 24.085 133.207 25.065C131.868 26.0217 129.964 26.5 127.493 26.5Z" fill="#333333" />
          </svg>
        </div>
        <div className="bg-[#fff] rounded-[12px] w-full max-w-[476px] sm:p-6 p-10">
          <div className="w-full flex flex-col sm:gap-6 gap-10">
            <div className="flex flex-col gap-2 w-full">
              <p className="md:text-[24px] text-[32px] font-[700] md:leading-[36px] leading-[48px]">Create account</p>
              <p className="text-[16px] font-[400] leading-[24px] text-[#737373]">Let&apos;s get you started sharing your links!</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:gap-4 gap-6">
              <div className="flex flex-col w-full relative gap-1">
                <label
                  htmlFor="email"
                  className={`font-[400] text-[12px] ${errors.email ? 'text-[#FF3939]' : ''}`}
                >
                  Email address
                </label>
                <svg className="absolute left-4 top-12 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14 3H2C1.86739 3 1.74021 3.05268 1.64645 3.14645C1.55268 3.24021 1.5 3.36739 1.5 3.5V12C1.5 12.2652 1.60536 12.5196 1.79289 12.7071C1.98043 12.8946 2.23478 13 2.5 13H13.5C13.7652 13 14.0196 12.8946 14.2071 12.7071C14.3946 12.5196 14.5 12.2652 14.5 12V3.5C14.5 3.36739 14.4473 3.24021 14.3536 3.14645C14.2598 3.05268 14.1326 3 14 3ZM13.5 12H2.5V4.63688L7.66187 9.36875C7.75412 9.45343 7.87478 9.50041 8 9.50041C8.12522 9.50041 8.24588 9.45343 8.33813 9.36875L13.5 4.63688V12Z" fill="#737373" />
                </svg>
                <input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleEmailChange}
                  placeholder="e.g. alex@email.com"
                  autoComplete="email"
                  className={`rounded-[8px] border pl-11 pr-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF] ${errors.email ? 'border-[#FF3939]' : ''}`}
                />
                {errors.email && <p className="font-[400] text-[12px] text-[#FF3939] sm:absolute sm:right-0 sm:-bottom-1/4 fp:absolute fp:right-4 fp:top-12 fp:transform fp:-translate-y-1/2">{errors.email}</p>}
              </div>

              <div className="flex flex-col w-full relative gap-1">
                <label
                  htmlFor="createPassword"
                  className={`font-[400] text-[12px] ${errors.password ? 'text-[#FF3939]' : ''}`}
                >
                  Create Password
                </label>
                <svg className="absolute left-4 top-12 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 5H11V3.5C11 2.70435 10.6839 1.94129 10.1213 1.37868C9.55871 0.81607 8.79565 0.5 8 0.5C7.20435 0.5 6.44129 0.81607 5.87868 1.37868C5.31607 1.94129 5 2.70435 5 3.5V5H3C2.73478 5 2.48043 5.10536 2.29289 5.29289C2.10536 5.48043 2 5.73478 2 6V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H13C13.2652 14 13.5196 13.8946 13.7071 13.7071C13.8946 13.5196 14 13.2652 14 13V6C14 5.73478 13.8946 5.48043 13.7071 5.29289C13.5196 5.10536 13.2652 5 13 5ZM8.5 9.91438V11.5C8.5 11.6326 8.44732 11.7598 8.35355 11.8536C8.25979 11.9473 8.13261 12 8 12C7.86739 12 7.74021 11.9473 7.64645 11.8536C7.55268 11.7598 7.5 11.6326 7.5 11.5V9.91438C7.16639 9.79643 6.88522 9.56434 6.70618 9.25914C6.52715 8.95393 6.46177 8.59526 6.5216 8.24651C6.58144 7.89776 6.76264 7.58139 7.03317 7.35332C7.3037 7.12525 7.64616 7.00016 8 7.00016C8.35384 7.00016 8.6963 7.12525 8.96683 7.35332C9.23736 7.58139 9.41856 7.89776 9.4784 8.24651C9.53823 8.59526 9.47285 8.95393 9.29382 9.25914C9.11478 9.56434 8.83361 9.79643 8.5 9.91438ZM10 5H6V3.5C6 2.96957 6.21071 2.46086 6.58579 2.08579C6.96086 1.71071 7.46957 1.5 8 1.5C8.53043 1.5 9.03914 1.71071 9.41421 2.08579C9.78929 2.46086 10 2.96957 10 3.5V5Z" fill="#737373" />
                </svg>
                <input
                  id="createPassword"
                  type={showpassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handlePasswordChange}
                  placeholder="At least 8 characters"
                  className={`rounded-[8px] border pl-11 pr-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF] ${errors.password ? 'border-[#FF3939]' : ''}`}
                />
                {password && !errors.password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showpassword)}
                    className="absolute right-4 top-12 transform -translate-y-1/2 font-[400] text-[12px] text-[#633CFF] focus:outline-none"
                  >
                    {showpassword ? 'Hide' : 'Show'}
                  </button>
                )}
                {errors.password && <p className="font-[400] text-[12px] text-[#FF3939] sm:absolute sm:right-0 sm:-bottom-1/4 fp:absolute fp:right-4 fp:top-12 fp:transform fp:-translate-y-1/2">{errors.password}</p>}
              </div>

              <div className="flex flex-col w-full relative gap-1">
                <label
                  htmlFor="confirmPassword"
                  className={`font-[400] text-[12px] ${errors.confirmpassword ? 'text-[#FF3939]' : ''}`}
                >
                  Confirm Password
                </label>
                <svg className="absolute left-4 top-12 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 5H11V3.5C11 2.70435 10.6839 1.94129 10.1213 1.37868C9.55871 0.81607 8.79565 0.5 8 0.5C7.20435 0.5 6.44129 0.81607 5.87868 1.37868C5.31607 1.94129 5 2.70435 5 3.5V5H3C2.73478 5 2.48043 5.10536 2.29289 5.29289C2.10536 5.48043 2 5.73478 2 6V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H13C13.2652 14 13.5196 13.8946 13.7071 13.7071C13.8946 13.5196 14 13.2652 14 13V6C14 5.73478 13.8946 5.48043 13.7071 5.29289C13.5196 5.10536 13.2652 5 13 5ZM8.5 9.91438V11.5C8.5 11.6326 8.44732 11.7598 8.35355 11.8536C8.25979 11.9473 8.13261 12 8 12C7.86739 12 7.74021 11.9473 7.64645 11.8536C7.55268 11.7598 7.5 11.6326 7.5 11.5V9.91438C7.16639 9.79643 6.88522 9.56434 6.70618 9.25914C6.52715 8.95393 6.46177 8.59526 6.5216 8.24651C6.58144 7.89776 6.76264 7.58139 7.03317 7.35332C7.3037 7.12525 7.64616 7.00016 8 7.00016C8.35384 7.00016 8.6963 7.12525 8.96683 7.35332C9.23736 7.58139 9.41856 7.89776 9.4784 8.24651C9.53823 8.59526 9.47285 8.95393 9.29382 9.25914C9.11478 9.56434 8.83361 9.79643 8.5 9.91438ZM10 5H6V3.5C6 2.96957 6.21071 2.46086 6.58579 2.08579C6.96086 1.71071 7.46957 1.5 8 1.5C8.53043 1.5 9.03914 1.71071 9.41421 2.08579C9.78929 2.46086 10 2.96957 10 3.5V5Z" fill="#737373" />
                </svg>
                <input
                  id="confirmPassword"
                  type={showpassword ? "text" : "password"}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  onFocus={handleConfirmPasswordChange}
                  placeholder="At least 8 characters"
                  className={`rounded-[8px] border pl-11 pr-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF] ${errors.confirmpassword ? 'border-[#FF3939]' : ''}`}
                />
                {errors.confirmpassword && <p className="font-[400] text-[12px] text-[#FF3939] sm:absolute sm:right-0 sm:-bottom-1/4 fp:absolute fp:right-4 fp:top-12 fp:transform fp:-translate-y-1/2">{errors.confirmpassword}</p>}
              </div>

              <p className="text-[#737373] font-[400] text-[12px] sm:mt-2">Password must contain at least 8 characters</p>

              <button
                type="submit"
                className="active:shadow-custom-focus active:opacity-50 focus:outline-none cursor-pointer rounded-[8px] bg-[#633CFF] py-[11px] px-[27px] w-full text-[16px] font-[600] text-white"
              >Create new account</button>
            </form>
            <p className="text-center flex sm:flex-col flex-row justify-center sm:gap-0 gap-1.5">Already have an account? <Link className="text-[#633CFF]" href='/'>Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}