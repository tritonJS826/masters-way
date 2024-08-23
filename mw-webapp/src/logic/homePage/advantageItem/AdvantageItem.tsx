import {Icon, IconSize} from "src/component/icon/Icon";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/logic/homePage/advantageItem/AdvantageItem.module.scss";

/**
 * Advantage item props
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
}

/**
 * Advantage item
 */
export const AdvantageItem = (props: AdvantageItemProps) => {
  return (
    <VerticalContainer className={styles.goalItem}>
      <Icon
        name="WayIcon"
        size={IconSize.MEDIUM}
      />
      <Title
        level={HeadingLevel.h3}
        text={props.title}
        className={styles.goalTitle}
        classNameHeading={styles.goalTitle}
        placeholder=""
      />
      <p className={styles.goalDescription}>
        {props.description}
      </p>
    </VerticalContainer>
  );
};
