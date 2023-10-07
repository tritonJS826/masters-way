import React, {createContext, PropsWithChildren, useContext, useState} from "react";

type LoadingContextType = {

  /**
   * Render InProgress component if true
   */
  isLoading: boolean;

  /**
   * Change value of isLoading
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
 * Check context and return Error if it's not exist
 */
export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }

  return context;
};
