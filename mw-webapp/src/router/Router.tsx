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
        element={pages.allWays.pageComponent}
      />
      <Route
        path={pages.user.path(":uuid")}
        element={pages.user.pageComponent}
      />
      <Route
        path={pages.way.path(":uuid")}
        element={pages.way.pageComponent}
      />
      <Route
        path={pages.allUsers.path}
        element={pages.allUsers.pageComponent}
      />
      <Route
        path={pages.userProfile.path(":uuid")}
        element={pages.userProfile.pageComponent}
      />
      <Route
        path={pages.aboutProject.path}
        element={pages.aboutProject.pageComponent}
      />
      <Route
        path={pages.page404.path}
        element={pages.page404.pageComponent}
      />
    </Routes>
  );
};