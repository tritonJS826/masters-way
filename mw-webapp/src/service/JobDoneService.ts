import {collection, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {JobDoneDTO} from "src/model/DTOModel/JobDoneDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";

const PATH_TO_JOBS_DONE_COLLECTION = "jobsDone";

/**
 * JobDoneDTO props without uuid
 */
export type JobDoneDTOWithoutUuid = Omit<JobDoneDTO, "uuid">;

/**
 * Provides methods to interact with the JobsDone collection
 */
export class JobDoneService {

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
   */
  public static async createJobDoneDTO(jobDoneDTOWithoutUuid: JobDoneDTOWithoutUuid): Promise<JobDoneDTO> {
    const docRef = doc(collection(db, PATH_TO_JOBS_DONE_COLLECTION));
    const DEFAULT_JOB_DONE: JobDoneDTO = {
      ...jobDoneDTOWithoutUuid,
      uuid: docRef.id,
    };

    await setDoc(docRef, DEFAULT_JOB_DONE);

    return DEFAULT_JOB_DONE;
  }

  /**
   * Update JobDoneDTO
   */
  public static async updateJobDoneDTO(jobDoneDTO: JobDoneDTO, uuid: string) {
    await updateDoc(doc(db, PATH_TO_JOBS_DONE_COLLECTION, uuid), {...jobDoneDTO});
  }

}