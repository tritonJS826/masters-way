import {AdvantageItem, AdvantageItemProps} from "src/component/advantageItem/AdvantageItem";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/logic/staticPages/landingPages/advantagesBlock/AdvantagesBlock.module.scss";

/**
 * Advantages block props
 */
interface AdvantagesBlockProps {

  /**
   * Title
   */
  title: string;

  /**
   * Description
   */
  description?: string;

  /**
   * Advantage items
   */
  advantageItems: AdvantageItemProps[];

}

/**
 * Advantages block widget
 */
export const AdvantagesBlock = (props: AdvantagesBlockProps) => {
  return (
    <VerticalContainer className={styles.advantagesBlock}>
      <Title
        classNameHeading={styles.title}
        level={HeadingLevel.h2}
        text={props.title}
        placeholder=""
      />

      <p className={styles.titleDescription}>
        {props.description}
      </p>
      <HorizontalContainer className={styles.advantages}>
        {props.advantageItems.map((advantageItem) => (
          <AdvantageItem
            key={advantageItem.title}
            iconName={advantageItem.iconName}
            title={advantageItem.title}
            description={advantageItem.description}
          />
        ))}
      </HorizontalContainer>
    </VerticalContainer>
  );
};
