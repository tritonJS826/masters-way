import {createContext, useContext} from "react";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

/**
 * Default value of setUser
 */
const DEFAULT_SET_USER = () => null;

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

export const globalContext: React.Context<GlobalContext> = createContext<GlobalContext>({
  user: null,
  setUser: DEFAULT_SET_USER,
});

/**
 * Use UserContext
 */
export const useGlobalContext = () => useContext(globalContext);
