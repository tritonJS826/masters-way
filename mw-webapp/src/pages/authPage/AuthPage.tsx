import {getAuth, getRedirectResult, signInWithRedirect, GoogleAuthProvider} from "firebase/auth";
import {Link} from "react-router-dom";
import {secondaryApp} from "src/firebase";

export const AuthPage = () => {
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
      console.error(errorMessage);
    }
  };

  return (
    <>
      <button onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
      <Link to={"main"}>
        Workflow
      </Link>
    </>
  );
};
