import clsx from "clsx";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import styles from "src/logic/supportModal/supportModalContent/supportTopicsItem/SupportTopicsItem.module.scss";

/**
 * SupportTopicsItem props
 */
interface SupportTopicsItemProps {

  /**
   * Support topic's title
   */
  title: string;

  /**
   * Support topics item additional className
   */
  className?: string;

  /**
   * If item is active - true
   */
  isActive: boolean;

  /**
   * Callback triggered on click chat item
   */
  onClick?: () => void;
}

/**
 * SupportTopicsItem component
 */
export const SupportTopicsItem = (props: SupportTopicsItemProps) => {
  return (
    <HorizontalContainer
      onClick={props.onClick}
      className={clsx(styles.supportTopicsItem, props.isActive && styles.active, props.className)}
    >
      <div className={styles.topicText}>
        {props.title}
      </div>
      {props.isActive
        ? (
          <Icon
            name="ArrowRightIcon"
            size={IconSize.SMALL}
          />
        )
        : (
          <div className={styles.topicIconEmpty} />
        )
      }
    </HorizontalContainer>
  );
};
