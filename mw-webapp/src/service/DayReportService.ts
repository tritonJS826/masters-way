import {
  collection, CollectionReference, deleteDoc, doc,
  DocumentData, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where, WriteBatch,
}
  from "firebase/firestore";
import {db} from "src/firebase";
import {CommentDTO, CommentsDTOSchema} from "src/model/DTOModel/CommentDTO";
import {
  DAY_REPORT_CREATED_AT_FIELD,
  DAY_REPORT_UUID_FIELD, DayReportDTO,
  DayReportDTOSchema, DayReportsDTOSchema,
}
  from "src/model/DTOModel/DayReportDTO";
import {JobDoneDTO, JobsDoneDTOSchema} from "src/model/DTOModel/JobDoneDTO";
import {PlanDTO, PlansDTOSchema} from "src/model/DTOModel/PlanDTO";
import {ProblemDTO, ProblemsDTOSchema} from "src/model/DTOModel/ProblemDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotsToDTOConverter} from "src/service/converter/querySnapshotsToDTOConverter";
import {getChunksArray} from "src/utils/getChunkArray";
import {z} from "zod";

export const PATH_TO_DAY_REPORTS_COLLECTION = "dayReports";
const QUERY_LIMIT = 30;

/**
 * DayReportDTO props without uuid
 */
export type DayReportDTOWithoutUuid = Omit<DayReportDTO, "uuid">;

/**
 * Create model from JSON
 */
const createModelFromJson = <T>(content: string): T => {
  return z.custom<string>(() => {
    try {
      JSON.parse(content);
    } catch (error) {
      return false;
    }

    return true;
  }, "invalid json")
    .transform((contents) => JSON.parse(contents))
    .parse(content);
};

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

    return validatedDayReportsDTO;
  }

  /**
   * Get DayReport by Uuid
   */
  public static async getDayReportDTO(uuid: string): Promise<DayReportDTO> {
    const dayReportRaw = await getDoc(doc(db, PATH_TO_DAY_REPORTS_COLLECTION, uuid));
    const dayReportDTO = documentSnapshotToDTOConverter<DayReportDTO>(dayReportRaw);

    const jobsDone = dayReportDTO.jobsDoneStringified.map((item) => createModelFromJson<JobDoneDTO>(item));
    const plans = dayReportDTO.plansStringified.map((item) => createModelFromJson<PlanDTO>(item));
    const problems = dayReportDTO.problemsStringified.map((item) =>
      createModelFromJson<ProblemDTO>(item));
    const comments = dayReportDTO.commentsStringified.map((item) => createModelFromJson<CommentDTO>(item));

    const validatedJobsDone = JobsDoneDTOSchema.parse(jobsDone);
    const validatedPlans = PlansDTOSchema.parse(plans);
    const validatedProblems = ProblemsDTOSchema.parse(problems);
    const validatedComments = CommentsDTOSchema.parse(comments);

    const validatedStringifiedFields = validatedJobsDone && validatedPlans && validatedProblems && validatedComments;

    const validatedDayReportDTO = validatedStringifiedFields && DayReportDTOSchema.parse(dayReportDTO);

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
