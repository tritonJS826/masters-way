import {Routes, Route} from "react-router-dom";
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
    </Routes>
  );
};