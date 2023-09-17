import {get, ref} from "firebase/database";
import {JobDoneDTOToJobDoneConverter} from "src/converter/JobDoneConverter";
import {db} from "src/firebase";
import {JobDone} from "src/model/businessModel/JobDone";
import {JobDone as JobDoneDTO} from "src/model/firebaseCollection/JobDone";

export class JobDoneService {

  public static async onValueFromRealTimeDb(): Promise<JobDone[]> {
    const snapshot = await get(ref(db, "/jobsDone"));
    const jobsDoneRaw: JobDoneDTO[] = await snapshot.val();
    const jobsDone: JobDone[] = jobsDoneRaw.map((item) => JobDoneDTOToJobDoneConverter(item));
    return jobsDone;
  }

}