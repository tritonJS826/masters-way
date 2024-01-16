import { DayReportService } from "../../service/DayReportService.js";

export const exportDayReports = async (params: {log: (textToLog: string) => void, backupToFile: (data:string) => void}) => {
  params.log(`Starting export DayReport collection`)
  const allDayReports = await DayReportService.getDayReportsDTO();
  params.log(`Got ${allDayReports.length} dayReports`);

  params.backupToFile(JSON.stringify(allDayReports));
  params.log(`Export DayReport finished`)

  return allDayReports.length;
}