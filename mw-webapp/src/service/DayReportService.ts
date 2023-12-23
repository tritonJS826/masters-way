import {
  collection, CollectionReference, deleteDoc, doc,
  DocumentData, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where, WriteBatch,
}
  from "firebase/firestore";
import {db} from "src/firebase";
import {DAY_REPORT_DATE_FIELD, DAY_REPORT_UUID_FIELD, DayReportDTO, DayReportDTOSchema, DayReportsDTOSchema}
  from "src/model/DTOModel/DayReportDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotsToDTOConverter} from "src/service/converter/querySnapshotsToDTOConverter";
import {getChunksArray} from "src/utils/getChunkArray";

export const PATH_TO_DAY_REPORTS_COLLECTION = "dayReports";
const QUERY_LIMIT = 30;

/**
 * DayReportDTO props without uuid
 */
export type DayReportDTOWithoutUuid = Omit<DayReportDTO, "uuid">;

/**
 * Get sorted and filtered DayReportsDTO
 */
const getSortedDayReportsDTO =
  async (dayReportsRef: CollectionReference<DocumentData, DocumentData>, dayReportUuids: string[]) => {
    const chunksDayReports = getChunksArray(dayReportUuids, QUERY_LIMIT);
    const dayReportQueries = chunksDayReports.map((chunk) => {
      return query(dayReportsRef, where(DAY_REPORT_UUID_FIELD, "in", chunk), orderBy(DAY_REPORT_DATE_FIELD, "desc"));
    });

    const dayReportsRaw = await Promise.all(dayReportQueries.map(async(item) => {
      const chunkDayReportRaw = await getDocs(item);

      return chunkDayReportRaw;
    }));
    const dayReportsDTO = querySnapshotsToDTOConverter<DayReportDTO>(dayReportsRaw);

    // Additional sort need because firestore method orderBy works only inside method query
    const dayReportsDToOrderedByDate =
      dayReportsDTO.sort((a, b) => b[DAY_REPORT_DATE_FIELD].toDate().getTime() - a[DAY_REPORT_DATE_FIELD].toDate().getTime());

    return dayReportsDToOrderedByDate;
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
      ? await getSortedDayReportsDTO(dayReportsRef, dayReportUuids)
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
  public static async updateDayReportDTO(dayReportDTO: DayReportDTO) {
    const validatedDayReportDTO = DayReportDTOSchema.parse(dayReportDTO);

    await updateDoc(doc(db, PATH_TO_DAY_REPORTS_COLLECTION, dayReportDTO[DAY_REPORT_UUID_FIELD]), validatedDayReportDTO);
  }

  /**
   * Delete DayReportDTO
   */
  public static async deleteDayReportDTO(dayReportDTOUuid: string) {
    deleteDoc(doc(db, PATH_TO_DAY_REPORTS_COLLECTION, dayReportDTOUuid));
  }

  /**
   * Update DayReportDTO with Batch
   */
  public static updateDayReportDTOWithBatch(updatedDayReportDTO: DayReportDTO, batch: WriteBatch) {
    const dayReportRef = doc(db, PATH_TO_DAY_REPORTS_COLLECTION, updatedDayReportDTO[DAY_REPORT_UUID_FIELD]);
    batch.update(dayReportRef, updatedDayReportDTO);
  }

  /**
   * Delete DayReportDTO with batch
   */
  public static deleteDayReportDTOWithBatch(dayReportDTOUuid: string, batch: WriteBatch) {
    const wayRef = doc(db, PATH_TO_DAY_REPORTS_COLLECTION, dayReportDTOUuid);
    batch.delete(wayRef);
  }

}
