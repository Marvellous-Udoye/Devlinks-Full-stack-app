import { FC } from "react";
import Link from "next/link";

type NavbarProps = {
  onNavClick: (component: 'customize' | 'profile') => void
}

const Navbar: FC<NavbarProps> = ({ onNavClick }) => {
  return (
    <div className="bg-[#FAFAFA] p-6 sm:p-0 sm:pb-4">
      <nav className="flex justify-between pl-6 pr-4 py-4 rounded-[12px] bg-[#fff] sm:pr-4">
        <div className="flex items-center">
          <svg className="max-[500px]:mr-5" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 41 40" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.5235 34.225C8.96683 36.6666 12.8935 36.6666 20.7502 36.6666C28.6068 36.6666 32.5352 36.6666 34.9752 34.225C37.4168 31.7866 37.4168 27.8566 37.4168 20C37.4168 12.1433 37.4168 8.21498 34.9752 5.77331C32.5368 3.33331 28.6068 3.33331 20.7502 3.33331C12.8935 3.33331 8.96516 3.33331 6.5235 5.77331C4.0835 8.21665 4.0835 12.1433 4.0835 20C4.0835 27.8566 4.0835 31.785 6.5235 34.225ZM16.5835 14.5833C15.5122 14.5833 14.4649 14.901 13.5742 15.4962C12.6834 16.0914 11.9891 16.9373 11.5791 17.9271C11.1692 18.9169 11.0619 20.006 11.2709 21.0567C11.4799 22.1074 11.9958 23.0726 12.7533 23.8301C13.5109 24.5877 14.476 25.1036 15.5268 25.3126C16.5775 25.5216 17.6666 25.4143 18.6564 25.0043C19.6461 24.5944 20.4921 23.9001 21.0873 23.0093C21.6825 22.1186 22.0002 21.0713 22.0002 20C22.0002 19.6685 22.1319 19.3505 22.3663 19.1161C22.6007 18.8817 22.9186 18.75 23.2502 18.75C23.5817 18.75 23.8996 18.8817 24.134 19.1161C24.3685 19.3505 24.5002 19.6685 24.5002 20C24.5002 21.5657 24.0359 23.0964 23.166 24.3982C22.2961 25.7001 21.0597 26.7148 19.6131 27.314C18.1665 27.9132 16.5747 28.07 15.039 27.7645C13.5033 27.4591 12.0927 26.7051 10.9856 25.5979C9.8784 24.4907 9.12441 23.0801 8.81895 21.5444C8.51348 20.0088 8.67026 18.417 9.26945 16.9704C9.86864 15.5238 10.8833 14.2874 12.1852 13.4175C13.4871 12.5476 15.0177 12.0833 16.5835 12.0833C16.915 12.0833 17.233 12.215 17.4674 12.4494C17.7018 12.6838 17.8335 13.0018 17.8335 13.3333C17.8335 13.6648 17.7018 13.9828 17.4674 14.2172C17.233 14.4516 16.915 14.5833 16.5835 14.5833ZM30.3335 20C30.3335 21.4366 29.7628 22.8143 28.747 23.8301C27.7312 24.846 26.3534 25.4166 24.9168 25.4166C24.5853 25.4166 24.2674 25.5483 24.0329 25.7828C23.7985 26.0172 23.6668 26.3351 23.6668 26.6666C23.6668 26.9982 23.7985 27.3161 24.0329 27.5505C24.2674 27.785 24.5853 27.9166 24.9168 27.9166C26.4826 27.9166 28.0132 27.4523 29.3151 26.5824C30.617 25.7126 31.6317 24.4761 32.2309 23.0296C32.8301 21.583 32.9868 19.9912 32.6814 18.4555C32.3759 16.9198 31.6219 15.5092 30.5148 14.4021C29.4076 13.2949 27.997 12.5409 26.4613 12.2354C24.9256 11.93 23.3338 12.0867 21.8873 12.6859C20.4407 13.2851 19.2043 14.2998 18.3344 15.6017C17.4645 16.9036 17.0002 18.4342 17.0002 20C17.0002 20.3315 17.1319 20.6494 17.3663 20.8839C17.6007 21.1183 17.9186 21.25 18.2502 21.25C18.5817 21.25 18.8996 21.1183 19.134 20.8839C19.3685 20.6494 19.5002 20.3315 19.5002 20C19.5002 18.5634 20.0708 17.1856 21.0867 16.1698C22.1025 15.154 23.4802 14.5833 24.9168 14.5833C26.3534 14.5833 27.7312 15.154 28.747 16.1698C29.7628 17.1856 30.3335 18.5634 30.3335 20Z" fill="#633CFF" />
          </svg>
          <svg className="ml-[6px] sm:hidden" xmlns="http://www.w3.org/2000/svg" width="108" height="21" viewBox="0 0 108 21" fill="none">
            <path d="M10.9977 20.72V17.556L11.2748 17.612C11.0901 18.6387 10.536 19.46 9.61264 20.076C8.7077 20.692 7.61809 21 6.34379 21C5.05102 21 3.92447 20.7013 2.96413 20.104C2.02226 19.488 1.29277 18.6293 0.77566 17.528C0.258553 16.4267 0 15.1293 0 13.636C0 12.124 0.267787 10.808 0.803362 9.688C1.33894 8.568 2.08689 7.7 3.04723 7.084C4.02604 6.468 5.16183 6.16 6.4546 6.16C7.80277 6.16 8.89238 6.47733 9.72345 7.112C10.573 7.74667 11.0716 8.61467 11.2194 9.716L10.9146 9.744V0.559999H15.07V20.72H10.9977ZM7.67349 17.64C8.6523 17.64 9.44643 17.2947 10.0559 16.604C10.6653 15.8947 10.97 14.8867 10.97 13.58C10.97 12.2733 10.6561 11.2747 10.0282 10.584C9.41873 9.87467 8.61536 9.52 7.61809 9.52C6.65775 9.52 5.86362 9.87467 5.2357 10.584C4.62626 11.2933 4.32153 12.3013 4.32153 13.608C4.32153 14.9147 4.62626 15.9133 5.2357 16.604C5.86362 17.2947 6.67621 17.64 7.67349 17.64Z" fill="#333333" />
            <path d="M25.0408 21C23.471 21 22.1044 20.692 20.9409 20.076C19.7774 19.4413 18.8724 18.564 18.2261 17.444C17.5981 16.324 17.2842 15.036 17.2842 13.58C17.2842 12.1053 17.5981 10.8173 18.2261 9.716C18.8724 8.596 19.7681 7.728 20.9132 7.112C22.0582 6.47733 23.3879 6.16 24.9023 6.16C26.3612 6.16 27.6263 6.45867 28.6975 7.056C29.7686 7.65333 30.5997 8.484 31.1907 9.548C31.7816 10.612 32.0771 11.8627 32.0771 13.3C32.0771 13.5987 32.0679 13.8787 32.0494 14.14C32.0309 14.3827 32.0032 14.616 31.9663 14.84H19.722V12.068H28.6144L27.8941 12.572C27.8941 11.4147 27.6171 10.5653 27.063 10.024C26.5275 9.464 25.7887 9.184 24.8469 9.184C23.7572 9.184 22.9077 9.55733 22.2983 10.304C21.7073 11.0507 21.4118 12.1707 21.4118 13.664C21.4118 15.12 21.7073 16.2027 22.2983 16.912C22.9077 17.6213 23.8127 17.976 25.0131 17.976C25.6779 17.976 26.2504 17.864 26.7306 17.64C27.2108 17.416 27.5709 17.052 27.811 16.548H31.717C31.2553 17.9293 30.4612 19.0213 29.3346 19.824C28.2265 20.608 26.7952 21 25.0408 21Z" fill="#333333" />
            <path d="M37.7441 20.72L32.176 6.44H36.6361L40.9853 19.768H38.6583L42.9799 6.44H47.3291L41.761 20.72H37.7441Z" fill="#333333" />
            <path d="M48.9349 20.72V0.559999H53.0903V20.72H48.9349Z" fill="#333333" />
            <path d="M56.4015 20.72V6.44H60.5569V20.72H56.4015ZM56.263 4.536V0H60.6954V4.536H56.263Z" fill="#333333" />
            <path d="M63.8681 20.72V6.44H67.9403V9.8H68.0234V20.72H63.8681ZM73.7024 20.72V11.872C73.7024 11.088 73.4992 10.5 73.0929 10.108C72.7051 9.716 72.1326 9.52 71.3754 9.52C70.729 9.52 70.1473 9.66933 69.6302 9.968C69.1315 10.2667 68.7345 10.6773 68.439 11.2C68.162 11.7227 68.0234 12.3387 68.0234 13.048L67.6633 9.604C68.125 8.55867 68.7991 7.728 69.6856 7.112C70.5905 6.47733 71.6986 6.16 73.0098 6.16C74.5796 6.16 75.78 6.608 76.6111 7.504C77.4422 8.38133 77.8577 9.56667 77.8577 11.06V20.72H73.7024Z" fill="#333333" />
            <path d="M81.0196 20.72V0.559999H85.175V20.72H81.0196ZM90.0782 20.72L84.2054 13.3L89.9397 6.44H94.7322L88.0006 13.944L88.1945 12.628L95.0092 20.72H90.0782Z" fill="#333333" />
            <path d="M101.795 21C99.7263 21 98.0826 20.58 96.8637 19.74C95.6449 18.9 94.98 17.7427 94.8692 16.268H98.5813C98.6736 16.9027 98.9876 17.388 99.5231 17.724C100.077 18.0413 100.834 18.2 101.795 18.2C102.663 18.2 103.291 18.0787 103.678 17.836C104.085 17.5747 104.288 17.2107 104.288 16.744C104.288 16.3893 104.168 16.1187 103.928 15.932C103.706 15.7267 103.291 15.5587 102.681 15.428L100.41 14.952C98.729 14.5973 97.4917 14.0653 96.6975 13.356C95.9034 12.628 95.5063 11.6947 95.5063 10.556C95.5063 9.17467 96.0327 8.10133 97.0854 7.336C98.138 6.552 99.6063 6.16 101.49 6.16C103.355 6.16 104.842 6.54267 105.95 7.308C107.058 8.05467 107.668 9.1 107.778 10.444H104.066C103.992 9.95867 103.734 9.59467 103.291 9.352C102.847 9.09067 102.219 8.96 101.407 8.96C100.668 8.96 100.114 9.072 99.7448 9.296C99.3939 9.50133 99.2184 9.8 99.2184 10.192C99.2184 10.528 99.3662 10.7987 99.6617 11.004C99.9572 11.1907 100.447 11.3587 101.13 11.508L103.678 12.04C105.101 12.3387 106.172 12.8987 106.892 13.72C107.631 14.5227 108 15.4747 108 16.576C108 17.976 107.455 19.068 106.366 19.852C105.294 20.6173 103.771 21 101.795 21Z" fill="#333333" />
          </svg>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavClick('customize')}
            className="flex gap-2 items-center justify-center py-[11px] px-[27px] rounded-[8px] font-[600] text-[#633CFF] bg-[#EFEBFF]">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M11.154 14.6508C11.2414 14.7379 11.3107 14.8413 11.3581 14.9553C11.4054 15.0693 11.4297 15.1914 11.4297 15.3148C11.4297 15.4382 11.4054 15.5604 11.3581 15.6743C11.3107 15.7883 11.2414 15.8918 11.154 15.9789L10.6899 16.4429C9.81057 17.3223 8.61791 17.8163 7.3743 17.8163C6.1307 17.8163 4.93804 17.3223 4.05868 16.4429C3.17932 15.5636 2.6853 14.3709 2.6853 13.1273C2.6853 11.8837 3.17932 10.691 4.05868 9.81169L5.94305 7.9281C6.78796 7.0811 7.92476 6.58921 9.12057 6.55319C10.3164 6.51717 11.4807 6.93974 12.3751 7.73435C12.4674 7.81642 12.5427 7.91588 12.5966 8.02705C12.6505 8.13821 12.682 8.2589 12.6892 8.38223C12.6965 8.50556 12.6794 8.62911 12.6389 8.74582C12.5984 8.86254 12.5353 8.97014 12.4532 9.06247C12.3711 9.15481 12.2717 9.23007 12.1605 9.28397C12.0493 9.33787 11.9287 9.36934 11.8053 9.3766C11.682 9.38385 11.5585 9.36675 11.4417 9.32625C11.325 9.28576 11.2174 9.22267 11.1251 9.1406C10.5888 8.66429 9.89074 8.4109 9.17377 8.43224C8.4568 8.45359 7.77508 8.74807 7.26805 9.25544L5.38524 11.1367C4.85771 11.6642 4.56135 12.3797 4.56135 13.1258C4.56135 13.8718 4.85771 14.5873 5.38524 15.1148C5.91277 15.6423 6.62826 15.9387 7.3743 15.9387C8.12035 15.9387 8.83583 15.6423 9.36337 15.1148L9.82743 14.6508C9.9145 14.5636 10.0179 14.4944 10.1317 14.4473C10.2455 14.4001 10.3675 14.3758 10.4907 14.3758C10.6139 14.3758 10.7359 14.4001 10.8497 14.4473C10.9635 14.4944 11.0669 14.5636 11.154 14.6508ZM16.9415 3.557C16.0614 2.679 14.869 2.18591 13.6259 2.18591C12.3827 2.18591 11.1903 2.679 10.3102 3.557L9.84618 4.02107C9.67006 4.19719 9.57112 4.43606 9.57112 4.68513C9.57112 4.9342 9.67006 5.17307 9.84618 5.34919C10.0223 5.52531 10.2612 5.62426 10.5102 5.62426C10.7593 5.62426 10.9982 5.52531 11.1743 5.34919L11.6384 4.88513C12.1659 4.3576 12.8814 4.06123 13.6274 4.06123C14.3735 4.06123 15.089 4.3576 15.6165 4.88513C16.144 5.41266 16.4404 6.12815 16.4404 6.87419C16.4404 7.62023 16.144 8.33572 15.6165 8.86325L13.7329 10.7476C13.2254 11.2548 12.5433 11.5488 11.8262 11.5696C11.109 11.5904 10.4111 11.3363 9.87509 10.8593C9.78275 10.7773 9.67515 10.7142 9.55844 10.6737C9.44172 10.6332 9.31817 10.6161 9.19484 10.6233C9.07152 10.6306 8.95082 10.6621 8.83966 10.716C8.7285 10.7699 8.62904 10.8451 8.54696 10.9375C8.46488 11.0298 8.4018 11.1374 8.36131 11.2541C8.32081 11.3708 8.30371 11.4944 8.31096 11.6177C8.31821 11.741 8.34969 11.8617 8.40359 11.9729C8.45748 12.0841 8.53275 12.1835 8.62509 12.2656C9.51882 13.06 10.6824 13.4829 11.8776 13.4476C13.0729 13.4123 14.2095 12.9215 15.0548 12.0758L16.9391 10.1922C17.8182 9.3123 18.3121 8.11957 18.3126 6.87585C18.313 5.63212 17.8199 4.43905 16.9415 3.55857V3.557Z" fill="#633CFF" />
            </svg>
            <p className="md:hidden">Links</p>
          </button>
          <button
            onClick={() => onNavClick('profile')}
            className="flex gap-2 items-center justify-center py-[11px] px-[27px] rounded-[8px] font-[600] hover:text-[#633CFF]">
            <svg className="fill-current hover:fill-[#633CFF]" xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M10.5 1.5625C8.83122 1.5625 7.19992 2.05735 5.81238 2.98448C4.42484 3.9116 3.34338 5.22936 2.70477 6.77111C2.06616 8.31286 1.89907 10.0094 2.22463 11.6461C2.55019 13.2828 3.35379 14.7862 4.53379 15.9662C5.7138 17.1462 7.21721 17.9498 8.85393 18.2754C10.4906 18.6009 12.1871 18.4338 13.7289 17.7952C15.2706 17.1566 16.5884 16.0752 17.5155 14.6876C18.4427 13.3001 18.9375 11.6688 18.9375 10C18.935 7.763 18.0453 5.61833 16.4635 4.03653C14.8817 2.45473 12.737 1.56498 10.5 1.5625ZM6.71641 15.357C7.15163 14.7619 7.72107 14.2779 8.37849 13.9442C9.0359 13.6106 9.76276 13.4367 10.5 13.4367C11.2373 13.4367 11.9641 13.6106 12.6215 13.9442C13.2789 14.2779 13.8484 14.7619 14.2836 15.357C13.1778 16.1412 11.8556 16.5625 10.5 16.5625C9.14436 16.5625 7.82221 16.1412 6.71641 15.357ZM8.3125 9.375C8.3125 8.94235 8.4408 8.51942 8.68116 8.15969C8.92153 7.79996 9.26317 7.51958 9.66288 7.35401C10.0626 7.18845 10.5024 7.14513 10.9268 7.22953C11.3511 7.31394 11.7409 7.52228 12.0468 7.8282C12.3527 8.13413 12.5611 8.52391 12.6455 8.94824C12.7299 9.37257 12.6866 9.81241 12.521 10.2121C12.3554 10.6118 12.075 10.9535 11.7153 11.1938C11.3556 11.4342 10.9327 11.5625 10.5 11.5625C9.91984 11.5625 9.36344 11.332 8.95321 10.9218C8.54297 10.5116 8.3125 9.95516 8.3125 9.375ZM15.6563 14.0578C15.0486 13.2849 14.2741 12.6595 13.3906 12.2281C13.9537 11.658 14.3355 10.934 14.4881 10.1474C14.6408 9.36074 14.5573 8.54653 14.2484 7.80718C13.9394 7.06783 13.4187 6.43637 12.7517 5.99223C12.0847 5.5481 11.3013 5.31112 10.5 5.31112C9.69869 5.31112 8.91528 5.5481 8.24831 5.99223C7.58135 6.43637 7.06062 7.06783 6.75165 7.80718C6.44267 8.54653 6.35925 9.36074 6.51187 10.1474C6.66449 10.934 7.04634 11.658 7.60938 12.2281C6.72592 12.6595 5.9514 13.2849 5.34375 14.0578C4.58051 13.0903 4.10512 11.9274 3.972 10.7022C3.83888 9.47711 4.05341 8.23925 4.59104 7.13037C5.12867 6.02148 5.96767 5.08639 7.01199 4.43212C8.05631 3.77786 9.26375 3.43086 10.4961 3.43086C11.7284 3.43086 12.9359 3.77786 13.9802 4.43212C15.0245 5.08639 15.8635 6.02148 16.4012 7.13037C16.9388 8.23925 17.1533 9.47711 17.0202 10.7022C16.8871 11.9274 16.4117 13.0903 15.6484 14.0578H15.6563Z" fill="#737373" />
            </svg>
            <p className="md:hidden">Profile Details</p>
          </button>
        </div>
        <Link href='/preview'>
          <button className="py-[11px] px-[27px] rounded-[8px] border-[1px] border-[#633CFF] text-[#633CFF] text-[16px] font-[600] leading-[24px] hover:bg-[#EFEBFF] transform transition ease-in-out duration-100 sm:px-4">
            <svg className="fp:hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19.6096 9.61953C19.5807 9.55625 18.8963 8.03672 17.3846 6.525C15.3619 4.50547 12.8127 3.4375 10.0002 3.4375C7.18769 3.4375 4.63847 4.50547 2.61815 6.525C1.10643 8.03672 0.42206 9.55625 0.39081 9.61953C0.337882 9.73953 0.310547 9.86924 0.310547 10.0004C0.310547 10.1315 0.337882 10.2613 0.39081 10.3813C0.419716 10.4453 1.10409 11.9641 2.61659 13.4758C4.63847 15.4953 7.18769 16.5625 10.0002 16.5625C12.8127 16.5625 15.3619 15.4953 17.3814 13.4758C18.8939 11.9641 19.5783 10.4453 19.6072 10.3813C19.6605 10.2614 19.6882 10.1318 19.6887 10.0006C19.6891 9.86949 19.6621 9.73969 19.6096 9.61953ZM16.0111 12.1977C14.3338 13.8492 12.3119 14.6875 10.0002 14.6875C7.68847 14.6875 5.66659 13.8492 3.99159 12.1969C3.33249 11.5447 2.76553 10.8056 2.30643 10C2.76566 9.19474 3.33261 8.45589 3.99159 7.80391C5.66737 6.15078 7.68847 5.3125 10.0002 5.3125C12.3119 5.3125 14.333 6.15078 16.0088 7.80391C16.6678 8.45583 17.2348 9.19469 17.6939 10C17.2348 10.8055 16.6678 11.5447 16.0088 12.1969L16.0111 12.1977ZM10.0002 6.5625C9.32031 6.5625 8.65571 6.76411 8.09041 7.14182C7.52512 7.51954 7.08453 8.0564 6.82435 8.68453C6.56417 9.31265 6.4961 10.0038 6.62874 10.6706C6.76137 11.3374 7.08876 11.9499 7.56951 12.4307C8.05025 12.9114 8.66275 13.2388 9.32956 13.3714C9.99637 13.5041 10.6875 13.436 11.3157 13.1758C11.9438 12.9157 12.4806 12.4751 12.8584 11.9098C13.2361 11.3445 13.4377 10.6799 13.4377 10C13.4367 9.08864 13.0742 8.21489 12.4297 7.57046C11.7853 6.92603 10.9115 6.56353 10.0002 6.5625ZM10.0002 11.5625C9.69115 11.5625 9.38906 11.4709 9.13211 11.2992C8.87515 11.1275 8.67488 10.8835 8.55662 10.5979C8.43836 10.3124 8.40742 9.99827 8.46771 9.69517C8.528 9.39208 8.67681 9.11367 8.89533 8.89515C9.11385 8.67663 9.39226 8.52781 9.69536 8.46752C9.99845 8.40723 10.3126 8.43818 10.5981 8.55644C10.8836 8.6747 11.1277 8.87497 11.2994 9.13192C11.471 9.38887 11.5627 9.69097 11.5627 10C11.5627 10.4144 11.3981 10.8118 11.105 11.1049C10.812 11.3979 10.4146 11.5625 10.0002 11.5625Z" fill="#633CFF" />
            </svg>
            <p className="sm:hidden">Preview</p>
          </button>
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;