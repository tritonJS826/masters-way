import clsx from "clsx";
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
   * Callback triggered on click chat item
   */
  onClick?: () => void;
}

/**
 * SupportTopicsItem component
 */
export const SupportTopicsItem = (props: SupportTopicsItemProps) => {
  return (
    <div
      onClick={props.onClick}
      className={clsx(styles.supportTopicsItem, props.className)}
    >
      {props.title}
    </div>
  );
};
