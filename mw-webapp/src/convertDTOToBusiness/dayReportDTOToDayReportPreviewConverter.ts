import {querySnapshotToDTOConverter} from "src/convertDTOToBusiness/querySnapshotToDTOConverter";
import {DayReportPreview} from "src/model/businessModelPreview/DayReportPreview";
import {DayReportDTO} from "src/model/firebaseCollection/DayReportDTO";
import {querySnapshot} from "src/model/querySnapshot";

export const dayReportDTOToDayReportPreviewConverter = (dayReportsRaw: querySnapshot) => {
  const dayReportsDTO: DayReportDTO[] = querySnapshotToDTOConverter<DayReportDTO>(dayReportsRaw);
  const dayReportsPreview: DayReportPreview[] = dayReportsDTO.map((dayReportDTO) => {
    return new DayReportPreview({
      ...dayReportDTO,
      date: new Date(dayReportDTO.date),
      jobDoneUuids: dayReportDTO.jobsDone,
      planForNextPeriodUuids: dayReportDTO.plansForNextPeriod,
      problemForCurrentPeriodUuids: dayReportDTO.problemsForCurrentPeriod,
    });
  });

  return dayReportsPreview;
};

