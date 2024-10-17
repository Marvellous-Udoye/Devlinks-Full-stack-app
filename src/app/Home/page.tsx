"use client"

import { useEffect, useState } from "react";
import Navbar from '../components/common/Navbar';
import DisplayLink from "../components/common/DisplayLink";
import CustomizeLinks from "../components/common/CustomizeLinks";
import ProfileDetails from "../components/common/ProfileDetails";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Modal from "../components/common/successModal";

Home.requireAuth = true

export default function Home() {
  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect('/signup')
  //   },
  // })

  const MemorizedNavbar = React.memo(Navbar)
  const MemorizedDisplayLink = React.memo(DisplayLink)
  const MemorizedProfileDetails = React.memo(ProfileDetails)
  const MemorizedCustomizeLinks = React.memo(CustomizeLinks)

  const [selectedComponent, setSelectedComponent] = useState<'customize' | 'profile' | null>('customize');
  const [savedProfile, setSavedProfile] = useState(false)

  const handleNavClick = (component: 'customize' | 'profile') => {
    setSelectedComponent(component);
  };

  const handleSavedProfile = () => {
    setSavedProfile(true)
  }

  useEffect(() => {
    if (!savedProfile) return;

    const timeoutId = setTimeout(() => {
      setSavedProfile(false);
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [savedProfile]);


  return (
    <main className="w-full">
      <MemorizedNavbar onNavClick={handleNavClick} />
      {/* <div>{session?.data?.user?.email}</div>
      <button onClick={() => signOut()}>Log out</button> */}
      <section className="flex w-full">
        <MemorizedDisplayLink />
        {selectedComponent === 'customize' && <MemorizedCustomizeLinks savedProfile={savedProfile} setSavedProfile={handleSavedProfile} />}
        {selectedComponent === 'profile' && <MemorizedProfileDetails savedProfile={savedProfile} setSavedProfile={handleSavedProfile} />}
      </section>
      {savedProfile && <Modal />}
    </main>
  );
}


