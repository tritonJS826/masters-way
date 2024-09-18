import clsx from "clsx";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Image} from "src/component/image/Image";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/land/problemItem/ProblemItem.module.scss";

/**
 * ProblemItem props
 */
interface ProblemItemProps {

  /**
   * Title text
   */
  title: string;

  /**
   * Title description
   */
  description: string;

  /**
   * Image source
   */
  imageSrc: string;

  /**
   * Is block reversed
   * @default false
   */
  isReversed?: boolean;
}

/**
 * Problem item
 */
export const ProblemItem = (props: ProblemItemProps) => {
  return (
    <HorizontalContainer className={clsx(
      styles.problemItem,
      props.isReversed && styles.reversed,
    )}
    >
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
      <div className={styles.problemImageContainer}>
        <Image
          alt="problemImage"
          src={props.imageSrc}
          className={styles.problemImage}
        />
      </div>
    </HorizontalContainer>
  );
};
