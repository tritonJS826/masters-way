import {useState} from "react";
import {Button, ButtonType} from "src/component/button/Button";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {Columns} from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {ReportsTable} from "src/logic/wayPage/reportsTable/ReportsTable";
import {DayReport} from "src/model/businessModel/DayReport";
import {Way} from "src/model/businessModel/Way";
import styles from "src/logic/wayPage/reportsTable/dayReportsTable/DayReportsTable.module.scss";

/**
 * DayReportsTable props
 */
interface DayReportsTableProps {

  /**
   * Way of DayReports
   */
  way: Way;

  /**
   * Set day reports
   */
  setDayReports: (dayReportsList: DayReport[]) => void;
}

/**
 * Render table with dayReports of specific way
 *
 * TODO:  get rid statistics in this component,
 * move load logic to the parent component and share data with other components
 */
export const DayReportsTable = (props: DayReportsTableProps) => {
  const VISIBLE_REPORTS_CHUNK = 7;
  const [visibleReports, setVisibleReports] = useState(props.way.dayReports.slice(0, VISIBLE_REPORTS_CHUNK));

  /**
   * Show more reports for user
   */
  const showMoreReports = () => {
    setVisibleReports(props.way.dayReports.slice(0, visibleReports.length + VISIBLE_REPORTS_CHUNK));
  };

  const isShowMoreReportsButtonVisible = visibleReports.length < props.way.dayReports.length;

  return (
    <>
      <ScrollableBlock>
        <ReportsTable
          data={visibleReports}
          columns={Columns({setDayReports: props.setDayReports, way: props.way})}
        />
      </ScrollableBlock>
      {isShowMoreReportsButtonVisible &&
      <Button
        onClick={showMoreReports}
        value="Load more"
        buttonType={ButtonType.PRIMARY}
        className={styles.loadMoreButton}
      />
      }
    </>
  );
};
