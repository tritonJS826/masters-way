import {Route, Routes} from "react-router-dom";
import {pages} from "src/router/pages";

/**
 * Router
 */
export const Router = () => {
  return (
    <Routes>
      <Route
        path={pages.allWays.path}
        element={pages.allWays.element}
      />
      <Route
        path={pages.user.path(":uuid")}
        element={pages.user.element}
      />
      <Route
        path={pages.userProfile.path(":uuid")}
        element={pages.userProfile.element}
      />
      <Route
        path={pages.aboutProject.path}
        element={pages.aboutProject.element}
      />

      <Route
        path={pages.page404.path}
        element={pages.page404.element}
      />
    </Routes>
  );
};
