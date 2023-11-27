import {createContext, useContext} from "react";
import {User} from "firebase/auth";

const STUB_USER = null;

/**
 * Stub for set user
 */
const STUB_SET_USER = () => undefined;

export type UserType = {

  /**
   * Value of user's context
   */
  user: User | null;

  /**
   * Change value of user's context
   */
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext: React.Context<UserType> = createContext<UserType>({
  user: STUB_USER,
  setUser: STUB_SET_USER,
});

/**
 * Use UserContext
 */
export const useUserContext = () => useContext(UserContext);