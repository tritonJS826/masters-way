import {collection, CollectionReference, doc, DocumentData, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where}
  from "firebase/firestore";
import {db} from "src/firebase";
import {DAY_REPORT_DATE_FIELD, DAY_REPORT_UUID_FIELD, DayReportDTO, DayReportDTOSchema, DayReportsDTOSchema}
  from "src/model/DTOModel/DayReportDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_DAY_REPORTS_COLLECTION = "dayReports";

/**
 * DayReportDTO props without uuid
 */
export type DayReportDTOWithoutUuid = Omit<DayReportDTO, "uuid">;

/**
 * Get sorted and filtered DayReportsDTO
 */
const getSortedDayReportsDTO =
  async (dayReportsRef: CollectionReference<DocumentData, DocumentData>, dayReportUuids: string[]) => {
    const dayReportsQuery =
      query(dayReportsRef, where(DAY_REPORT_UUID_FIELD, "in", dayReportUuids), orderBy(DAY_REPORT_DATE_FIELD, "desc"));
    const dayReportsRaw = await getDocs(dayReportsQuery);
    const dayReportsDTO = querySnapshotToDTOConverter<DayReportDTO>(dayReportsRaw);

    return dayReportsDTO;
  };

/**
 * Provides methods to interact with the DayReports collection
 */
export class DayReportService {

  /**
   * Get DayReportsDTO
   */
  public static async getDayReportsDTO(dayReportUuids: string[]): Promise<DayReportDTO[]> {
    const dayReportsRef = collection(db, PATH_TO_DAY_REPORTS_COLLECTION);
    const isDayReportUuidsExists = !!dayReportUuids.length;

    const dayReportsDTO = isDayReportUuidsExists
      ? getSortedDayReportsDTO(dayReportsRef, dayReportUuids)
      : [];

    const validatedDayReportsDTO = DayReportsDTOSchema.parse(dayReportsDTO);

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

    const dayReportDTO = {
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