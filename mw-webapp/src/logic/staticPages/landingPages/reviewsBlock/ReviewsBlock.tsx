import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Slider, SliderItem} from "src/component/slider/Slider";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/logic/staticPages/landingPages/reviewsBlock/ReviewsBlock.module.scss";

/**
 * Reviews block props
 */
interface ReviewsBlockProps {

  /**
   * Title
   */
  title: string;

  /**
   * Description
   */
  description?: string;

  /**
   * Problems items
   */
  reviewItems: SliderItem[];

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
 * Reviews block widget
 */
export const ReviewsBlock = (props: ReviewsBlockProps) => {
  return (
    <VerticalContainer className={styles.reviewsBlock}>
      <Title
        classNameHeading={styles.title}
        level={HeadingLevel.h2}
        text={props.title}
        placeholder=""
      />

      <p className={styles.titleDescription}>
        {props.description}
      </p>

      <HorizontalContainer className={styles.reviewList}>
        <Slider
          sliderItems={props.reviewItems}
          settings={{pagination: false}}
        />
      </HorizontalContainer>
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
        className={styles.triesActionButton}
      />
    </VerticalContainer>
  );
};
