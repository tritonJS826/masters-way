import {collection, getDocs} from "firebase/firestore";
import {jobDoneDTOToJobDonePreviewConverter} from "src/convertDTOToBusiness/jobDoneConverter";
import {db} from "src/firebase";
import {JobDonePreview} from "src/model/businessModelPreview/JobDonePreview";

const PATH_TO_JOBS_DONE_COLLECTION = "jobsDone";

export class JobDoneService {

  public static async getJobsDone(): Promise<JobDonePreview[]> {
    const jobsDoneRaw = await getDocs(collection(db, PATH_TO_JOBS_DONE_COLLECTION));
    const jobsDone = jobDoneDTOToJobDonePreviewConverter(jobsDoneRaw);
    return jobsDone;
  }

}