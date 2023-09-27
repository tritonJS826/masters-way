import {AllUsersPage} from "src/pages/allUsersPage/AllUsersPage";
import {AuthPage} from "src/pages/authPage/AuthPage";
import {MainPage} from "src/pages/mainPage/MainPage";
import {Page404} from "src/pages/page404/Page404";

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
  allUserPage: {
    path: "all-users",
    element: <AllUsersPage />,
  },
  page404: {
    path: "*",
    element: <Page404 />,
  },
};
