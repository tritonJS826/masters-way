import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import {Layout} from "src/logic/Layout";
import {pages} from "src/router/pages";
import {WithValidatedParams} from "src/router/PageUrlValidator/ValidatedParams";

/**
 * Router
 */

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={pages.home.getPath({})}
      element={<Layout />}
      errorElement={pages.page404.getPageComponent({})}
    >
      <Route
        path={pages.home.getPath({})}
        element={<WithValidatedParams paramsSchema={pages.home} />}
        errorElement={pages.page404.getPageComponent({})}
      />
      <Route
        path={pages.allWays.getPath({})}
        element={<WithValidatedParams paramsSchema={pages.allWays} />}
        errorElement={pages.page404.getPageComponent({})}
      />
      <Route
        path={pages.user.getPath({uuid: ":uuid"})}
        element={<WithValidatedParams paramsSchema={pages.user} />}
        errorElement={pages.page404.getPageComponent({})}
      />
      <Route
        path={pages.way.getPath({uuid: ":uuid"})}
        element={<WithValidatedParams paramsSchema={pages.way} />}
        errorElement={pages.page404.getPageComponent({})}
      />
      <Route
        path={pages.allUsers.getPath({})}
        element={<WithValidatedParams paramsSchema={pages.allUsers} />}
        errorElement={pages.page404.getPageComponent({})}
      />
      <Route
        path={pages.settings.getPath({})}
        element={<WithValidatedParams paramsSchema={pages.settings} />}
      />
      <Route
        path={pages.aboutProject.getPath({})}
        element={<WithValidatedParams paramsSchema={pages.aboutProject} />}
      />
    </Route>,
  ),
);
