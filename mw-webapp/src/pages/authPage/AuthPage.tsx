import {getAuth, getRedirectResult, signInWithRedirect, GoogleAuthProvider} from "firebase/auth";

export const AuthPage = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

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
      console.error(errorMessage);
    }
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
};
