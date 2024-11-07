import {PropsWithChildren} from "react";
import clsx from "clsx";
import styles from "src/component/scrollableBlock/ScrollableBlock.module.scss";

/**
 * ScrollableBlock props
 */
interface ScrollableBlockProps {

  /**
   * Width of block
   */
  width?: string;

  /**
   * Height of block
   */
  height?: string;

  /**
   * Additional custom class name
   */
  className?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * ScrollableBlock
 */
export const ScrollableBlock = (props: PropsWithChildren<ScrollableBlockProps>) => {
  return (
    <div
      style={{width: props.width, height: props.height}}
      className={clsx(styles.scrollableBlock, props.className)}
      data-cy={props.dataCy}
    >
      {props.children}
    </div>
  );
};
