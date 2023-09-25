import {collection, getDocs} from "firebase/firestore";
import {db} from "src/firebase";
import {JobDoneDTO} from "src/model/firebaseCollection/JobDoneDTO";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_JOBS_DONE_COLLECTION = "jobsDone";

/**
 * JobsDone requests
 */
export class JobDoneService {

  /**
   * Read JobsDone collection
   * @returns JobDoneDTO[]
   */
  public static async getJobsDone(): Promise<JobDoneDTO[]> {
    const jobsDoneRaw = await getDocs(collection(db, PATH_TO_JOBS_DONE_COLLECTION));
    const jobsDone: JobDoneDTO[] = querySnapshotToDTOConverter<JobDoneDTO>(jobsDoneRaw);
    return jobsDone;
  }

}