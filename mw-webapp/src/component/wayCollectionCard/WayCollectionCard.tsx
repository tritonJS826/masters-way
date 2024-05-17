import clsx from "clsx";
import {Button} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {Language} from "src/globalStore/LanguageStore";
import {LanguageService} from "src/service/LanguageService";
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
   * Actual language
   */
  language: Language;

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
    <Button
      dataCy={props.dataCy}
      onClick={props.onClick}
      className={styles.wayCollectionCardButton}
      value={
        <VerticalContainer className={styles.wayCollectionCardContainer}>
          <VerticalContainer className={clsx(styles.mainInfo, props.isActive && styles.active)}>
            <Title
              level={HeadingLevel.h3}
              text={props.collectionTitle}
              className={styles.title}
            />
          </VerticalContainer>
          <HorizontalContainer className={styles.additionalInfo}>
            {`${LanguageService.user.collections.ways[props.language]} ${props.collectionWaysAmount}`}
          </HorizontalContainer>
        </VerticalContainer>
      }
    />
  );
};

