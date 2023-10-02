import {DayReportDTO} from "src/model/firebaseCollection/DayReportDTO";
import {DayReportService} from "src/service/DayReportService";

interface DayReportProps {
  studentComments: string[];
  mentorComments: string[];
  learnedForToday: string[];
}

export const updateDayReport = async (text: string, uuid: string, columnName: keyof DayReportProps, index: number) => {
  const oldDayReport = await DayReportService.getDayReportDTO(uuid);
  const updatedDayReport: DayReportDTO = {
    ...oldDayReport,
    [`${columnName}`]: oldDayReport[`${columnName}`].map((item: string, i: number) => {
      if (i === index) {
        return `${text}`;
      }
      return item;
    }),
  };
  await DayReportService.updateDayReportDTO(updatedDayReport, uuid);
};