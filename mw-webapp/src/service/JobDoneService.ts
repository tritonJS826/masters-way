import {collection, getDocs} from "firebase/firestore";
import {db} from "src/firebase";
import {JobDoneDTO} from "src/model/firebaseCollection/JobDoneDTO";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_JOBS_DONE_COLLECTION = "jobsDone";

/**
 * Provides methods to interact with the JobsDone collection in Firestore.
 */
export class JobDoneService {

  /**
   * Read JobsDone collection
   * @returns {Promise<JobDoneDTO[]>} promise of JobDoneDTO[]
   */
  public static async getJobsDoneDTO(): Promise<JobDoneDTO[]> {
    const jobsDoneRaw = await getDocs(collection(db, PATH_TO_JOBS_DONE_COLLECTION));
    const jobsDone: JobDoneDTO[] = querySnapshotToDTOConverter<JobDoneDTO>(jobsDoneRaw);

    return jobsDone;
  }

}