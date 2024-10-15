import { combineReducers } from 'redux';
import * as actions from './actionTypes';

// Profile Reducer
interface ProfileProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  selectedImage: string | null; // Allow null here
}

interface ProfileActionProps {
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  selectedImage: string | null;
}

let lastId = 0;
const initialState: ProfileProps = {
  id: ++lastId, // Add id to initial state
  firstName: "",
  lastName: "",
  email: "",
  selectedImage: null, // Set to null initially
};

function profileReducer(state = initialState, action: ProfileActionProps) {
  switch (action.type) {
    case actions.PROFILE_SUBMITTED:
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        selectedImage: action.selectedImage,
      };

    default:
      return state;
  }
}

// Link Reducer
interface LinkProps {
  id: number;
  platform: string;
  url: string;
}

interface LinkActionProps {
  type: string;
  link: {
    id: number;
    platform: string;
    url: string;
  }
}

function linkReducer(state: LinkProps[] = [], action: LinkActionProps) {
  switch (action.type) {
    case actions.LINK_SUBMITTED:
      return [
        ...state,
        {
          id: ++lastId,
          platform: action.link.platform,
          url: action.link.url,
        },
      ];

    case actions.LINK_REMOVED:
      return state.filter((link) => link.id !== action.link.id);

    default:
      return state;
  }
}

const reducer = combineReducers({
    profile: profileReducer,
    links: linkReducer,
  })

export default reducer;
