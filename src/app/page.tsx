"use client"

import Image from "next/image";
import Link from "next/link";
import styles from './login.module.css';
import logo from '../../public/images/logo.svg';
import devlinks from '../../public/images/devlinks.svg';
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  type ValidationError = {
    email?: string;
    password?: string;
  };

  const [errors, setErrors] = useState<ValidationError>({});
  const [hasTriedSubmitting, setHasTriedSubmitting] = useState(false);

  useEffect(() => {
    if (password.length >= 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: undefined }));
    } else if (password.length > 0 && password.length < 8 && hasTriedSubmitting) {
      setErrors((prevErrors) => ({ prevErrors, password: 'Enter at least 8 characters' }));
    }
  }, [password, hasTriedSubmitting]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prevErrors) => ({ prevErrors, email: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password || hasTriedSubmitting) {
      setErrors((prevErrors) => ({ prevErrors, password: undefined }));
      setHasTriedSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setHasTriedSubmitting(true);

    let valid = true;
    const newErrors: ValidationError = {};

    if (!email) {
      valid = false;
      newErrors.email = "Can't be empty";
    } else if (!email.endsWith('@gmail.com')) {
      valid = false;
      newErrors.email = 'Invalid email';
    }

    if (password.length < 8) {
      valid = false;
      newErrors.password = 'Please check again';
    }
    if (password.length > 0 && password.length < 8) {
      valid = false;
      newErrors.password = 'Enter at least 8 characters';
    }

    if (!valid) {
      setErrors(newErrors);
    } else {
      window.location.href = '/HomePage';
    }
  };

  return (
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
          <p className="text-[32px] font-[700] leading-[48px]">Login</p>
          <p className="text-[16px] font-[400] leading-[24px] text-[#737373]">Add your details below to get back into the app</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative flex flex-col w-full gap-1">
            <label
              htmlFor="email"
              className={`font-[400] text-[12px] ${errors.email ? styles['invalid-label'] : ''}`}
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="e.g. alex@email.com"
              className={`rounded-[8px] border px-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF] ${errors.email ? styles['invalid'] : ''}`}
            />
            {errors.email && <p className="absolute right-4 top-12 transform -translate-y-1/2 font-[400] text-[12px] text-[#FF3939]">{errors.email}</p>}
          </div>
          <div className="relative flex flex-col w-full gap-1">
            <label
              htmlFor="password"
              className={`font-[400] text-[12px] ${errors.password ? styles['invalid-label'] : ''}`}
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className={`rounded-[8px] border px-4 py-3 focus:outline-none focus:shadow-custom-focus focus:border-[#633CFF] ${errors.password ? styles['invalid'] : ''}`}
            />
            {password && !errors.password && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-12 transform -translate-y-1/2 text-[#633CFF] text-[12px] focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            )}
            {errors.password && <p className="absolute right-4 top-12 transform -translate-y-1/2 font-[400] text-[12px] text-[#FF3939]">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="active:shadow-custom-focus active:opacity-50 focus:outline-none cursor-pointer rounded-[8px] bg-[#633CFF] py-[11px] px-[27px] w-full text-[16px] font-[600] text-white"
          >
            Login
          </button>
        </form>
        <p className="text-center">Don't have an account? <Link className="text-[#633CFF]" href='/CreateAccPage'>Create account</Link></p>
      </div>
    </div>
  );
}
