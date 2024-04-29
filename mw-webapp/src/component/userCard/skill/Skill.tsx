import styles from "src/component/userCard/skill/Skill.module.scss";

/**
 * User card skill props
 */
interface SkillProps {

  /**
   * User's skill name
   */
  skillName: string;
}

/**
 * Skill component
 */
export const Skill = (props: SkillProps) => {
  return (
    <span className={styles.skill}>
      {props.skillName}
    </span>
  );
};

