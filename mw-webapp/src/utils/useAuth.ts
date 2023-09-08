import {GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult} from "firebase/auth";

export const useAuth = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect(auth, provider);
      const result = await getRedirectResult(auth);
      if (result) {
        const user = result.user;
        alert(`Hello, ${user}!`);
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
