import {useEffect, useState} from "react";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {DayReport} from "src/model/businessModel/DayReport";

/**
 * Load day reports
 */
export const useGetDataTableReports = () => {
  const [dayReports, setDayReports] = useState<DayReport[]>([]);

  /**
   * Receives and transfer data of reports
   */
  const loadDayReports = async () => {
    const data = await DayReportDAL.getDayReports();
    setDayReports(data);
  };

  useEffect(() => {
    loadDayReports();
  }, []);

  return dayReports;
};