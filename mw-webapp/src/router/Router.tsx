import {Route, Routes} from "react-router-dom";
import {pages} from "src/router/pages";
import {ProtectedRouterLayer} from "src/router/ProtectedRouter";

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
        path={pages.page404.path}
        element={pages.page404.element}
      />
      <Route
        path={pages.aboutProject.path}
        element={pages.aboutProject.element}
      />
      <Route
        path={pages.redirect.path}
        element={pages.redirect.element}
      />
      <Route
        path={pages.way.path(":uuid")}
        element={pages.way.element}
      />
      <Route
        path={pages.allUsers.path}
        element={pages.allUsers.element}
      />
      <Route
        path={pages.user.path(":uuid")}
        element={pages.user.element}
      />
      <Route element={<ProtectedRouterLayer />}>
        <Route
          path={pages.userProfile.path(":uuid")}
          element={pages.userProfile.element}
        />
      </Route>
    </Routes>
  );
};
