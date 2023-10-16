import {AllUsersPage} from "src/pages/allUsersPage/AllUsersPage";
import {AllWaysPage} from "src/pages/allWaysPage/AllWaysPage";
import {AuthPage} from "src/pages/authPage/AuthPage";
import {MainPage} from "src/pages/mainPage/MainPage";
import {Page404} from "src/pages/page404/Page404";
import {UserPage} from "src/pages/userPage/UserPage";

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
  allWays: {
    path: "allWays",
    element: <AllWaysPage />,
  },
  allUsers: {
    path: "allUsers",
    element: <AllUsersPage />,
  },
  user: {
    path: "user",
    element: <UserPage />,
  },
  page404: {
    path: "*",
    element: <Page404 />,
  },
};
