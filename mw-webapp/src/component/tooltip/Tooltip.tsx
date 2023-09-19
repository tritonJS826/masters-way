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
  * Tooltip's content (text)
  */
  content: string;
  /**
  * Tooltip's class-style (selector css)
  */
  styleComponent: string;
  /**
  * Tooltip's position relative cursor (look enum PositionTooltip, optional, default - positon top)
  */
  position?: PositionTooltip;
}

export const Tooltip = (props: TooltipProps) => {
  const classes = clsx(styles.tooltip, styles[props.styleComponent], styles[props.position ?? PositionTooltip.TOOOLTIP_TOP]);

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
