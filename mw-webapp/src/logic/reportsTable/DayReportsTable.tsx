import {useEffect, useState} from "react";
import {Button} from "src/component/button/Button";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {columns} from "src/logic/reportsTable/columns";
import {ReportsTable} from "src/logic/reportsTable/ReportsTable";
import {DayReportsContext} from "src/logic/reportsTable/reportTableContext";
import {DayReport} from "src/model/businessModel/DayReport";

/**
 * DayReportsTable props
 */
interface DayReportsTableProps {

  /**
   * Way's uuid
   */
  wayUuid: string;
}

/**
 * Render table with dayReports of specific way
 */
export const DayReportsTable = (props: DayReportsTableProps) => {
  const [dayReports, setDayReports] = useState<DayReport[]>([]);

  /**
   * Gets all day reports
   */
  const loadDayReports = async () => {
    const data = await DayReportDAL.getDayReports(props.wayUuid);
    setDayReports(data);
  };

  useEffect(() => {
    loadDayReports();
  }, []);

  /**
   * Create day report
   */
  const createDayReport = async(wayUuid: string, dayReportsData: DayReport[]) => {
    const newDayReport = await DayReportDAL.createDayReport(wayUuid);
    const dayReportsList = [...dayReportsData, newDayReport];
    setDayReports(dayReportsList);
  };

  return (
    <DayReportsContext.Provider value={{dayReports, setDayReports}}>
      <>
        {props.wayUuid &&
        <Button
          value="Create new day report"
          onClick={() => createDayReport(props.wayUuid, dayReports)}
        />
        }
        <ReportsTable
          data={dayReports}
          columns={columns}
        />
      </>
    </DayReportsContext.Provider>
  );
};