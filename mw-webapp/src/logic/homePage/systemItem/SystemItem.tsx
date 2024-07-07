import {Icon, IconSize} from "src/component/icon/Icon";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/logic/homePage/systemItem/SystemItem.module.scss";

/**
 * System item props
 */
interface SystemItemProps {

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
 * System item
 */
export const SystemItem = (props: SystemItemProps) => {
  return (
    <VerticalContainer className={styles.systemItem}>
      <Icon
        name="WayIcon"
        size={IconSize.MEDIUM}
        className={styles.icon}
      />
      <Title
        level={HeadingLevel.h3}
        text={props.title}
        className={styles.title}
        classNameHeading={styles.title}
        placeholder=""
      />
      <p className={styles.description}>
        {props.description}
      </p>
    </VerticalContainer>
  );
};
