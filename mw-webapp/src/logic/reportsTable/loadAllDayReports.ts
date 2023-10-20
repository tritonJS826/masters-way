import {useEffect, useState} from "react";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {DayReport} from "src/model/businessModel/DayReport";

/**
 * Load all day reports and returns them
 */
export const loadAllDayReports = () => {
  const [dayReports, setDayReports] = useState<DayReport[]>([]);

  /**
   * Gets all day reports
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