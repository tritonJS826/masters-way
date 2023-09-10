// import {User, onAuthStateChanged} from "firebase/auth";
// import {useEffect, useState} from "react";
import {User, onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "src/utils/useAuth";

export const AuthPage = () => {
  const {handleGoogleSignIn, writeUserData, auth} = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        writeUserData(currentUser.uid, currentUser.email);
        setUser(currentUser);
      }
    });
    return () => {
      unsubscribe();
    };
  });

  // useEffect(() => {
  //   const getCredentials = async () => {
  //     try {
  //       const userCredentials = await getRedirectResult(auth);
  //       console.log(userCredentials);
  //       if (userCredentials) {
  //         writeUserData(userCredentials.user.uid, userCredentials.user.email);
  //         setIsAuth(true);
  //       }
  //     } catch (error) {
  //       let errorMessage;
  //       if (error instanceof Error) {
  //         errorMessage = error.message;
  //       }
  //       alert(errorMessage);
  //     }
  //   };
  //   return () => {
  //     getCredentials();
  //   };
  // }, [isAuth]);

  return (
    <>
      {user ? navigate("/main") : (
        <>
          <button onClick={handleGoogleSignIn}>
            Sign in with Google
          </button>
          <Link to={"main"}>
            Workflow
          </Link>
        </>
      )}
    </>
  );
};
