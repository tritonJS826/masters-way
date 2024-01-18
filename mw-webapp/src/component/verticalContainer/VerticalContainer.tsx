import {PropsWithChildren} from "react";
import clsx from "clsx";
import styles from "src/component/verticalContainer/VerticalContainer.module.scss";

/**
 * VerticalContainer props
 */
interface VerticalContainerProps {

  /**
   * Additional custom class name
   */
  className?: string;
}

/**
 * VerticalContainer
 */
export const VerticalContainer = (props: PropsWithChildren<VerticalContainerProps>) => {
  return (
    <div className={clsx(styles.verticalContainer, props.className)}>
      {props.children}
    </div>
  );
};
