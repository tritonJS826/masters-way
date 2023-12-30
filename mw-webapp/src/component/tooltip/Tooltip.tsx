import {PropsWithChildren, ReactElement, ReactNode} from "react";
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
  content: string | ReactNode | ReactElement;

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
      <div className={styles.target}>
        {props.children}
      </div>
      <div className={contentClassNames}>
        {props.content}
      </div>
    </div>
  );
};
