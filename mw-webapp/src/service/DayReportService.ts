import {collection, getDocs} from "firebase/firestore";
import {db} from "src/firebase";
import {DayReportDTO} from "src/model/firebaseCollection/DayReportDTO";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_DAY_REPORTS_COLLECTION = "dayReports";

/**
 * DayReports requests: {@link getDayReports}
 */
export class DayReportService {

  /**
   * Read DayReports collection
   * @returns {Promise<DayReportDTO[]>} promise of DayReportsDTO[]
   */
  public static async getDayReportsDTO(): Promise<DayReportDTO[]> {
    const dayReportsRaw = await getDocs(collection(db, PATH_TO_DAY_REPORTS_COLLECTION));
    const dayReports: DayReportDTO[] = querySnapshotToDTOConverter<DayReportDTO>(dayReportsRaw);

    return dayReports;
  }

}