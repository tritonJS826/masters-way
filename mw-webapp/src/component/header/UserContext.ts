import {createContext, useContext} from "react";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

export type UserType = {

  /**
   * If user is not logged - null
   */
  user: UserPreview | null;

}

export const UserContext: React.Context<UserType> = createContext<UserType>({user: null});

/**
 * Use UserContext
 */
export const useUserContext = () => useContext(UserContext);
