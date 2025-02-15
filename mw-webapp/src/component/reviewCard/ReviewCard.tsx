import {Avatar, AvatarSize} from "src/component/avatar/Avatar";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/component/reviewCard/ReviewCard.module.scss";

/**
 * ReviewCard props
 */
interface ReviewCardProps {

  /**
   * Amount of stars of our app
   */
  gradeAmount: number;

  /**
   * Review from user
   */
  review: string;

  /**
   * Reviewer name
   */
  reviewerName: string;

  /**
   * Reviewer profession
   */
  reviewerProfession: string;

  /**
   * Reviewer image url
   */
  reviewerImageUrl: string;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

}

/**
 * ReviewCard component
 */
export const ReviewCard = (props: ReviewCardProps) => {

  const gradeAmountArray = [...Array(props.gradeAmount).keys()].map(i => i++);

  return (
    <VerticalContainer
      className={styles.reviewCard}
      dataCy={props.dataCy}
    >
      <VerticalContainer className={styles.gradeAndReview}>
        <HorizontalContainer className={styles.gradeBlock}>
          {gradeAmountArray.map((gradeItem) => (
            <Icon
              name="StarIcon"
              size={IconSize.MEDIUM}
              key={gradeItem}
              className={styles.gradeItem}
            />
          ))}
        </HorizontalContainer>
        <p className={styles.review}>
          {props.review}
        </p>
      </VerticalContainer>
      <VerticalContainer className={styles.reviewerBlock}>
        <Avatar
          alt={`Reviewer ${props.reviewerName}`}
          src={props.reviewerImageUrl}
          size={AvatarSize.BIG}
        />
        {`${props.reviewerName}, ${props.reviewerProfession}`}
      </VerticalContainer>
    </VerticalContainer>
  );
};
