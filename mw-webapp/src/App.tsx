import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {User} from "firebase/auth";
import {Header} from "src/component/header/Header";
import {UserContext} from "src/component/header/UserContext";
import {useErrorHandler} from "src/hooks/useErrorHandler";
import {pages} from "src/router/pages";
import {Router} from "src/router/Router";
import {handleUserAuthState} from "src/service/auth/handleUserAuthState";

/**
 * App
 */
export const App = () => {
  useErrorHandler();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    handleUserAuthState(setUser);
  }, []);

  useEffect(() => {
    if (user) {
      navigate(pages.user.getPath({uuid: user?.uid}));
    }
  }, [user]);

  return (
    <>
      <UserContext.Provider value={{user}}>
        <Header />
        <Router />
      </UserContext.Provider>
    </>
  );
};
