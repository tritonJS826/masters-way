import {Icon, IconDictionary, IconSize} from "src/component/icon/Icon";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/component/advantageItem/AdvantageItem.module.scss";

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

  /**
   * Icon name
   */
  iconName: keyof typeof IconDictionary;

}

/**
 * Advantage item
 */
export const AdvantageItem = (props: AdvantageItemProps) => {
  return (
    <VerticalContainer className={styles.advantageItem}>
      <div className={styles.iconWrapper}>
        <Icon
          name={props.iconName}
          size={IconSize.BIG}
          className={styles.icon}
        />
      </div>
      <Title
        level={HeadingLevel.h3}
        text={props.title}
        className={styles.advantageTitle}
        classNameHeading={styles.advantageTitle}
        placeholder=""
      />
      <p className={styles.advantageDescription}>
        {props.description}
      </p>
    </VerticalContainer>
  );
};
