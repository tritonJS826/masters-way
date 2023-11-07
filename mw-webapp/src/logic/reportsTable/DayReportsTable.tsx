import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "src/component/button/Button";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {QueryParamTypes} from "src/logic/QueryParamTypes";
import {columns} from "src/logic/reportsTable/columns";
import {ReportsTable} from "src/logic/reportsTable/ReportsTable";
import {DayReport} from "src/model/businessModel/DayReport";
import {pages} from "src/router/pages";

/**
 * Render table with dayReports of specific way
 */
export const DayReportsTable = () => {
  const navigate = useNavigate();
  const {uuid} = useParams<QueryParamTypes>();

  const [dayReports, setDayReports] = useState<DayReport[]>([]);

  /**
   * Gets all day reports
   */
  const loadDayReports = async () => {
    if (uuid) {
      const data = await DayReportDAL.getDayReports(uuid);
      setDayReports(data);
    } else {
      navigate(pages.page404.path);
    }
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
    <>
      {uuid ?
        <Button
          value="Create new day report"
          onClick={() => createDayReport(uuid, dayReports)}
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