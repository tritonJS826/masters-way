import React, {createContext, PropsWithChildren, useContext, useState} from "react";

type LoadingContextType = {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

type LoadingProviderProps = PropsWithChildren<unknown>;


export const LoadingProvider: React.FC<LoadingProviderProps> = ({children}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{isLoading, setLoading}}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
