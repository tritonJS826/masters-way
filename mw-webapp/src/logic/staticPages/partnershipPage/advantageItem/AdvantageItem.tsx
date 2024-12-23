import clsx from "clsx";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/logic/staticPages/partnershipPage/advantageItem/AdvantageItem.module.scss";

/**
 * AdvantageItem props
 */
interface AdvantageItemProps {

  /**
   * Title text
   */
  title: string;

  /**
   * Title description
   */
  description: string;

  /**
   * Is block reversed
   * @default false
   */
  isReversed?: boolean;

  /**
   * Step's number
   */
  stepNumber: string;
}

/**
 * Advantage item
 */
export const AdvantageItem = (props: AdvantageItemProps) => {
  return (
    <HorizontalContainer className={clsx(
      styles.problemItem,
      props.isReversed && styles.reversed,
    )}
    >
      <div className={styles.number}>
        {props.stepNumber}
      </div>
      <VerticalContainer className={clsx(
        styles.problemContentBlock,
        props.isReversed && styles.problemContentBlockReversed,
      )}
      >
        <Title
          className={styles.problemTitle}
          level={HeadingLevel.h2}
          text={props.title}
          placeholder=""
        />
        <p className={styles.problemTitleDescription}>
          {props.description}
        </p>
      </VerticalContainer>

    </HorizontalContainer>
  );
};
