import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {JobDoneDTO} from "src/model/DTOModel/JobDoneDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_JOBS_DONE_COLLECTION = "jobsDone";

/**
 * JobDoneDTO props without uuid
 */
export type NewJobDoneDTO = Omit<JobDoneDTO, "uuid">;

/**
 * Provides methods to interact with the JobsDone collection
 */
export class JobDoneService {

  /**
   * Get JobsDoneDTO
   */
  public static async getJobsDoneDTO(): Promise<JobDoneDTO[]> {
    const jobsDoneRaw = await getDocs(collection(db, PATH_TO_JOBS_DONE_COLLECTION));
    const jobsDone: JobDoneDTO[] = querySnapshotToDTOConverter<JobDoneDTO>(jobsDoneRaw);

    return jobsDone;
  }

  /**
   * Get JobDoneDTO by Uuid
   */
  public static async getJobDoneDTO(uuid: string): Promise<JobDoneDTO> {
    const jobDoneRaw = await getDoc(doc(db, PATH_TO_JOBS_DONE_COLLECTION, uuid));
    const jobDone: JobDoneDTO = documentSnapshotToDTOConverter<JobDoneDTO>(jobDoneRaw);

    return jobDone;
  }

  /**
   * Create new JobDoneDTO
   * @return {string} Uuid of new JobDoneDTO
   */
  public static async createJobDoneDTO(data: NewJobDoneDTO): Promise<string> {
    const docRef = doc(collection(db, PATH_TO_JOBS_DONE_COLLECTION));
    const DEFAULT_JOB_DONE: JobDoneDTO = {
      ...data,
      uuid: docRef.id,
    };

    await setDoc(docRef, DEFAULT_JOB_DONE);

    return docRef.id;
  }

  /**
   * Update JobDoneDTO
   */
  public static async updateJobDoneDTO(data: JobDoneDTO, uuid: string) {
    await updateDoc(doc(db, PATH_TO_JOBS_DONE_COLLECTION, uuid), {...data});
  }

}