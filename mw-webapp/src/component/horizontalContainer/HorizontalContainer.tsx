import {PropsWithChildren} from "react";
import clsx from "clsx";
import styles from "src/component/horizontalContainer/HorizontalContainer.module.scss";

/**
 * HorizontalContainer props
 */
interface HorizontalContainerProps {

  /**
   * Unique key of HorizontalContainer
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
export const HorizontalContainer = (props: PropsWithChildren<HorizontalContainerProps>) => {
  return (
    <div
      className={clsx(styles.horizontalContainer, props.className)}
      key={props.key}
    >
      {props.children}
    </div>
  );
};
