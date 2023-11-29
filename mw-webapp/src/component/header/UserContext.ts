import {createContext, useContext} from "react";
import {User} from "firebase/auth";

export type UserType = {

  /**
   * If user is not logged - null , if logged - User always
   */
  user: User | null;

}

export const UserContext: React.Context<UserType> = createContext<UserType>({user: null});

/**
 * Use UserContext
 */
export const useUserContext = () => useContext(UserContext);