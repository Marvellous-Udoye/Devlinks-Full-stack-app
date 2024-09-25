"use client";

import React, { FC } from "react";

interface HandleProfileProps {
    onSubmit: (data: {
      firstName: string; 
      lastName: string; 
      email: string; 
      selectedImage: string | null 
    }) => void;
  }
  
  const HandleProfile: React.FC<HandleProfileProps> = ({ onSubmit }) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Collect form data here
      const data = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        selectedImage: null, // or some image URL
      };
  
      // Call the onSubmit prop with the form data
      onSubmit(data);
    };
  }
  
  export default HandleProfile;