"use client"

import { useState } from "react";
import Navbar from '../components/Navbar/Navbar';
import DisplayLink from "../components/Displaylinks/DisplayLink";
import CustomizeLinks from "../components/CustomizeLinks/CustomizeLinks";
import ProfileDetails from "../components/ProfileDetails/ProfileDetails";
import React from "react";

export default function Home() {
  const MemorizedNavbar = React.memo(Navbar)
  const MemorizedDisplayLink = React.memo(DisplayLink)
  const MemorizedProfileDetails = React.memo(ProfileDetails)
  const MemorizedCustomizeLinks = React.memo(CustomizeLinks)

  const [selectedComponent, setSelectedComponent] = useState<'customize' | 'profile' | null>('customize');

  const handleNavClick = (component: 'customize' | 'profile') => {
    setSelectedComponent(component);
  };

  const handleProfileSubmit = (formData: any) => {
    // handle the form submission logic here
    console.log("Profile form submitted with data:", formData);
  };

  return (
    <main className="w-full">
      <MemorizedNavbar onNavClick={handleNavClick} />
      <section className="flex w-full">
        <MemorizedDisplayLink />
        {selectedComponent === 'customize' && <MemorizedCustomizeLinks />}
        {selectedComponent === 'profile' && <MemorizedProfileDetails onSubmit={handleProfileSubmit} />}
      </section>
    </main>
  );
}
