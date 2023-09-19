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

export const Tooltip = ({children, content, styleComponent, position = PositionTooltip.TOP}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const classes = `${styles[styleComponent]} ${styles[position]}`; // I recomended use package 'clsx'

  return (
    <div className={styles.wrapper}>
      {
        visible && <span className={classes}>
          {content}
        </span>
      }
      <span className={styles.target}
        onMouseEnter={() => setVisible(!visible)}
        onMouseLeave={() => setVisible(!visible)}
      >
        {children}
      </span>
    </div>
  );
};
