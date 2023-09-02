import {useState} from "react";
import {Link} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

export const SignInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = getAuth();

  const handleSignIn = (mail: string, pass: string) => {
    event?.preventDefault();
    signInWithEmailAndPassword(auth, mail, pass)
      .then(console.log)
      .catch(console.error);
  };


  return (
    <>
      <p>
        Don&#39;t have an account yet?
        {" "}
        <Link to={"/sign-up"}>
          Sign up here
        </Link>
      </p>
      <form>
        <label htmlFor="email">
          Email:
          {" "}
          <input type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
        </label>
        <label htmlFor="password">
          Password:
          {" "}
          <input type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="password"
          />
        </label>
        <button type="submit"
          onClick={() => handleSignIn(email, password)}
        >
          Sign In
        </button>
      </form>
    </>
  );
};