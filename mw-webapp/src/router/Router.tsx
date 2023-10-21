import {Route, Routes} from "react-router-dom";
import {pages} from "src/router/pages";
import {ProtectedRouter} from "src/router/ProtectedRouter";

/**
 * Router props
 */
interface RouterProps {

  /**
   * Autorization users
   */
  isAuth: boolean;
}

/**
 * Router
 */
export const Router = (props: RouterProps) => {
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
      <Route element={<ProtectedRouter isAuth={props.isAuth} />}>
        <Route
          path={pages.aboutProject.path}
          element={pages.aboutProject.element}
        />
        <Route
          path={pages.user.path(":uuid")}
          element={pages.user.element}
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
          path={pages.userProfile.path(":uuid")}
          element={pages.userProfile.element}
        />
      </Route>
    </Routes>
  );
};