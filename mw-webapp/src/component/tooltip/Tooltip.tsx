import {PropsWithChildren, ReactNode} from "react";
import clsx from "clsx";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import styles from "src/component/tooltip/Tooltip.module.scss";

/**
 * Tooltip props
 */
interface TooltipProps {

  /**
   * Tooltip's content
   */
  content: string | ReactNode;

  /**
   * Additional custom class name for the component
   */
  className?: string;

  /**
   * Tooltip's position
   * default: {@link PositionTooltip.TOP}
   */
  position?: PositionTooltip;
}

/**
 * Tooltip component
 */
export const Tooltip = (props: PropsWithChildren<TooltipProps>) => {
  const contentClassNames = clsx(
    styles.tooltip,
    props.className && styles[props.className],
    styles[props.position ?? PositionTooltip.TOP],
  );

  return (
    <div className={styles.wrapper}>
      <span className={styles.target}>
        {props.children}
      </span>
      <div className={contentClassNames}>
        {props.content}
      </div>
    </div>
  );
};
