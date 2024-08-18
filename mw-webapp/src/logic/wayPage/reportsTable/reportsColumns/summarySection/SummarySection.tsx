import {useState} from "react";
import {Button, ButtonType} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {Confirm} from "src/component/confirm/Confirm";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {DayReportCompositionParticipant} from "src/model/businessModel/DayReportCompositionParticipants";
import styles from "src/logic/wayPage/reportsTable/reportsColumns/summarySection/SummarySection.module.scss";

const SINGLE_PARTICIPANT_AMOUNT = 1;

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
  onClick: (chosenWay: DayReportCompositionParticipant) => Promise<void>;

  /**
   * If true -render button add element
   */
  isEditable: boolean;

  /**
   * Property for columns where need to calculate time summary
   */
  total?: string;

  /**
   * Composition participants
   */
  compositionParticipants: DayReportCompositionParticipant[];

  /**
   * Way ID
   */
  wayId: string;

}

/**
 * Summary Section
 */
export const SummarySection = (props: SummarySectionProps) => {
  const [chosenWays, setChosenWays] = useState<DayReportCompositionParticipant[]>([]);

  return (
    <div className={styles.summarySection}>
      {props.isEditable &&
      <Tooltip
        position={props.tooltipPosition}
        content={props.tooltipContent}
      >
        {props.compositionParticipants.length === SINGLE_PARTICIPANT_AMOUNT
            && props.compositionParticipants[0].wayId === props.wayId ?
          (
            <Button
              value={
                <Icon
                  size={IconSize.SMALL}
                  name="PlusIcon"
                />
              }
              onClick={() => props.onClick(props.compositionParticipants[0])}
              buttonType={ButtonType.ICON_BUTTON}
            />)
          : (
            <Confirm
              trigger={
                <Button
                  value={
                    <Icon
                      size={IconSize.SMALL}
                      name="PlusIcon"
                    />
                  }
                  onClick={() => { }}
                  buttonType={ButtonType.ICON_BUTTON}
                />
              }
              okText="Ok"
              cancelText="Cancel"
              onOk={() => chosenWays.map((chosenWay) => props.onClick(chosenWay))
              }
              content={
                <VerticalContainer>
                  Choose the way where you can send job?

                  {props.compositionParticipants.map((item) => {
                    return (
                      <HorizontalContainer key={item.wayId}>
                        <Checkbox onChange={(isChosenWay) => isChosenWay
                          ? setChosenWays([...chosenWays, item])
                          : setChosenWays(chosenWays.filter((chosenWay) => chosenWay.wayId !== item.wayId))
                        }
                        />
                        <div>
                          {item.wayName}
                        </div>
                      </HorizontalContainer>
                    );
                  })
                  }
                </VerticalContainer>
              }
            />
          )
        }
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
