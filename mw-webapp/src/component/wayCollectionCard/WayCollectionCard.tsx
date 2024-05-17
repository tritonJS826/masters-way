import clsx from "clsx";
import {Button} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/component/wayCollectionCard/WayCollectionCard.module.scss";

/**
 * WayCollection props
 */
interface WayCollectionProps {

  /**
   * Show is wayCollection render ways in the ways table
   */
  isActive: boolean;

  /**
   * Collection title
   */
  collectionTitle: string;

  /**
   * Collection ways amount
   */
  collectionWaysAmount: number;

  /**
   * Callback triggered on WayCollection click
   */
  onClick: () => void;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * WayCollectionCard component
 */
export const WayCollectionCard = (props: WayCollectionProps) => {
  return (
    <HorizontalContainer
      className={styles.wayCollectionCardContainer}
      dataCy={props.dataCy}
    >
      <Button
        onClick={props.onClick}
        className={styles.wayCollectionCardButton}
        value={
          <VerticalContainer>
            <VerticalContainer className={clsx(styles.mainInfo, props.isActive && styles.active)}>
              <Title
                level={HeadingLevel.h3}
                text={props.collectionTitle}
                className={styles.title}
              />
            </VerticalContainer>
            <HorizontalContainer className={styles.additionalInfo}>
              {props.collectionWaysAmount}
            </HorizontalContainer>
          </VerticalContainer>
        }
      />
    </HorizontalContainer>

  );
};

