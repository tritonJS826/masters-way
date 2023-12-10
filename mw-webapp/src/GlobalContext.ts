import {createContext, useContext} from "react";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

export type GlobalContext = {

  /**
   * If user is not logged - null, if logged - UserPreview always
   */
  user: UserPreview | null;

}

export const globalContext: React.Context<GlobalContext> = createContext<GlobalContext>({user: null});

/**
 * Use UserContext
 */
export const useGlobalContext = () => useContext(globalContext);
