import {Route, Routes} from "react-router-dom";
import {pages} from "src/router/pages";

/**
 * Router
 */
export const Router = () => {
  return (
    <Routes>
      <Route
        path={pages.main.path}
        element={pages.main.element}
      />
      <Route
        path={pages.auth.path}
        element={pages.auth.element}
      />
      <Route
        path={pages.allWays.path}
        element={pages.allWays.element}
      />
      <Route
        path={pages.allUsers.path}
        element={pages.allUsers.element}
      />
      <Route
        path={pages.user.path}
        element={pages.user.element}
      />
      <Route
        path={pages.page404.path}
        element={pages.page404.element}
      />
    </Routes>
  );
};
