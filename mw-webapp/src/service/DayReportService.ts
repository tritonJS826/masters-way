import {collection, getDocs} from "firebase/firestore";
import {DayReportDTOToDayReportConverter, querySnapshotToDayReportDTOConverter} from "src/converter/dayReportConverter";
import {db} from "src/firebase";
import {DayReport} from "src/model/businessModel/DayReport";
import {DayReport as DayReportDTO} from "src/model/firebaseCollection/DayReport";
import {CurrentProblemService} from "src/service/CurrentProblemService";
import {JobDoneService} from "src/service/JobDoneService";
import {PathToCollection} from "src/service/PathToCollection";
import {PlanForNextPeriodService} from "src/service/PlanForNextPeriodService";

export class DayReportService {

  public static async getDayReports(): Promise<DayReport[]> {
    const jobsDoneRaw = await JobDoneService.getJobsDone();
    const plansForNextPeriodRaw = await PlanForNextPeriodService.getPlansForNextPeriod();
    const problemsForCurrentPeriodRaw = await CurrentProblemService.getCurrentProblems();

    const obj = {
      jobsDoneRaw,
      plansForNextPeriodRaw,
      problemsForCurrentPeriodRaw,
    };

    const dayReportsRaw = await getDocs(collection(db, PathToCollection.dayReports));
    const dayReportsDTO: DayReportDTO[] = querySnapshotToDayReportDTOConverter(dayReportsRaw);
    const dayReports = dayReportsDTO.map((dayReportDTO) =>
      DayReportDTOToDayReportConverter(dayReportDTO, obj));
    return dayReports;
  }

}