"use client";

import React, { useState, useEffect } from 'react';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import ProfilePreview from '../ProfilePreview/ProfilePreview';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  selectedImage: string | null;
}

const ProfileContainer: React.FC = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [profilePreviewData, setProfilePreviewData] = useState<FormData | null>(null);

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
  };

  useEffect(() => {
    if (formData) {
      setProfilePreviewData(formData);
    }
  }, [formData]);

  return (
    <div>
      <ProfileDetails onSubmit={handleFormSubmit} />
      {profilePreviewData && <ProfilePreview profilePreviewData={profilePreviewData} />}
    </div>
  );
};

export default ProfileContainer;
