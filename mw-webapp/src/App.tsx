import {useEffect, useState} from "react";
import {RouterProvider} from "react-router-dom";
import {globalContext} from "src/GlobalContext";
import {serviceWorkerStore} from "src/globalStore/ServiceWorkerStore";
import {router} from "src/router/Router";

/**
 * App
 */
export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    serviceWorkerStore.register();
  }, []);

  return (
    <globalContext.Provider value={{
      isInitialized,
      setIsInitialized,
    }}
    >
      <RouterProvider router={router} />
    </globalContext.Provider>
  );
};
