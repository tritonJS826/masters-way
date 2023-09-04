import {GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult} from "firebase/auth";
import {secondaryApp} from "src/firebase";

export const useAuth = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(secondaryApp);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect(auth, provider);
      const result = await getRedirectResult(auth);
      if (result) {
        const user = result.user;
        console.log(user);
      }
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(errorMessage);
    }
  };
  return handleGoogleSignIn;
};

