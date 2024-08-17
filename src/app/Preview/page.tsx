import Preview from "../components/PreviewNavbar/PreviewNavbar";
import ProfilePreview from "../components/ProfilePreview/ProfilePreview";
import React from "react";

export default function PreviewPage() {
  const MemorizedPreview = React.memo(Preview);
  const MemorizedProfilePreview = React.memo(ProfilePreview);

  // Define the data that you want to pass to the ProfilePreview component
  const profilePreviewData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    profilePicture: "/path/to/profile-picture.jpg",
    selectedImage: null, // or set this to a valid image path if available
  };

  return (
    <nav>
      <MemorizedPreview />
      <MemorizedProfilePreview profilePreviewData={profilePreviewData} />
    </nav>
  );
}
