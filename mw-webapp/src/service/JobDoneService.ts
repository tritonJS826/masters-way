import {collection, getDocs} from "firebase/firestore";
import {JobDoneDTOToJobDoneConverter} from "src/converter/JobDoneConverter";
import {db} from "src/firebase";
import {JobDone} from "src/model/businessModel/JobDone";
import {JobDone as JobDoneDTO} from "src/model/firebaseCollection/JobDone";

const PATH_TO_JOBS_DONE_COLLECTION = "jobsDone";

export class JobDoneService {

  public static async getJobsDone(): Promise<JobDone[]> {
    const jobsDoneRaw = await getDocs(collection(db, PATH_TO_JOBS_DONE_COLLECTION));
    const jobsDoneDTO: JobDoneDTO[] = jobsDoneRaw.docs.map((jobDoneRaw) => ({
      uuid: jobDoneRaw.data().uuid,
      description: jobDoneRaw.data().description,
      timeUnit: jobDoneRaw.data().timeUnit,
      time: jobDoneRaw.data().time,
    }));
    const jobsDone = jobsDoneDTO.map((jobDoneDTO) => JobDoneDTOToJobDoneConverter(jobDoneDTO));
    return jobsDone;
  }

}