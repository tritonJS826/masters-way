import {ReactNode} from "react";
import clsx from "clsx";
import {PositionTooltip} from "src/component/tooltip/positionTooltip/PositionTooltip";
import styles from "src/component/tooltip/Tooltip.module.scss";

interface TooltipProps {
  /**
  * Tooltip's children (ReactNode)
  */
  children: ReactNode;
  /**
  * Tooltip's content (string | ReactNode)
  */
  content: string | ReactNode;
  /**
  * Tooltip's class-style (string)
  */
  className: string;
  /**
  * Tooltip's position relative cursor, optional (default - PositionTooltip.TOP)
  */
  position?: PositionTooltip;
}

export const Tooltip = (props: TooltipProps) => {
  const classes = clsx(styles.tooltip, styles[props.className], styles[props.position ?? PositionTooltip.TOOOLTIP_TOP]);

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
