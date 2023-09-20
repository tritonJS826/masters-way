import {collection, getDocs} from "firebase/firestore";
import {DayReportDTOToDayReportConverter} from "src/converter/DayReportConverter";
import {db} from "src/firebase";
import {DayReport} from "src/model/businessModel/DayReport";
import {DayReport as DayReportDTO} from "src/model/firebaseCollection/DayReport";

const PATH_TO_DAY_REPORTS_COLLECTION = "dayReports";

export class DayReportService {

  public static async getDayReports(callBack: (data: DayReport[]) => void) {
    const dayReportsRaw = await getDocs(collection(db, PATH_TO_DAY_REPORTS_COLLECTION));
    const dayReportsDTO: DayReportDTO[] = dayReportsRaw.docs.map((dayReportRaw) => ({
      uuid: dayReportRaw.data().uuid,
      date: dayReportRaw.data().date,
      jobsDone: dayReportRaw.data().jobsDone,
      plansForNextPeriod: dayReportRaw.data().plansForNextPeriod,
      problemsForCurrentPeriod: dayReportRaw.data().problemsForCurrentPeriod,
      studentComments: dayReportRaw.data().studentComments,
      learnedForToday: dayReportRaw.data().learnedForToday,
      mentorComments: dayReportRaw.data().mentorComments,
      isDayOff: dayReportRaw.data().isDayOff,
    }));
    const dayReports = dayReportsDTO.map((dayReportDTO) => DayReportDTOToDayReportConverter(dayReportDTO));
    callBack(dayReports);
  }

}