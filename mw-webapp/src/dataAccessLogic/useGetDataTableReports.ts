import {useEffect, useState} from "react";
import {getDayReports} from "src/dataAccessLogic/getDayReports";
import {DayReport} from "src/model/businessModel/DayReport";

/**
 * Load day reports
 * @returns {DayReport[]}
 */
export const useGetDataTableReports = () => {
  const [data, setData] = useState<DayReport[]>([]);

  /**
 * Receives and transfer data of reports
 */
  const loadDayReports = async () => {
    const dayReports = await getDayReports();
    setData(dayReports);
  };

  useEffect(() => {
    loadDayReports();
  }, []);

  return data;
};