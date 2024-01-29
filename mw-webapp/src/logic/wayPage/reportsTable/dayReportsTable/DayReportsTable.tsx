import {Button, ButtonType} from "src/component/button/Button";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {useGlobalContext} from "src/GlobalContext";
import {Columns} from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {ReportsTable} from "src/logic/wayPage/reportsTable/ReportsTable";
import {DayReport} from "src/model/businessModel/DayReport";
import {Way} from "src/model/businessModel/Way";
import {DateUtils} from "src/utils/DateUtils";
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
  const {user} = useGlobalContext();
  const isOwner = user?.uuid === props.way.owner.uuid;
  const isEmptyWay = props.way.dayReports.length === 0;
  const currentDate = DateUtils.getShortISODateValue(new Date());
  const lastReportDate = !isEmptyWay && DateUtils.getShortISODateValue(props.way.dayReports[0].createdAt);
  const isReportForTodayAlreadyCreated = lastReportDate === currentDate;
  const isReportForTodayIsNotCreated = isEmptyWay || !isReportForTodayAlreadyCreated;
  const isPossibleCreateDayReport = isOwner && isReportForTodayIsNotCreated;

  /**
   * Create day report
   */
  const createDayReport = async (wayUuid: string, dayReportsData: DayReport[]) => {
    const dayReportUuids = dayReportsData.map((report) => report.uuid);
    const newDayReport = await DayReportDAL.createDayReport(wayUuid, dayReportUuids);
    const dayReportsList = [newDayReport, ...dayReportsData];
    props.setDayReports(dayReportsList);
  };

  return (
    <>
      {isPossibleCreateDayReport &&
      <Button
        value="Create new day report"
        onClick={() => createDayReport(props.way.uuid, props.way.dayReports)}
        buttonType={ButtonType.PRIMARY}
        className={styles.button}
      />
      }

      <ReportsTable
        data={props.way.dayReports}
        columns={Columns({setDayReports: props.setDayReports, way: props.way})}
      />
    </>
  );
};
