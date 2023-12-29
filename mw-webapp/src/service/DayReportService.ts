import {
  collection, CollectionReference, deleteDoc, doc,
  DocumentData, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where, WriteBatch,
}
  from "firebase/firestore";
import {db} from "src/firebase";
import {CommentDTO, CommentDTOSchema, CommentsDTOSchema} from "src/model/DTOModel/CommentDTO";
import {
  DAY_REPORT_CREATED_AT_FIELD,
  DAY_REPORT_UUID_FIELD, DayReportDTO,
  DayReportDTOSchema, DayReportsDTOSchema,
}
  from "src/model/DTOModel/DayReportDTO";
import {JobDoneDTO, JobDoneDTOSchema, JobsDoneDTOSchema} from "src/model/DTOModel/JobDoneDTO";
import {PlanDTO, PlanDTOSchema, PlansDTOSchema} from "src/model/DTOModel/PlanDTO";
import {ProblemDTO, ProblemDTOSchema, ProblemsDTOSchema} from "src/model/DTOModel/ProblemDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotsToDTOConverter} from "src/service/converter/querySnapshotsToDTOConverter";
import {getChunksArray} from "src/utils/getChunkArray";
import {logToConsole} from "src/utils/logToConsole";
import {parseWithValidationStringifiedModel} from "src/utils/parseWithValidationStringifiedModel";
import {RequestOperations} from "src/utils/RequestOperations";

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
      return query(dayReportsRef, where(DAY_REPORT_UUID_FIELD, "in", chunk), orderBy(DAY_REPORT_CREATED_AT_FIELD, "desc"));
    });

    const dayReportsRaw = await Promise.all(dayReportQueries.map(async(item) => {
      const chunkDayReportRaw = await getDocs(item);

      return chunkDayReportRaw;
    }));
    const dayReportsDTO = querySnapshotsToDTOConverter<DayReportDTO>(dayReportsRaw);

    // Additional sort need because firestore method orderBy works only inside method query
    const dayReportsDToOrderedByDate = dayReportsDTO
      .sort((a, b) => b[DAY_REPORT_CREATED_AT_FIELD].toDate().getTime() - a[DAY_REPORT_CREATED_AT_FIELD].toDate().getTime());

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

    logToConsole(`DayReportService: getDayReportsDTO: ${validatedDayReportsDTO.length} ${RequestOperations.READ} operations`);

    return validatedDayReportsDTO;
  }

  /**
   * Get DayReport by Uuid
   */
  public static async getDayReportDTO(uuid: string): Promise<DayReportDTO> {
    const dayReportRaw = await getDoc(doc(db, PATH_TO_DAY_REPORTS_COLLECTION, uuid));
    const dayReportDTO = documentSnapshotToDTOConverter<DayReportDTO>(dayReportRaw);

    const jobsDone: JobDoneDTO[] = dayReportDTO.jobsDoneStringified
      .map((item) => parseWithValidationStringifiedModel<typeof JobDoneDTOSchema>(item, JobDoneDTOSchema));
    const plans: PlanDTO[] = dayReportDTO.plansStringified
      .map((item) => parseWithValidationStringifiedModel<typeof PlanDTOSchema>(item, PlanDTOSchema));
    const problems: ProblemDTO[] = dayReportDTO.problemsStringified
      .map((item) => parseWithValidationStringifiedModel<typeof ProblemDTOSchema>(item, ProblemDTOSchema));
    const comments: CommentDTO[] = dayReportDTO.commentsStringified
      .map((item) => parseWithValidationStringifiedModel<typeof CommentDTOSchema>(item, CommentDTOSchema));

    const validatedJobsDone = JobsDoneDTOSchema.parse(jobsDone);
    const validatedPlans = PlansDTOSchema.parse(plans);
    const validatedProblems = ProblemsDTOSchema.parse(problems);
    const validatedComments = CommentsDTOSchema.parse(comments);

    const validatedStringifiedFields = validatedJobsDone && validatedPlans && validatedProblems && validatedComments;
    const validatedDayReportDTO = validatedStringifiedFields && DayReportDTOSchema.parse(dayReportDTO);

    logToConsole(`DayReportService: getDayReportDTO: 1 ${RequestOperations.READ} operation`);

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

    logToConsole(`DayReportService: createDayReportDTO: 1 ${RequestOperations.WRITE} operation`);

    return validatedDayReportDTO;
  }

  /**
   * Update DayReportDTO
   */
  public static async updateDayReportDTO(dayReportDTO: DayReportDTO) {
    const validatedDayReportDTO = DayReportDTOSchema.parse(dayReportDTO);

    await updateDoc(doc(db, PATH_TO_DAY_REPORTS_COLLECTION, dayReportDTO[DAY_REPORT_UUID_FIELD]), validatedDayReportDTO);

    logToConsole(`DayReportService: updateDayReportDTO: 1 ${RequestOperations.WRITE} operation`);
  }

  /**
   * Delete DayReportDTO
   */
  public static async deleteDayReportDTO(dayReportDTOUuid: string) {
    deleteDoc(doc(db, PATH_TO_DAY_REPORTS_COLLECTION, dayReportDTOUuid));

    logToConsole(`DayReportService: deleteDayReportDTO: 1 ${RequestOperations.DELETE} operation`);
  }

  /**
   * Update DayReportDTO with Batch
   */
  public static updateDayReportDTOWithBatch(updatedDayReportDTO: DayReportDTO, batch: WriteBatch) {
    const dayReportRef = doc(db, PATH_TO_DAY_REPORTS_COLLECTION, updatedDayReportDTO[DAY_REPORT_UUID_FIELD]);
    batch.update(dayReportRef, updatedDayReportDTO);

    logToConsole(`DayReportService: updateDayReportDTOWithBatch: 1 ${RequestOperations.WRITE} operation`);
  }

  /**
   * Delete DayReportDTO with batch
   */
  public static deleteDayReportDTOWithBatch(dayReportDTOUuid: string, batch: WriteBatch) {
    const wayRef = doc(db, PATH_TO_DAY_REPORTS_COLLECTION, dayReportDTOUuid);
    batch.delete(wayRef);

    logToConsole(`DayReportService: deleteDayReportDTOWithBatch: 1 ${RequestOperations.DELETE} operation`);
  }

}
