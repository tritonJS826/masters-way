import {TrashIcon} from "@radix-ui/react-icons";
import {Confirm} from "src/component/confirm/Confirm";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import styles from "src/component/trash/Trash.module.scss";

/**
 * Data attributes for cypress testing
 */
interface Cy {

  /**
   * Data attribute for cypress testing
   */
  dataCyIcon?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyOk?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyCancel?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyContent?: string;

}

/**
 * Trash props
 */
interface TrashProps {

  /**
   * Tooltip content
   */
  tooltipContent: string;

  /**
   * Tooltip's position
   */
  tooltipPosition: PositionTooltip;

  /**
   * Confirm content
   */
  confirmContent: string | JSX.Element;

  /**
   * Callback triggered on click Ok button
   */
  onOk: () => void;

  /**
   * Ok button's value
   */
  okText: string;

  /**
   * Cancel button's value
   */
  cancelText: string;

  /**
   * Data attribute for cypress testing
   */
  cy?: Cy;

}

/**
 * Trash component
 */
export const Trash = (props: TrashProps) => {
  return (
    <Tooltip
      content={props.tooltipContent}
      position={props.tooltipPosition}
    >
      <Confirm
        trigger={
          <TrashIcon
            className={styles.icon}
            data-cy={props.cy?.dataCyIcon}
          />
        }
        content={
          <p>
            {props.confirmContent}
          </p>
        }
        onOk={props.onOk}
        okText={props.okText}
        cancelText={props.cancelText}
        cy={{
          onOk: props.cy?.dataCyOk,
          onEnter: props.cy?.dataCyContent,
        }}
      />
    </Tooltip>
  );
};
