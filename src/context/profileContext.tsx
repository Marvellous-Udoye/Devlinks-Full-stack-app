// import { createContext, useContext, useState } from "react";

// interface ProfileData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   selectedImage: string | null;
// }

// interface ProfileDataProps {
//   profileData: ProfileData;
//   setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
// }

// const ProfileContext = createContext<ProfileDataProps | undefined>(undefined);

// export const ProfileDataProvider = ({ children }: { children: React.ReactNode }) => {
//   const [profileData, setProfileData] = useState<ProfileData>({
//     firstName: '',
//     lastName: '',
//     email: '',
//     selectedImage: null, 
//   });

//   return (
//     <ProfileContext.Provider value={{ profileData, setProfileData }}>
//       {children}
//     </ProfileContext.Provider>
//   );
// };

// export const useProfileData = () => {
//   const context = useContext(ProfileContext);

//   if (!context) {
//     throw new Error("useProfileData must be used within a ProfileDataProvider");
//   }

//   return context;
// };
