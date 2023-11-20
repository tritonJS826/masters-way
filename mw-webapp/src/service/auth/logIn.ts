import {signInWithPopup} from "firebase/auth";
import {auth, provider} from "src/firebase";

/**
 * Call method for log in
 */
export const logIn = async () => {

  /**
   * TODO:
   * LogIn with signInWithPopUp and signInWithRedirect methods doesn't work in Opera.
   * Also need to check how it works in other browsers: Edge, Safari
   * Using signInWithRedirect works in Chrome but doesn't work in FireFox, Opera and maybe other browsers
   * Using signInWithPopUp works in FireFox but calls in Chrome Error:
   * "Cross-Origin-Opener-Policy policy would block the window.closed call."
   * Resolve solutions:
   * https://firebase.google.com/docs/auth/web/redirect-best-practices
   * https://stackoverflow.com/questions/76446840/cross-origin-opener-policy-policy-would-block-the-window-closed-call-error-while
   */
  await signInWithPopup(auth, provider);
};
