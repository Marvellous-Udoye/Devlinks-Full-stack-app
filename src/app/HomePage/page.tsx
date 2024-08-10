"use client"

import { useState } from "react";
import Navbar from '../components/Navbar/Navbar';
import DisplayLink from "../components/Displaylinks/DisplayLink";
import CustomizeLinks from "../components/CustomizeLinks/CustomizeLinks";
import ProfileDetails from "../components/ProfileDetails/ProfileDetails";

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState<'customize' | 'profile' | null>('customize');

  const handleNavClick = (component: 'customize' | 'profile') => {
    setSelectedComponent(component);
  };

  return (
    <main className="w-full">
      <Navbar onNavClick={handleNavClick} />
      <section className="flex w-full">
      <DisplayLink />
        {selectedComponent === 'customize' && <CustomizeLinks />}
        {selectedComponent === 'profile' && <ProfileDetails />}
      </section>
    </main>
  );
}