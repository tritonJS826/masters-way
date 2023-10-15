import {useEffect, useState} from "react";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {DayReport} from "src/model/businessModel/DayReport";
import {WayService} from "src/service/WayService";

/**
 * Load day reports of specific Way if wayUuid is provided, otherwise load all day reports
 */
export const useGetDataTableReports = (wayUuid?: string) => {
  const [dayReports, setDayReports] = useState<DayReport[]>([]);

  /**
   * Receives and transfer data of reports
   */
  const loadDayReports = async () => {
    let data: DayReport[] = [];
    if (wayUuid) {
      const way = await WayService.getWayDTO(wayUuid);
      const dayReportPromises = way.dayReportUuids.map(async (dayReportUuid) => {
        const dayReport = await DayReportDAL.getDayReport(dayReportUuid);

        return dayReport;
      });
      data = await Promise.all(dayReportPromises);
    } else {
      data = await DayReportDAL.getDayReports();
    }

    setDayReports(data);
  };

  useEffect(() => {
    loadDayReports();
  }, []);

  return dayReports;
};