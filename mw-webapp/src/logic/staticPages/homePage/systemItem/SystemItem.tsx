import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/logic/staticPages/homePage/systemItem/SystemItem.module.scss";

/**
 * System item props
 */
interface SystemItemProps {

  /**
   * Title text
   */
  title: string;

  /**
   * Title description
   */
  description: string;

  /**
   * Step's number
   */
  stepNumber: string;
}

/**
 * System item
 */
export const SystemItem = (props: SystemItemProps) => {
  return (
    <VerticalContainer className={styles.systemItem}>
      <div className={styles.numberWrapper}>
        {props.stepNumber}
      </div>
      <VerticalContainer className={styles.systemText}>
        <Title
          level={HeadingLevel.h3}
          text={props.title}
          className={styles.systemTitle}
          classNameHeading={styles.systemTitle}
          placeholder=""
        />
        <p className={styles.systemDescription}>
          {props.description}
        </p>
      </VerticalContainer>
    </VerticalContainer>
  );
};
