import {Link} from "react-router-dom";

export const SignUpPage = () => {
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
          Sign Up
        </button>
      </form>
    </>
  );
};