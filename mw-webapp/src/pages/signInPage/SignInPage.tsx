import {Link} from "react-router-dom";

export const SignInPage = () => {
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
        <label htmlFor="">
          <input type="email"
            name=""
            id=""
          />
        </label>
        <label htmlFor="">
          <input type="password"
            name=""
            id=""
          />
        </label>
        <button type="submit">
          Sign In
        </button>
      </form>
    </>
  );
};