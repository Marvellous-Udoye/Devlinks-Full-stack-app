"use client"

import React, { useState } from "react";
import Preview from "../components/common/PreviewNavbar";
import ProfilePreview from "../components/common/ProfilePreview";
import ProfileDetails from "../components/common/ProfileDetails";
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
    <div>
      <MemorizedPreview />
      <MemorizedProfilePreview />
      <div className="h-[500px]"></div>
    </div>
  );
}
