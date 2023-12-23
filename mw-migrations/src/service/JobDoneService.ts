import {collection, getDoc, getDocs, doc} from "firebase/firestore";
import {db} from "../firebase.js";
import {querySnapshotToDTOConverter} from "../converter/querySnapshotToDTOConverter.js";
import { JobDoneDTO, JobDoneDTOMigration } from "../DTOModel/JobDoneDTO.js";
import { documentSnapshotToDTOConverter } from "../converter/documentSnapshotToDTOConverter.js";

const PATH_TO_JOBS_DONE_COLLECTION = "jobsDone";

/**
 * Provides methods to interact with the PlansForNextPeriod collection
 */
export class JobDoneService {

  /**
   * Get JobsDoneDTO
   */
  public static async getJobsDoneDTO(): Promise<JobDoneDTOMigration[]> {
    const jobDoneRef = collection(db, PATH_TO_JOBS_DONE_COLLECTION);
    const jobsDoneRaw = await getDocs(jobDoneRef);
    const jobsDoneDTO = querySnapshotToDTOConverter<JobDoneDTOMigration>(jobsDoneRaw);

    return jobsDoneDTO;
  }

    /**
   * Get JobDoneDTO by Uuid
   */
  public static async getJobDoneDTO(uuid: string): Promise<JobDoneDTO> {
    const jobDoneRaw = await getDoc(doc(db, PATH_TO_JOBS_DONE_COLLECTION, uuid));
    const jobDoneDTO = documentSnapshotToDTOConverter<JobDoneDTO>(jobDoneRaw);

    return jobDoneDTO;
    }

}