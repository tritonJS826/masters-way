import {useEffect, useState} from "react";
import {UserCard} from "src/component/usersBlock/userCard/UserCard";
import {UserDTO} from "src/model/firebaseCollection/UserDTO";
import {UserService} from "src/service/UserService";
import styles from "src/component/usersBlock/UsersBlock.module.scss";

export const UsersBlock = () => {
  const [usersList, setUsersList] = useState<UserDTO[]>([]);

  const setUsersValue = async () => {
    setUsersList(await UserService.getUsers());
  };

  useEffect(() => {
    setUsersValue();
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