import React, {createContext, PropsWithChildren, useContext, useState} from "react";

type LoadingContextType = {

  /**
   * If true then renders InProgress component if false renders data
   */
  isLoading: boolean;

  /**
   * Change isLoading value
   */
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

type LoadingProviderProps = PropsWithChildren<unknown>;

/**
 * Loading provider
 */
export const LoadingProvider: React.FC<LoadingProviderProps> = ({children}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{isLoading, setLoading}}>
      {children}
    </LoadingContext.Provider>
  );
};

/**
 * Check context value and return Error or Context
 * @returns {LoadingContextType}
 */
export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }

  return context;
};
