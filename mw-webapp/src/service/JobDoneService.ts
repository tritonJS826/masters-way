import {collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {JobDoneDTO} from "src/model/DTOModel/JobDoneDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_JOBS_DONE_COLLECTION = "jobsDone";

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
   * Update JobDoneDTO
   */
  public static async updateJobDoneDTO(data: JobDoneDTO, uuid: string) {
    await updateDoc(doc(db, PATH_TO_JOBS_DONE_COLLECTION, uuid), {...data});
  }

}