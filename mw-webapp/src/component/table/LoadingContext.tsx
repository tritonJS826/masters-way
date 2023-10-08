import {createContext, PropsWithChildren, useContext, useState} from "react";

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

/**
 * Loading provider
 */
export const LoadingProvider: React.FC<PropsWithChildren> = (props: PropsWithChildren) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{isLoading, setLoading}}>
      {props.children}
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
