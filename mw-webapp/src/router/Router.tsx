import {Route, Routes} from "react-router-dom";
import {pages} from "src/router/pages";
import {WithValidatedParams} from "src/router/PageUrlValidator/ValidatedParams";

/**
 * Router
 */
export const Router = () => {
  return (
    <Routes>
      <Route
        path={pages.home.getPath({})}
        element={<WithValidatedParams paramsSchema={pages.home} />}
      />
      <Route
        path={pages.allWays.getPath({})}
        element={<WithValidatedParams paramsSchema={pages.allWays} />}
      />
      <Route
        path={pages.user.getPath({uuid: ":uuid"})}
        element={<WithValidatedParams paramsSchema={pages.user} />}
      />
      <Route
        path={pages.way.getPath({uuid: ":uuid"})}
        element={<WithValidatedParams paramsSchema={pages.way} />}
      />
      <Route
        path={pages.allUsers.getPath({})}
        element={<WithValidatedParams paramsSchema={pages.allUsers} />}
      />
      <Route
        path={pages.settings.getPath({})}
        element={<WithValidatedParams paramsSchema={pages.settings} />}
      />
      <Route
        path={pages.aboutProject.getPath({})}
        element={<WithValidatedParams paramsSchema={pages.aboutProject} />}
      />
      <Route
        path={pages.page404.getPath({})}
        element={<WithValidatedParams paramsSchema={pages.page404} />}
      />
    </Routes>
  );
};
