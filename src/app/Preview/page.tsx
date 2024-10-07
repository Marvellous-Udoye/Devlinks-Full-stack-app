"use client"

import React, { useState } from "react";
import Preview from "../common/components/PreviewNavbar";
import ProfilePreview from "../common/components/ProfilePreview";
import ProfileDetails from "../common/components/ProfileDetails";
import { ProfileDataProvider } from "../common/profileContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function PreviewPage() {
  const MemorizedPreview = React.memo(Preview);
  const MemorizedProfilePreview = React.memo(ProfilePreview);

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signup')
    },
  })

  return (
    <nav>
      <ProfileDataProvider>
        <MemorizedPreview />
        <MemorizedProfilePreview />
      </ProfileDataProvider>
    </nav>
  );
}
