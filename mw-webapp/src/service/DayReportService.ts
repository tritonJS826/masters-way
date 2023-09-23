import {collection, getDocs} from "firebase/firestore";
import {dayReportDTOToDayReportPreviewConverter} from "src/convertDTOToBusiness/dayReportDTOToDayReportPreviewConverter";
import {db} from "src/firebase";
import {DayReportPreview} from "src/model/businessModelPreview/DayReportPreview";

const PATH_TO_DAY_REPORTS_COLLECTION = "dayReports";

export class DayReportService {

  public static async getDayReportsPreview(): Promise<DayReportPreview[]> {
    // Const jobsDoneRaw = await JobDoneService.getJobsDone();
    // const plansForNextPeriodRaw = await PlanForNextPeriodService.getPlansForNextPeriod();
    // const problemsForCurrentPeriodRaw = await CurrentProblemService.getCurrentProblems();

    // const obj = {
    //   jobsDoneRaw,
    //   plansForNextPeriodRaw,
    //   problemsForCurrentPeriodRaw,
    // };

    const dayReportsRaw = await getDocs(collection(db, PATH_TO_DAY_REPORTS_COLLECTION));
    const dayReports = dayReportDTOToDayReportPreviewConverter(dayReportsRaw);
    return dayReports;
  }

}