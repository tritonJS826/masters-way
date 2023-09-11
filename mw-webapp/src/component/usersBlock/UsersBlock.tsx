import {useState, useEffect} from "react";
import {UserService} from "src/service/UserService";
import {User} from "src/model/firebaseCollection/User";
import {UserCard} from "src/component/usersBlock/userCard/UserCard";
import styles from "src/component/usersBlock/UsersBlock.module.scss";

export const UsersBlock = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    UserService.onValueFromRealTimeDb(setUsers);
    () => {
      //TODO
      // removeEventListener from db if needed (read about handling event listeners
      // in react use effect components (when and whyu you shoud remove them))
    };
  }, []);

  const renderUsers = () => {
    const userList = Object.values(users);
    return userList.map((user) => (
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