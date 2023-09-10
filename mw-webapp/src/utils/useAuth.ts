import {GoogleAuthProvider, getAuth, signInWithRedirect} from "firebase/auth";
import {set, ref} from "firebase/database";
import {db} from "src/firebase";

export const useAuth = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const writeUserData = (userId: string, email: string | null) => {
    set(ref(db, "/users/" + userId), {
      uuid: userId,
      email: email,
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      // const result = await signInWithPopup(auth, provider);
      // writeUserData(result.user.uid, result.user.email);
      await signInWithRedirect(auth, provider);
      // useEffect(() => {
      //   const getCredentials = async () => {
      //     try {
      //       const userCredentials = await getRedirectResult(auth);
      //       console.log(userCredentials);
      //       if (userCredentials) {
      //         writeUserData(userCredentials.user.uid, userCredentials.user.email);
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
      // }, []);
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(errorMessage);
    }

  };
  return {handleGoogleSignIn, writeUserData, auth};
};
