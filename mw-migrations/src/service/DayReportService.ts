import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase.js";
import {DayReportDTO} from "../DTOModel/DayReportDTO.js";
import {querySnapshotToDTOConverter} from "../converter/querySnapshotToDTOConverter.js";

const PATH_TO_DAY_REPORTS_COLLECTION = "dayReports";

/**
 * Provides methods to interact with the DayReports collection
 */
export class DayReportService {

  /**
   * Get DayReportsDTO
   */
  public static async getDayReportsDTO(): Promise<DayReportDTO[]> {
    const dayReportsRef = collection(db, PATH_TO_DAY_REPORTS_COLLECTION);
    const dayReportsRaw = await getDocs(dayReportsRef);
    const dayReportsDTO = querySnapshotToDTOConverter<DayReportDTO>(dayReportsRaw);

    return dayReportsDTO;
  }

}