import {collection, getDocs, deleteDoc, doc, setDoc} from "firebase/firestore";
import {db} from "../firebase.js";
import {DayReportBackup, DayReportDTO, DayReportDTOMigration} from "../DTOModel/DayReportDTO.js";
import { querySnapshotToDTOConverter } from "../converter/querySnapshotToDTOConverter.js";
import { Timestamp } from "firebase/firestore";
import { truncateToThreeChars } from "../utils/truncateToThreeChars.js";

const PATH_TO_DAY_REPORTS_COLLECTION = "dayReports";

/**
 * Provides methods to interact with the DayReports collection
 */
export class DayReportService {

  /**
   * Get DayReportsDTO
   */
  public static async getDayReportsDTO(): Promise<DayReportDTOMigration[]> {
    const dayReportsRef = collection(db, PATH_TO_DAY_REPORTS_COLLECTION);
    const dayReportsRaw = await getDocs(dayReportsRef);
    const dayReportsDTO = querySnapshotToDTOConverter<DayReportDTOMigration>(dayReportsRaw);

    return dayReportsDTO;
  }

  /**
   * Create DayReportDTO
   */
  public static async createDayReportDTO(dayReportDTO: DayReportDTO): Promise<DayReportDTO> {
    const docRef = doc(collection(db, PATH_TO_DAY_REPORTS_COLLECTION));
    
    await setDoc(docRef, dayReportDTO);
    
    return dayReportDTO;
    }

  /**
   * For import purposes
   */
  public static async importDayReport(dayReport: DayReportBackup): Promise<DayReportBackup> {
    const createdAtNanoseconds = truncateToThreeChars(dayReport.createdAt.nanoseconds);
    const updatedAtNanoseconds = dayReport.updatedAt ? truncateToThreeChars(dayReport.updatedAt.nanoseconds) : truncateToThreeChars(0);
    const updatedAtSeconds = dayReport.updatedAt ? dayReport.updatedAt.seconds : truncateToThreeChars(0);


    const createdAtTimestamp = Number(`${dayReport.createdAt.seconds}${createdAtNanoseconds}`);
    const createdAt = new Date(createdAtTimestamp);
    const updatedAtTimestamp = Number(`${updatedAtSeconds}${updatedAtNanoseconds}`);
    const updatedAt = new Date(updatedAtTimestamp);
    
    const dayReportToImport = {
      ...dayReport,
      createdAt: Timestamp.fromDate(createdAt),
      updatedAt: Timestamp.fromDate(updatedAt),
    };

    await setDoc(doc(db, PATH_TO_DAY_REPORTS_COLLECTION, dayReport.uuid), dayReportToImport);

    return dayReport;
  }
  
  /**
   * Delete DayReportDTO
   */
  public static async deleteDayReportDTO(dayReportDTOUuid: string) {
    deleteDoc(doc(db, PATH_TO_DAY_REPORTS_COLLECTION, dayReportDTOUuid));
  }

}