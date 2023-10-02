import {AuthPage} from "src/pages/authPage/AuthPage";
import {MainPage} from "src/pages/mainPage/MainPage";
import {Page404} from "src/pages/page404/Page404";
import {WaysPage} from "src/pages/waysPage/WaysPage";

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
  page404: {
    path: "*",
    element: <Page404 />,
  },
};
