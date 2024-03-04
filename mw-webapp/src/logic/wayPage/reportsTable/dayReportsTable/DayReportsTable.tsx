import {Columns} from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {ReportsTable} from "src/logic/wayPage/reportsTable/ReportsTable";
import {DayReport} from "src/model/businessModel/DayReport";
import {Way} from "src/model/businessModel/Way";

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
  return (
    <ReportsTable
      data={props.way.dayReports}
      columns={Columns({setDayReports: props.setDayReports, way: props.way})}
    />
  );
};
