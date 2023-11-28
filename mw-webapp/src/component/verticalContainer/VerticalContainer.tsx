import {PropsWithChildren} from "react";
import clsx from "clsx";
import styles from "src/component/verticalContainer/VerticalContainer.module.scss";

/**
 * VerticalContainer props
 */
interface VerticalContainerProps {

  /**
   * Unique key of VerticalContainer
   */
  key?: string;

  /**
   * Additional custom class name
   */
  className?: string;
}

/**
 * HorizontalContainer
 */
export const VerticalContainer = (props: PropsWithChildren<VerticalContainerProps>) => {
  return (
    <div
      className={clsx(styles.verticalContainer, props.className)}
      key={props.key}
    >
      {props.children}
    </div>
  );
};