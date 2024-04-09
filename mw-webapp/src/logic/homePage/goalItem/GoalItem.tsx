import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/logic/homePage/goalItem/GoalItem.module.scss";

/**
 * Goal item props
 */
interface GoalItemProps {

  /**
   * Title text
   */
  title: string;

  /**
   * Title description
   */
  description: string;
}

/**
 * Goal item
 */
export const GoalItem = (props: GoalItemProps) => {
  return (
    <VerticalContainer className={styles.goalItem}>
      <Title
        level={HeadingLevel.h3}
        text={props.title}
        className={styles.goalTitle}
      />
      <p className={styles.goalDescription}>
        {props.description}
      </p>
    </VerticalContainer>
  );
};
