import {Route, Routes} from "react-router-dom";
import {pages} from "src/router/pages";

/**
 * Router
 */
export const Router = () => {
  return (
    <Routes>
      <Route
        path={pages.ways.path}
        element={pages.ways.element}
      />
      <Route
        path={pages.user.path}
        element={pages.user.element}
      />
      <Route
        path={pages.way.path}
        element={pages.way.element}
      />
      <Route
        path={pages.users.path}
        element={pages.users.element}
      />
      <Route
        path={pages.userProfile.path}
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
