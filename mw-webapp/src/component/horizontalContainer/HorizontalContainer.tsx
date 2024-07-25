import {PropsWithChildren} from "react";
import clsx from "clsx";
import styles from "src/component/horizontalContainer/HorizontalContainer.module.scss";

/**
 * HorizontalContainer props
 */
interface HorizontalContainerProps {

  /**
   * Additional custom class name
   */
  className?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

  /**
   * Callback triggered on div click
   */
  onClick?: () => void;
}

/**
 * HorizontalContainer
 */
export const HorizontalContainer = (props: PropsWithChildren<HorizontalContainerProps>) => {
  return (
    <div
      className={clsx(styles.horizontalContainer, props.className)}
      data-cy={props.dataCy}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};
