"use client"

import React, { useState } from "react";
import Preview from "../components/PreviewNavbar/PreviewNavbar";
import ProfilePreview from "../components/ProfilePreview/ProfilePreview";
import ProfileDetails from "../components/ProfileDetails/ProfileDetails";

// Define the type for the profilePreviewData state
type ProfilePreviewData = {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string; // or string | null if profilePicture can be null
  selectedImage: string | null;
};

// In your PreviewPage component

export default function PreviewPage() {
  const MemorizedPreview = React.memo(Preview);
  const MemorizedProfilePreview = React.memo(ProfilePreview);

  const [profilePreviewData, setProfilePreviewData] = useState<ProfilePreviewData>({
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "", // Adjust the initial value if necessary
    selectedImage: null,
  });

  // Example of how you would update this data
  const handleProfileDetailsSubmit = (data: {
    firstName: string;
    lastName: string;
    email: string;
    selectedImage: string | null;
  }) => {
    setProfilePreviewData((prevData: ProfilePreviewData) => ({
      ...prevData,
      ...data,
      profilePicture: data.selectedImage || prevData.profilePicture, // Use the selectedImage as the profilePicture if available
    }));
  };

  return (
    <nav>
      <MemorizedPreview />
      <MemorizedProfilePreview profilePreviewData={profilePreviewData} />
    </nav>
  );
}
