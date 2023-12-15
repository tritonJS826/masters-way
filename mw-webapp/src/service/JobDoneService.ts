import {collection, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {JobDoneDTO, JobDoneDTOSchema} from "src/model/DTOModel/JobDoneDTO";
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
    const jobDoneDTO = documentSnapshotToDTOConverter<JobDoneDTO>(jobDoneRaw);

    const validatedJobDoneDTO = JobDoneDTOSchema.parse(jobDoneDTO);

    return validatedJobDoneDTO;
  }

  /**
   * Create new JobDoneDTO
   */
  public static async createJobDoneDTO(jobDoneDTOWithoutUuid: JobDoneDTOWithoutUuid): Promise<JobDoneDTO> {
    const docRef = doc(collection(db, PATH_TO_JOBS_DONE_COLLECTION));

    const jobDoneDTO = {
      ...jobDoneDTOWithoutUuid,
      uuid: docRef.id,
    };

    const validatedJobDoneDTO = JobDoneDTOSchema.parse(jobDoneDTO);

    await setDoc(docRef, validatedJobDoneDTO);

    return validatedJobDoneDTO;
  }

  /**
   * Update JobDoneDTO
   */
  public static async updateJobDoneDTO(jobDoneDTO: JobDoneDTO, uuid: string) {
    const validatedJobDoneDTO = JobDoneDTOSchema.parse(jobDoneDTO);
    await updateDoc(doc(db, PATH_TO_JOBS_DONE_COLLECTION, uuid), validatedJobDoneDTO);
  }

}
