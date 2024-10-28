import React from 'react';
import * as actions from './actionTypes';

export const submitProfile = (firstName: string, lastName: string, email: string, selectedImage: string) => ({
  type: actions.PROFILE_SUBMITTED,
  firstName,
  lastName,
  email,
  selectedImage,
});

export const submitLink = (icon: React.ReactNode, platform: string, url: string) => ({
  type: actions.LINK_SUBMITTED,
  payload: {
    icon,
    platform,
    url,
  },
});

export const removeLink = (linkId: number): {type: string, id: number} => ({
  type: actions.LINK_REMOVED,
  id: linkId,
});
