import {WelcomePage} from "src/logic/welcomePage/WelcomePage";
import {MainPage} from "src/logic/mainPage/MainPage";

/**
 * Pages meta data
 */
export const pages = {
  welcome: {
    path: "/",
    element: <WelcomePage />,
  },
  main: {
    path: "main",
    element: <MainPage />,
  },
};
