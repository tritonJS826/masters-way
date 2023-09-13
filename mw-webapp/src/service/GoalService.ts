import {ref, get} from "firebase/database";
import {GoalDTOToGoalConverter} from "src/converter/GoalConverter";
import {db} from "src/firebase";
import {Goal} from "src/model/businessModel/Goal";
import {Goal as GoalDTO} from "src/model/firebaseCollection/Goal";

export class GoalService {

  public static async getValueFromRealTimeDb(): Promise<Goal[]> {
    const snapshot = await get(ref(db, "/goals"));
    const jobsDoneRaw: GoalDTO[] = await snapshot.val();
    const jobsDone: Goal[] = jobsDoneRaw.map((item) => GoalDTOToGoalConverter(item));
    return jobsDone;
  }

}