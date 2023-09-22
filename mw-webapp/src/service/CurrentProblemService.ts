import {collection, getDocs} from "firebase/firestore";
import {
  currentProblemDTOToCurrentProblemConverter,
  querySnapshotToCurrentProblemDTOConverter,
} from "src/converter/currentProblemConverter";
import {db} from "src/firebase";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {CurrentProblem as CurrentProblemDTO} from "src/model/firebaseCollection/CurrentProblem";
import {PathToCollection} from "src/service/PathToCollection";

export class CurrentProblemService {

  public static async getCurrentProblems(): Promise<CurrentProblem[]> {
    const currentProblemsRaw = await getDocs(collection(db, PathToCollection.currentProblems));
    const currentProblemsDTO: CurrentProblemDTO[] = querySnapshotToCurrentProblemDTOConverter(currentProblemsRaw);
    const currentProblems = currentProblemsDTO.map(currentProblemDTOToCurrentProblemConverter);
    return currentProblems;
  }

}