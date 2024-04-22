import styles from "src/component/userCard/userTag/UserTag.module.scss";

/**
 * User card skill props
 */
interface UserCardSkillProps {

  /**
   * User's tag name
   */
  tagName: string;
}

/**
 * UserCard tag component
 */
export const UserСardTag = (props: UserCardSkillProps) => {
  return (
    <span className={styles.userTag}>
      {props.tagName}
    </span>
  );
};

