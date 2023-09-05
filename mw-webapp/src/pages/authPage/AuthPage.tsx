import {Link} from "react-router-dom";
import {useAuth} from "src/utils/useAuth";

export const AuthPage = () => {
  const handleGoogleSignIn = useAuth();

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
