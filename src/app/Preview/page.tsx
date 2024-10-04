"use client"

import React, { useState } from "react";
import Preview from "../components/PreviewNavbar/PreviewNavbar";
import ProfilePreview from "../components/ProfilePreview/ProfilePreview";
import ProfileDetails from "../components/ProfileDetails/ProfileDetails";
import { ProfileDataProvider } from "../components/common/profileContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function PreviewPage() {
  const MemorizedPreview = React.memo(Preview);
  const MemorizedProfilePreview = React.memo(ProfilePreview);

  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect('/signup')
  //   },
  // })

  return (
    <nav>
      <ProfileDataProvider>
        <MemorizedPreview />
        <MemorizedProfilePreview />
      </ProfileDataProvider>
    </nav>
  );
}
