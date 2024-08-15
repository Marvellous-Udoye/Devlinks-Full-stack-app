import Image from "next/image";
import logo from "../../../../public/images/logo.svg";
import devlinks from "../../../../public/images/small-devlinks.svg";
import styles from "./Navbar.module.css";
import link from "../../../../public/images/ph_link-bold.svg";
import view from "../../../../public/images/ph_eye-bold.svg";
import { FC } from "react";
import Link from "next/link";

type NavbarProps = {
  onNavClick: (component: 'customize' | 'profile') => void
}

const Navbar: FC<NavbarProps> = ({ onNavClick }) => {
  return (
    <div className={styles.navbar_component}>
      <nav className={styles.navbar}>
        <div className="flex">
          <Image
            src={logo}
            alt="Logo"
            width={32}
            height={32}
            className={styles.smallScreenForLogo}
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
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path className="fill-current hover:fill-[#633CFF]" d="M10.5 1.5625C8.83122 1.5625 7.19992 2.05735 5.81238 2.98448C4.42484 3.9116 3.34338 5.22936 2.70477 6.77111C2.06616 8.31286 1.89907 10.0094 2.22463 11.6461C2.55019 13.2828 3.35379 14.7862 4.53379 15.9662C5.7138 17.1462 7.21721 17.9498 8.85393 18.2754C10.4906 18.6009 12.1871 18.4338 13.7289 17.7952C15.2706 17.1566 16.5884 16.0752 17.5155 14.6876C18.4427 13.3001 18.9375 11.6688 18.9375 10C18.935 7.763 18.0453 5.61833 16.4635 4.03653C14.8817 2.45473 12.737 1.56498 10.5 1.5625ZM6.71641 15.357C7.15163 14.7619 7.72107 14.2779 8.37849 13.9442C9.0359 13.6106 9.76276 13.4367 10.5 13.4367C11.2373 13.4367 11.9641 13.6106 12.6215 13.9442C13.2789 14.2779 13.8484 14.7619 14.2836 15.357C13.1778 16.1412 11.8556 16.5625 10.5 16.5625C9.14436 16.5625 7.82221 16.1412 6.71641 15.357ZM8.3125 9.375C8.3125 8.94235 8.4408 8.51942 8.68116 8.15969C8.92153 7.79996 9.26317 7.51958 9.66288 7.35401C10.0626 7.18845 10.5024 7.14513 10.9268 7.22953C11.3511 7.31394 11.7409 7.52228 12.0468 7.8282C12.3527 8.13413 12.5611 8.52391 12.6455 8.94824C12.7299 9.37257 12.6866 9.81241 12.521 10.2121C12.3554 10.6118 12.075 10.9535 11.7153 11.1938C11.3556 11.4342 10.9327 11.5625 10.5 11.5625C9.91984 11.5625 9.36344 11.332 8.95321 10.9218C8.54297 10.5116 8.3125 9.95516 8.3125 9.375ZM15.6563 14.0578C15.0486 13.2849 14.2741 12.6595 13.3906 12.2281C13.9537 11.658 14.3355 10.934 14.4881 10.1474C14.6408 9.36074 14.5573 8.54653 14.2484 7.80718C13.9394 7.06783 13.4187 6.43637 12.7517 5.99223C12.0847 5.5481 11.3013 5.31112 10.5 5.31112C9.69869 5.31112 8.91528 5.5481 8.24831 5.99223C7.58135 6.43637 7.06062 7.06783 6.75165 7.80718C6.44267 8.54653 6.35925 9.36074 6.51187 10.1474C6.66449 10.934 7.04634 11.658 7.60938 12.2281C6.72592 12.6595 5.9514 13.2849 5.34375 14.0578C4.58051 13.0903 4.10512 11.9274 3.972 10.7022C3.83888 9.47711 4.05341 8.23925 4.59104 7.13037C5.12867 6.02148 5.96767 5.08639 7.01199 4.43212C8.05631 3.77786 9.26375 3.43086 10.4961 3.43086C11.7284 3.43086 12.9359 3.77786 13.9802 4.43212C15.0245 5.08639 15.8635 6.02148 16.4012 7.13037C16.9388 8.23925 17.1533 9.47711 17.0202 10.7022C16.8871 11.9274 16.4117 13.0903 15.6484 14.0578H15.6563Z" fill="#737373" />
            </svg>
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