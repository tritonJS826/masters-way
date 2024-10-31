import {TrashIcon} from "@radix-ui/react-icons";
import {Confirm} from "src/component/confirm/Confirm";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import styles from "src/component/trash/Trash.module.scss";

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
        trigger={<TrashIcon className={styles.icon} />}
        content={
          <p>
            {props.confirmContent}
          </p>
        }
        onOk={props.onOk}
        okText={props.okText}
        cancelText={props.cancelText}
      />
    </Tooltip>
  );
};
