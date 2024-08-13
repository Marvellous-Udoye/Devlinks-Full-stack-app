import Preview from "../components/PreviewNavbar/PreviewNavbar";
import ProfilePreview from "../components/ProfilePreview/ProfilePreview";
import React from "react";

export default function PreviewPage() {
const MemorizedPreview = React.memo(Preview)
const MemorizedProfilePreview = React.memo(ProfilePreview)
  return (
    <nav>
      <MemorizedPreview />
      <MemorizedProfilePreview />
    </nav>
  )
}