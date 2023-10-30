import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {DayReportDTO} from "src/model/DTOModel/DayReportDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_DAY_REPORTS_COLLECTION = "dayReports";

/**
 * DayReportDTO props without uuid
 */
export type DayReportDTOWithoutUuid = Omit<DayReportDTO, "uuid">;

/**
 * Provides methods to interact with the DayReports collection
 */
export class DayReportService {

  /**
   * Get DayReportsDTO
   */
  public static async getDayReportsDTO(): Promise<DayReportDTO[]> {
    const dayReportsRaw = await getDocs(collection(db, PATH_TO_DAY_REPORTS_COLLECTION));
    const dayReports: DayReportDTO[] = querySnapshotToDTOConverter<DayReportDTO>(dayReportsRaw);

    return dayReports;
  }

  /**
   * Get DayReport by Uuid
   */
  public static async getDayReportDTO(uuid: string): Promise<DayReportDTO> {
    const dayReportRaw = await getDoc(doc(db, PATH_TO_DAY_REPORTS_COLLECTION, uuid));
    const dayReport: DayReportDTO = documentSnapshotToDTOConverter<DayReportDTO>(dayReportRaw);

    return dayReport;
  }

  /**
   * Create new DayReportDTO
   */
  public static async createDayReportDTO(data: DayReportDTOWithoutUuid) {
    const docRef = doc(collection(db, PATH_TO_DAY_REPORTS_COLLECTION));
    const dayReportDTO: DayReportDTO = {
      ...data,
      uuid: docRef.id,
    };

    await setDoc(docRef, dayReportDTO);

    return dayReportDTO;
  }

  /**
   * Update DayReportDTO
   */
  public static async updateDayReportDTO(data: DayReportDTO, uuid: string) {
    await updateDoc(doc(db, PATH_TO_DAY_REPORTS_COLLECTION, uuid), {...data});
  }

}