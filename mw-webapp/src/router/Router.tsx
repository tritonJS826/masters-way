import {Route, Routes} from "react-router-dom";
import {pages} from "src/router/pages";

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
        path={pages.allUserPage.path}
        element={pages.allUserPage.element}
      />
      <Route
        path={pages.page404.path}
        element={pages.page404.element}
      />
    </Routes>
  );
};