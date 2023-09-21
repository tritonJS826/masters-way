import {PropsWithChildren, ReactNode} from "react";
import clsx from "clsx";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import styles from "src/component/tooltip/Tooltip.module.scss";

interface TooltipProps {
  /**
  * Tooltip's content (text or JSX.Element)
  */
  content: string | ReactNode;
  /**
  * Tooltip's className, default ("default")
  */
  className?: string;
  /**
  * Tooltip's position default {@link PositionTooltip.TOP}
  */
  position?: PositionTooltip;
}

export const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = (props: PropsWithChildren<TooltipProps>) => {
  const styleTooltip = styles[props.className ?? "default"];
  const classes = clsx(styles.tooltip, styleTooltip, styles[props.position ?? PositionTooltip.TOP]);

  return (
    <div className={styles.wrapper}>
      <span className={styles.target}>
        {props.children}
      </span>
      <div className={classes}>
        {props.content}
      </div>
    </div>
  );
};
