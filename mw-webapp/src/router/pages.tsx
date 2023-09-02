import {AuthPage} from "src/pages/authPage/AuthPage";
import {MainPage} from "src/pages/mainPage/MainPage";
import {SignInPage} from "src/pages/signInPage/SignInPage";
import {SignUpPage} from "src/pages/signUpPage/SignUpPage";

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
  signIn: {
    path: "sign-in",
    element: <SignInPage />,
  },
  signUp: {
    path: "sign-up",
    element: <SignUpPage />,
  },
};
