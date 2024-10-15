import * as actions from './actionTypes';

// Action to submit profile form data
export const submitProfile = (firstName: string, lastName: string, email: string, selectedImage: string) => ({
  type: actions.PROFILE_SUBMITTED,
  firstName,
  lastName,
  email,
  selectedImage,
});

// Action to submit a new link
export const submitLink = (platform: string, url: string) => ({
  type: actions.LINK_SUBMITTED,
  link: {
    platform,
    url,
  },
});

// Action to remove a link
export const removeLink = (id: number) => ({
  type: actions.LINK_REMOVED,
  link: {
    id,
  },
});
