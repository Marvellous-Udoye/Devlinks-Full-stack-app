"use client";

import React, { FC, useState } from "react";

interface HandleProfileProps {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    selectedImage: string | null;
  }) => void;
}

const HandleProfile: FC<HandleProfileProps> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      selectedImage,
    };

    onSubmit(data);
  };

  return (
    <div>

    </div>
  );
};

export default HandleProfile;
