import {PropsWithChildren} from "react";
import clsx from "clsx";
import styles from "src/component/horizontalGridContainer/HorizontalGridContainer.module.scss";

/**
 * HorizontalGridContainer props
 */
interface HorizontalGridContainerProps {

  /**
   * Additional custom class name
   */
  className?: string;
}

/**
 * Horizontal Container based on css grid
 */
export const HorizontalGridContainer = (props: PropsWithChildren<HorizontalGridContainerProps>) => {
  return (
    <div className={clsx(styles.horizontalGridContainer, props.className)}>
      {props.children}
    </div>
  );
};
