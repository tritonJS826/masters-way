import {ref, get} from "firebase/database";
import {CurrentProblemDTOToCurrentProblemConverter} from "src/converter/CurrentProblemConverter";
import {db} from "src/firebase";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {CurrentProblem as CurrentProblemDTO} from "src/model/firebaseCollection/CurrentProblem";

export class CurrentProblemService {

  public static async onValueFromRealTimeDb(): Promise<CurrentProblem[]> {
    const snapshot = await get(ref(db, "/currentProblems"));
    const currentProblemsRaw: CurrentProblemDTO[] = await snapshot.val();
    const currentProblems: CurrentProblem[] = currentProblemsRaw.map((item) =>
      CurrentProblemDTOToCurrentProblemConverter(item));
    return currentProblems;
  }

}