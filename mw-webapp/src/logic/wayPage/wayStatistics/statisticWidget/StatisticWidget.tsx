import {PropsWithChildren} from "react";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/logic/wayPage/wayStatistics/statisticWidget/StatisticWidget.module.scss";

/**
 * StatisticLabels props
 */
interface StatisticLabelsProps {

  /**
   * StatisticLabels title
   */
  title?: string;

  /**
   *If isEditable - user can hide or show widget in main statisticBlock
   * @default false
   */
  isEditable?: boolean;

}

/**
 * StatisticBlock component
 */
export const StatisticWidget = (props: PropsWithChildren<StatisticLabelsProps>) => {
  return (
    <VerticalContainer className={styles.statisticBlock}>
      <HorizontalContainer className={styles.titleCheckbox}>
        {props.title &&
        <Title
          level={HeadingLevel.h4}
          text={props.title}
          placeholder=""
        />
        }
        {props.isEditable &&
        <Checkbox onChange={() => {}} />
        }
      </HorizontalContainer>
      {props.children}
    </VerticalContainer>
  );
};
