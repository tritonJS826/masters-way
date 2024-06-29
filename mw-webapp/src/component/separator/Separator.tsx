import clsx from "clsx";
import styles from "src/component/separator/Separator.module.scss";

/**
 * Separator props
 */
interface SeparatorProps {

  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Separator component
 */
export const Separator = (props: SeparatorProps) => {
  return (
    <hr className={clsx(styles.separator, props.className)} />
  );
};
