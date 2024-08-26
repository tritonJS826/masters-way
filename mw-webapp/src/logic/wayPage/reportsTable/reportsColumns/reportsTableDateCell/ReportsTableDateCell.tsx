import {dayReportsAccessIds} from "cypress/accessIds/dayReportsAccessIds";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {DateUtils} from "src/utils/DateUtils";
import styles from "src/logic/wayPage/reportsTable/reportsColumns/reportsTableDateCell/ReportsTableDateCell.module.scss";

/**
 * Reports table date cell props
 */
interface ReportsTableDateCellProps {

  /**
   * Date when day report was created
   */
  date: Date;
}

/**
 * Cell with createdAt Date in reports table
 */
export const ReportsTableDateCell = (props: ReportsTableDateCellProps) => {
  return (
    <VerticalContainer
      className={styles.dateCell}
      dataCy={dayReportsAccessIds.dayReportsContent.reportDate}
    >
      {DateUtils.getShortISODateValue(props.date)}
    </VerticalContainer>
  );
};
