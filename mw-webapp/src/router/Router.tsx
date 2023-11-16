import {Route, Routes} from "react-router-dom";
import {pages} from "src/router/pages";
import {ValidatedParams} from "src/router/PageUrlValidator/ValidatedParams";

/**
 * Router
 */
export const Router = () => {
  return (
    <Routes>
      <Route
        path={pages.allWays.getPath()}
        element={<ValidatedParams paramsSchema={pages.allWays} />}
      />
      <Route
        path={pages.user.getPath(":uuid")}
        element={<ValidatedParams paramsSchema={pages.user} />}
      />
      <Route
        path={pages.way.getPath(":uuid")}
        element={<ValidatedParams paramsSchema={pages.way} />}
      />
      <Route
        path={pages.allUsers.getPath()}
        element={<ValidatedParams paramsSchema={pages.allUsers} />}
      />
      <Route
        path={pages.userProfile.getPath(":uuid")}
        element={<ValidatedParams paramsSchema={pages.userProfile} />}
      />
      <Route
        path={pages.aboutProject.getPath()}
        element={<ValidatedParams paramsSchema={pages.aboutProject} />}
      />
      <Route
        path={pages.page404.getPath()}
        element={<ValidatedParams paramsSchema={pages.page404} />}
      />
    </Routes>
  );
};