import {signInWithPopup} from "firebase/auth";
import {auth, provider} from "src/firebase";

/**
 * Call method for log in
 */
export const logIn = async () => {

  /**
   * TODO: IMPORTANT!
   * Using signInWithPopUp calls Error: Cross-Origin-Opener-Policy policy would block the window.closed call.
   * According
   * https://stackoverflow.com/questions/76446840/cross-origin-opener-policy-policy-would-block-the-window-closed-call-error-while
   * The problem is with Cross-Origin-Embedder-Policy header, which is by default should be set to unsafe-none.
   * Also Firebase recommends the next steps to resolve this issue:
   * https://firebase.google.com/docs/auth/web/redirect-best-practices
   *
   */
  await signInWithPopup(auth, provider);
};
