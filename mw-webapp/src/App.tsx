import {useState} from "react";
import {RouterProvider} from "react-router-dom";
import {
  DEFAULT_NOTIFICATION_SETTINGS,
  globalContext,
} from "src/GlobalContext";
import {useAmplitudeActivate} from "src/hooks/useAmplitudeActivate";
import {router} from "src/router/Router";

/**
 * App
 */
export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useAmplitudeActivate();

  return (
    <globalContext.Provider value={{
      isInitialized,
      setIsInitialized,
      // TODO: load from local storage
      notification: DEFAULT_NOTIFICATION_SETTINGS,
    }}
    >
      <RouterProvider router={router} />
    </globalContext.Provider>
  );
};
