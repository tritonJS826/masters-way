import {Button, ButtonType} from "src/component/button/Button";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Image} from "src/component/image/Image";
import {PrintedText} from "src/component/printedText/PrintedText";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/logic/staticPages/landingPages/mainBlock/MainBlock.module.scss";

/**
 * Main block props
 */
interface MainBlockProps {

  /**
   * Static part of main title
   */
  staticTitle: string;

  /**
   * Animated part of main title
   */
  animatedTitle: string;

  /**
   * Background image path
   */
  backgroundImagePath: string;

  /**
   * Background image alt text
   */
  backgroundImageAlt: string;

  /**
   * Description
   */
  description: string;

  /**
   * CTA button value
   */
  buttonValue: string;

  /**
   * Callback triggered on CTA button click
   */
  onCLick: () => void;

}

/**
 * Main block widget
 */
export const MainBlock = (props: MainBlockProps) => {
  return (
    <VerticalContainer className={styles.mainBlock}>
      <Image
        alt={props.backgroundImageAlt}
        src={props.backgroundImagePath}
        className={styles.image}
      />
      <VerticalContainer className={styles.titleBlock}>
        <h1 className={styles.title}>
          {props.staticTitle}

          <PrintedText text={props.animatedTitle} />
        </h1>
        <p className={styles.titleDescription}>
          {props.description}
        </p>
      </VerticalContainer>
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
        onClick={props.onCLick}
        className={styles.mainBlockButton}
      />
    </VerticalContainer>
  );
};
