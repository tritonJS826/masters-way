import {useState} from "react";
import {User} from "firebase/auth";
import {Header} from "src/component/header/Header";
import {UserContext} from "src/component/header/HeaderContext";
import {Router} from "src/router/Router";

/**
 * App
 */
export const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
        <Header />
        <Router />
      </UserContext.Provider>
    </>
  );
};
