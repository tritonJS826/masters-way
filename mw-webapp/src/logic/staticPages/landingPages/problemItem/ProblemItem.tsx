import clsx from "clsx";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Image} from "src/component/image/Image";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/logic/staticPages/landingPages/problemItem/ProblemItem.module.scss";

/**
 * ProblemItem props
 */
export interface ProblemItemProps {

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

  /**
   * CTA button value
   */
  buttonValue?: string;

  /**
   * Callback triggered on CTA button click
   */
  onClick?: () => void;

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
        {props.buttonValue &&
        <Button
          buttonType={ButtonType.PRIMARY}
          value={props.buttonValue}
          icon={
            <Icon
              size={IconSize.SMALL}
              name="ArrowRightIcon"
              className={styles.icon}
            />
          }
          onClick={props.onClick ?? (() => { })}
          className={clsx(styles.button, props.isReversed && styles.buttonReversed)}
        />
        }
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
