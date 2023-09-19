import {ReactNode, useState} from "react";
import styles from "src/component/tooltip/Tooltip.module.scss";

const enum PositionTooltip {
  TOP = "top",
  LEFT = "left",
  RIGHT = "right",
  BOTTOM = "bottom"
} // In my opinion, this should be a global one that controls the naming of props

const enum ClassesTooltip {
  MAIN = "main"
} // In my opinion, this should be a global one that controls the naming of props

interface TooltipProps {
  children: ReactNode;
  content: string;
  styleComponent: ClassesTooltip;
  position?: PositionTooltip;
}

export const Tooltip = (props: TooltipProps) => {
  const [isVisible, setVisible] = useState(false);
  const positionTooltop = `${styles[props?.position ? props.position : PositionTooltip.TOP]}`;
  const classes = `${styles[props.styleComponent]} ${styles[positionTooltop]}`; // I recomended use package 'clsx'

  return (
    <div className={styles.wrapper}>
      {
        isVisible && <span className={classes}>
          {props.content}
        </span>
      }
      <span className={styles.target}
        onMouseEnter={() => setVisible(!isVisible)}
        onMouseLeave={() => setVisible(!isVisible)}
      >
        {props.children}
      </span>
    </div>
  );
};
