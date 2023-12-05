import {signInWithPopup} from "firebase/auth";
import {auth, provider} from "src/firebase";

/**
 * Call method for log in
 */
export const logIn = async () => {

  /**
   * TODO:
   * Сheck how it works in browsers: Edge, Safari
   * Using signInWithRedirect works in Chrome but doesn't work in FireFox and maybe other browsers
   * Using signInWithPopUp works in FireFox but calls in Chrome and Opera Error:
   * "Cross-Origin-Opener-Policy policy would block the window.closed call."
   * Link on discuss about this problem: https://github.com/vercel/next.js/discussions/51135
   * Resolve solutions:
   * https://firebase.google.com/docs/auth/web/redirect-best-practices
   */
  await signInWithPopup(auth, provider);
};
