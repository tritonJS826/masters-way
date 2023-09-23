import React, {createContext, ReactNode, useContext, useState} from "react";

type LoadingContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

type LoadingProviderProps = {
  children: ReactNode;
};

export const LoadingProvider: React.FC<LoadingProviderProps> = ({children}) => {
  const [loading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{loading, setLoading}}>
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
