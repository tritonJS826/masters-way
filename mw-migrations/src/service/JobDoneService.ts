import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase.js";
import {querySnapshotToDTOConverter} from "../converter/querySnapshotToDTOConverter.js";
import { JobDoneDTOMigration } from "../DTOModel/JobDoneDTO.js";

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

}