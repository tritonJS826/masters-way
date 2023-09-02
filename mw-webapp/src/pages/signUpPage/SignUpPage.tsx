import {useState} from "react";
import {Link} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

export const SignUpPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = getAuth();

  const handleSignUp = (mail: string, pass: string) => {
    event?.preventDefault();
    createUserWithEmailAndPassword(auth, mail, pass)
      .then(console.log)
      .catch(console.error);
  };

  return (
    <>
      <p>
        Already have an account?
        {" "}
        <Link to={"/sign-in"}>
          Sign in here
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
          onClick={() => handleSignUp(email, password)}
        >
          Sign Up
        </button>
      </form>
    </>
  );
};