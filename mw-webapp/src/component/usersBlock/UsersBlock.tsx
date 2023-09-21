import {useEffect, useState} from "react";
import {UserCard} from "src/component/usersBlock/userCard/UserCard";
import {User} from "src/model/firebaseCollection/User";
import {UserService} from "src/service/UserService";
import styles from "src/component/usersBlock/UsersBlock.module.scss";

export const UsersBlock = () => {
  const [usersList, setUsersList] = useState<User[]>([]);

  useEffect(() => {
    UserService.onValueFromRealTimeDb(setUsersList);
    () => {
      //TODO
      // RemoveEventListener from db if needed (read about handling event listeners
      // In react use effect components (when and whyu you shoud remove them))
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