import Image from "next/image";
import logo from "../../../../public/images/logo.svg";
import devlinks from "../../../../public/images/small-devlinks.svg";
import styles from "./Navbar.module.css";
import link from "../../../../public/images/ph_link-bold.svg";
import profile from "../../../../public/images/ph_user-circle-bold.svg";
import view from "../../../../public/images/ph_eye-bold.svg";
import { FC } from "react";
import Link from "next/link";

type NavbarProps = {
  onNavClick: (component: 'customize' | 'profile') => void
}

const Navbar: FC<NavbarProps> = ({ onNavClick }) => {
  return (
    <div className="bg-[#FAFAFA] p-6">
      <nav className={styles.navbar}>
        <div className="flex">
          <Image
            src={logo}
            alt="Logo"
            width={32}
            height={32}
          />
          <Image
            src={devlinks}
            alt="Devlinks"
            width={108}
            height={21}
            className={`ml-[6px] ${styles['devlinks-image']}`}
          />

        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavClick('customize')}
            className={`${styles.link} text-[#633CFF] bg-[#EFEBFF]`}>
            <Image
              src={link}
              alt="Link"
              width={20}
              height={20}
            />
            {<p className={styles.smallScreenForBtn}>Links</p>}
          </button>
          <button
            onClick={() => onNavClick('profile')}
            className={`${styles.link} hover:text-[#633CFF]`}>
            <Image
              src={profile}
              alt="Profile"
              width={20}
              height={20}
            />
            {<p className={styles.smallScreenForBtn}>Profile Details</p>}
          </button>
        </div>
        <Link href='/Preview'>
          <button className={styles.preview}>
            <Image
              src={view}
              alt="Preview"
              width={20}
              height={20}
              className={styles.smallScreenForPreview}
            />
            {<p className={styles.smallScreenForBtn}>Preview</p>}
          </button>
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;