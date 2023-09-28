import {useEffect, useState} from "react";
import {getDayReports} from "src/dataAccessLogic/getDayReports";
import {DayReport} from "src/model/businessModel/DayReport";

export const useGetDataTable = () => {
  const [data, setData] = useState<DayReport[]>([]);

  const loadDayReports = async () => {
    const dayReports = await getDayReports();
    setData(dayReports);
  };

  useEffect(() => {
    loadDayReports();
  }, []);

  return data;
};