import {useEffect, useState} from "react";
import {getDayReports} from "src/dataAccessLogic/getDayReports";
import {DayReport} from "src/model/businessModel/DayReport";

/**
 * Load day reports
 * @returns {DayReport[]}
 */
export const useGetDataTableReports = () => {
  const [dayReports, setDayReports] = useState<DayReport[]>([]);

  /**
   * Receives and transfer data of reports
   */
  const loadDayReports = async () => {
    const data = await getDayReports();
    setDayReports(data);
  };

  useEffect(() => {
    loadDayReports();
  }, []);

  return dayReports;
};