import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button} from "src/component/button/Button";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {QueryParamTypes} from "src/logic/QueryParamTypes";
import {columns} from "src/logic/reportsTable/columns";
import {ReportsTable} from "src/logic/reportsTable/ReportsTable";
import {DayReport} from "src/model/businessModel/DayReport";

/**
 * Render table with dayReports of specific way
 */
export const DayReportsTable = () => {
  const {uuid} = useParams<QueryParamTypes["uuid"]>();

  const [dayReports, setDayReports] = useState<DayReport[]>([]);

  /**
   * Gets all day reports
   */
  const loadDayReports = async () => {
    const data = uuid ? await DayReportDAL.getDayReports(uuid) : [];
    setDayReports(data);
  };

  useEffect(() => {
    loadDayReports();
  }, []);

  /**
   * Create day report
   */
  const createDayReport = async(id: string) => {
    await DayReportDAL.createDayReport(id);
    loadDayReports();
  };

  return (
    <>
      {uuid ?
        <Button
          value="Create new day report"
          onClick={() => createDayReport(uuid)}
        />
        :
        null
      }
      <ReportsTable
        data={dayReports}
        columns={columns}
      />
    </>
  );
};