import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {QueryParamTypes} from "src/logic/QueryParamTypes";
import {DayReport} from "src/model/businessModel/DayReport";

/**
 * Load all day reports of specific way and returns them
 */
export const loadAllDayReports = () => {
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

  return dayReports;
};