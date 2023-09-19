import {ReactNode} from "react";
import styles from "src/component/tooltip/Tooltip.module.scss";

const enum PositionTooltip {
  TOP = "tooltip_top",
  LEFT = "tooltip_left",
  RIGHT = "tooltip_right",
  BOTTOM = "tooltip_bottom"
} // In my opinion, this should be a global one that controls the naming of props

const enum ClassesTooltip {
  MAIN = "main"
}
// In my opinion, this should be a global one that controls the naming of props

interface TooltipProps {
  children: ReactNode;
  content: string;
  styleComponent: ClassesTooltip;
  position?: PositionTooltip;
}

export const Tooltip = (props: TooltipProps) => {
  const positionTooltop = `${styles[props.position ? props.position : PositionTooltip.TOP]}`;
  const classes = `${styles.tooltip} ${styles[props.styleComponent]} ${positionTooltop}`;

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
