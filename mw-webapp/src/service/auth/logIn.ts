import {signInWithPopup} from "firebase/auth";
import {auth, provider} from "src/firebase";

/**
 * Call method for log in
 */
export const logIn = async () => {

  /**
   * TODO: IMPORTANT! Refactor required!!!
   * LogIn with signInWithPopUp and signInWithRedirect methods doesn't work in Opera.
   * Also need to check how it works in other browsers: Edge, Safari
   * Using signInWithRedirect works in Chrome but doesn't work in FireFox, Opera and maybe other browsers
   * Using signInWithPopUp works in FireFox but calls in Chrome Error:
   * Cross-Origin-Opener-Policy policy would block the window.closed call.
   * According
   * https://stackoverflow.com/questions/76446840/cross-origin-opener-policy-policy-would-block-the-window-closed-call-error-while
   * The problem is with Cross-Origin-Embedder-Policy header, which is by default should be set to unsafe-none.
   * Also Firebase recommends the next steps to resolve this issue:
   * https://firebase.google.com/docs/auth/web/redirect-best-practices
   *
   */
  await signInWithPopup(auth, provider);
};
