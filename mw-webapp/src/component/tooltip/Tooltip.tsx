import {PropsWithChildren, ReactElement, ReactNode} from "react";
import * as TooltipElem from "@radix-ui/react-tooltip";
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
   * @default: {@link PositionTooltip.TOP}
   */
  position?: PositionTooltip;

  /**
   * If true - tooltip is not visible
   * @default false
   */
  isInactive?: boolean;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * Tooltip component
 */
export const Tooltip = (props: PropsWithChildren<TooltipProps>) => {
  return (
    <TooltipElem.Provider>
      <TooltipElem.Root>
        <TooltipElem.Trigger asChild>
          <button className={styles.tooltipTrigger}>
            {props.children}
          </button>
        </TooltipElem.Trigger>
        <TooltipElem.Portal>
          {!props.isInactive &&
          <TooltipElem.Content
            className={clsx(styles.tooltipContent, props.className)}
            side={props.position ?? "top"}
            sideOffset={5}
            data-cy={props.dataCy}
          >
            {props.content}
            <TooltipElem.Arrow className={styles.tooltipArrow} />
          </TooltipElem.Content>
          }
        </TooltipElem.Portal>
      </TooltipElem.Root>
    </TooltipElem.Provider>
  );
};
