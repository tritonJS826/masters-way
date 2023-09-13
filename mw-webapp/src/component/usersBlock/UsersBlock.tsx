import {useState, useEffect} from "react";
import {UserService} from "src/service/UserService";
import {User} from "src/model/firebaseCollection/User";
import {UserCard} from "src/component/usersBlock/userCard/UserCard";
import styles from "src/component/usersBlock/UsersBlock.module.scss";

const usersListRaw = await UserService.getValueFromRealTimeDb();

export const UsersBlock = () => {
  const [usersList, setUsersList] = useState<User[]>([]);

  useEffect(() => {
    //TODO use onValue method instead of get if possible
    // UserService.onValueFromRealTimeDb(setUsersList);
    setUsersList(usersListRaw);
    () => {
      //TODO
      // removeEventListener from db if needed (read about handling event listeners
      // in react use effect components (when and whyu you shoud remove them))
    };
  }, []);

  const renderUsers = () => {
    const users = Object.values(usersList);
    return users.map((user) => (
      <UserCard key={user.uuid}
        name={user.name}
        email={user.email}
      />
    ),
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Users:
      </h2>
      <ul>
        {renderUsers()}
      </ul>
    </div>
  );
};