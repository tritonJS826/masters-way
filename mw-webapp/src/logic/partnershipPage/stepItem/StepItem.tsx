import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HeadingLevel, Title} from "src/component/title/Title";
import styles from "src/logic/partnershipPage/stepItem/StepItem.module.scss";

/**
 * StepItem props
 */
interface StepItemProps {

  /**
   * Step's title
   */
  title: string;

  /**
   * Step's number
   */
  stepNumber: string;
}

/**
 * Step item
 */
export const StepItem = (props: StepItemProps) => {
  return (
    <HorizontalContainer className={styles.problemItem}>
      <div className={styles.number}>
        {props.stepNumber}
      </div>
      <Title
        className={styles.problemContentBlock}
        level={HeadingLevel.h3}
        text={props.title}
        placeholder=""
      />
    </HorizontalContainer>
  );
};
