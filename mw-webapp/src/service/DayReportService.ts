import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {DayReportDTO, DayReportDTOSchema, DayReportsDTOArraySchema} from "src/model/DTOModel/DayReportDTO";
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
    const dayReportsDTO = querySnapshotToDTOConverter<DayReportDTO>(dayReportsRaw);

    const validatedDayReportsDTO = DayReportsDTOArraySchema.parse(dayReportsDTO);

    return validatedDayReportsDTO;
  }

  /**
   * Get DayReport by Uuid
   */
  public static async getDayReportDTO(uuid: string): Promise<DayReportDTO> {
    const dayReportRaw = await getDoc(doc(db, PATH_TO_DAY_REPORTS_COLLECTION, uuid));
    const dayReportDTO = documentSnapshotToDTOConverter<DayReportDTO>(dayReportRaw);

    const validatedDayReportDTO = DayReportDTOSchema.parse(dayReportDTO);

    return validatedDayReportDTO;
  }

  /**
   * Create new DayReportDTO
   */
  public static async createDayReportDTO(dayReportDTOWithoutUuid: DayReportDTOWithoutUuid) {
    const docRef = doc(collection(db, PATH_TO_DAY_REPORTS_COLLECTION));
    const dayReportDTO: DayReportDTO = {
      ...dayReportDTOWithoutUuid,
      uuid: docRef.id,
    };

    const validatedDayReportDTO = DayReportDTOSchema.parse(dayReportDTO);

    await setDoc(docRef, validatedDayReportDTO);

    return validatedDayReportDTO;
  }

  /**
   * Update DayReportDTO
   */
  public static async updateDayReportDTO(dayReportDTO: DayReportDTO, uuid: string) {
    const validatedDayReportDTO = DayReportDTOSchema.parse(dayReportDTO);

    await updateDoc(doc(db, PATH_TO_DAY_REPORTS_COLLECTION, uuid), validatedDayReportDTO);
  }

}