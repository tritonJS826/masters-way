import {collection, getDocs} from "firebase/firestore";
import {jobDoneDTOToJobDoneConverter, querySnapshotToJobDoneDTOConverter} from "src/converter/jobDoneConverter";
import {db} from "src/firebase";
import {JobDone} from "src/model/businessModel/JobDone";
import {JobDone as JobDoneDTO} from "src/model/firebaseCollection/JobDone";
import {PathToCollection} from "src/service/PathToCollection";

export class JobDoneService {

  public static async getJobsDone(): Promise<JobDone[]> {
    const jobsDoneRaw = await getDocs(collection(db, PathToCollection.jobsDone));
    const jobsDoneDTO: JobDoneDTO[] = querySnapshotToJobDoneDTOConverter(jobsDoneRaw);
    const jobsDone = jobsDoneDTO.map(jobDoneDTOToJobDoneConverter);
    return jobsDone;
  }

}