import {createContext, useContext} from "react";
import {User} from "firebase/auth";

const STUB_USER = {} as User;

export type UserType = {

  /**
   * Value of user's context
   */
  user: User | null;

}

export const UserContext: React.Context<UserType> = createContext<UserType>({user: STUB_USER});

/**
 * Use UserContext
 */
export const useUserContext = () => useContext(UserContext);