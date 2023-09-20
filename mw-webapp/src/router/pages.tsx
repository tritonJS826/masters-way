import {AuthPage} from "src/pages/authPage/AuthPage";
import {MainPage} from "src/pages/mainPage/MainPage";
import {Page404} from "src/pages/Page404/Page404";

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
  page404: {
    path: "*",
    element: <Page404 />,
  },
};
