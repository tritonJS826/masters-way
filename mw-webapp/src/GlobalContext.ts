import {createContext, useContext} from "react";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

/**
 * Default value of setUser
 */
const DEFAULT_SET_USER = () => new Error ("The project is not initialized");

const DEFAULT_USER_CONTEXT = {
  user: null,
  setUser: DEFAULT_SET_USER,
};

export type GlobalContext = {

  /**
   * If user is not logged - null, if logged - UserPreview always
   */
  user: UserPreview | null;

  /**
   * Update user
   */
  setUser: (user: UserPreview | null) => void;

}

export const globalContext: React.Context<GlobalContext> = createContext<GlobalContext>(DEFAULT_USER_CONTEXT);

/**
 * Use UserContext
 */
export const useGlobalContext = () => useContext(globalContext);
