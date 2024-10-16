import { combineReducers } from 'redux';
import * as actions from './actionTypes';

// Profile Reducer
interface ProfileProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  selectedImage: string | null;
}

interface ProfileActionProps {
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  selectedImage: string | null;
}

let lastId = 0;
const initialProfileState: ProfileProps = {
  id: ++lastId,
  firstName: "",
  lastName: "",
  email: "",
  selectedImage: null,
};

function profileReducer(state = initialProfileState, action: ProfileActionProps) {
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
  icon: React.ReactNode;
  platform: string;
  url: string;
}

interface LinkActionProps {
  type: string;
  payload: {
    id?: number;
    icon?: React.ReactNode;
    platform?: string;
    url?: string;
  };
}

interface LinkState {
  links: LinkProps[];
}

const initialLinkState: LinkState = {
  links: []
};

function linkReducer(state = initialLinkState, action: LinkActionProps) {
  switch (action.type) {
    case actions.LINK_SUBMITTED:
      // Ensure action.payload is not undefined before accessing properties
      if (!action.payload) {
        console.error('No payload provided for LINK_SUBMITTED action.');
        return state;
      }

      return {
        ...state,
        links: [
          ...state.links,
          {
            id: ++lastId,
            icon: action.payload.icon || <></>, // fallback to empty fragment
            platform: action.payload.platform || "", // fallback to empty string
            url: action.payload.url || "", // fallback to empty string
          },
        ],
      };

    case actions.LINK_REMOVED:
      return {
        ...state,
        links: state.links.filter((link) => link.id !== action.payload?.id), // Ensure payload exists
      };

    default:
      return state;
  }
}


const rootReducer = combineReducers({
  profile: profileReducer,
  links: linkReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;