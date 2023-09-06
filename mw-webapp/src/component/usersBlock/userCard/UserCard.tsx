import styles from "src/component/usersBlock/userCard/UserCard.module.scss";

interface UserCardProps {
  name: string;
  email: string;
}

export const UserCard = (props: UserCardProps) => {
  return (
    <li className={styles.container}>
      <div>
        {`Name: ${props.name}`}
      </div>
      <div>
        {`E-mail: ${props.email}`}
      </div>
    </li>
  );
};