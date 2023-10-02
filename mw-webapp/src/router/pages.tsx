import { AuthPage } from "src/pages/authPage/AuthPage";
import { MainPage } from "src/pages/mainPage/MainPage";
import { WaysPage } from "src/pages/waysPage/WaysPage";
import { UsersPage } from "src/pages/usersPage/UsersPage";
import { Page404 } from "src/pages/page404/Page404";

/**
 * Pages meta data
 */
export const pages = {
  auth: {
    path: "/",
    element: <AuthPage />,
  },
  main: {
    path: "main",
    element: <MainPage />,
  },
  waysPage: {
    path: "waysPage",
    element: <WaysPage />,
  },
  users: {
    path: "users",
    element: <UsersPage />,
  },
  page404: {
    path: "*",
    element: <Page404 />,
  },
};
