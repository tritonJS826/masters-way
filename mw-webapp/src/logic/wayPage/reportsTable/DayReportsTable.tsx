import {useEffect, useState} from "react";
import {Button} from "src/component/button/Button";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {useGlobalContext} from "src/GlobalContext";
import {ReportsTable} from "src/logic/wayPage/reportsTable/ReportsTable";
import {Columns} from "src/logic/wayPage/reportsTable/WayColumns";
import {DayReport} from "src/model/businessModel/DayReport";
import {Way} from "src/model/businessModel/Way";
import {DateUtils} from "src/utils/DateUtils";
import {UnicodeSymbols} from "src/utils/UnicodeSymbols";

/**
 * DayReportsTable props
 */
interface DayReportsTableProps {

  /**
   * Way of DayReports
   */
  way: Way;
}

/**
 * Render table with dayReports of specific way
 *
 * TODO:  get rid statistics in this component,
 * move load logic to the parent component and share data with other components
 */
export const DayReportsTable = (props: DayReportsTableProps) => {
  const [dayReports, setDayReports] = useState<DayReport[]>([]);
  const way = props.way;
  const {user} = useGlobalContext();
  const isOwner = user?.uuid === way.owner.uuid;
  const isEmptyWay = dayReports.length === 0;
  const currentDate = DateUtils.getShortISODateValue(new Date());
  const lastReportDate = !isEmptyWay && DateUtils.getShortISODateValue(dayReports[0].createdAt);
  const isReportForTodayAlreadyCreated = lastReportDate === currentDate;
  const isReportForTodayIsNotCreated = isEmptyWay || !isReportForTodayAlreadyCreated;
  const isPossibleCreateDayReport = isOwner && isReportForTodayIsNotCreated;

  useEffect(() => {
    setDayReports(way.dayReports);
  }, []);

  /**
   * Create day report
   */
  const createDayReport = async(wayUuid: string, dayReportsData: DayReport[]) => {
    const newDayReport = await DayReportDAL.createDayReport(wayUuid);
    const dayReportsList = [ newDayReport, ...dayReportsData];
    setDayReports(dayReportsList);
  };

  return (
    <>
      {isPossibleCreateDayReport &&
        <Tooltip content="Create new day report">
          <Button
            value={UnicodeSymbols.PLUS}
            onClick={() => createDayReport(way.uuid, dayReports)}
          />
        </Tooltip>
      }

      <ReportsTable
        data={dayReports}
        columns={Columns({dayReports, setDayReports, way})}
      />
    </>
  );
};
