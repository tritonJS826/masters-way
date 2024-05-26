import {Button, ButtonType} from "src/component/button/Button";
import {Icon, IconSize} from "src/component/icon/Icon";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import styles from "src/logic/wayPage/reportsTable/reportsColumns/summarySection/SummarySection.module.scss";

/**
 * SummarySection props
 */
interface SummarySectionProps {

  /**
   * Button's tooltip value
   */
  tooltipContent: string;

  /**
   * Tooltip's position
   */
  tooltipPosition: PositionTooltip;

  /**
   * Callback triggered on click button
   */
  onClick: () => Promise<void>;

  /**
   * If true -render button add element
   */
  isEditable: boolean;

  /**
   * Property for columns where need to calculate time summary
   */
  total?: string;
}

/**
 * Summary Section
 */
export const SummarySection = (props: SummarySectionProps) => {
  return (
    <div className={styles.summarySection}>
      {props.isEditable &&
      <Tooltip
        position={props.tooltipPosition}
        content={props.tooltipContent}
      >
        <Button
          value={
            <Icon
              size={IconSize.SMALL}
              name="PlusIcon"
            />
          }
          onClick={props.onClick}
          buttonType={ButtonType.ICON_BUTTON}
        />
      </Tooltip>
      }
      {props.total &&
      <div className={styles.summaryText}>
        {props.total}
      </div>
      }
    </div>
  );
};
