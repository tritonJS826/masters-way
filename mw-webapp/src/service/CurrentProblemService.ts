import {collection, getDocs} from "firebase/firestore";
import {CurrentProblemDTOToCurrentProblemConverter} from "src/converter/CurrentProblemConverter";
import {db} from "src/firebase";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {CurrentProblem as CurrentProblemDTO} from "src/model/firebaseCollection/CurrentProblem";

const PATH_TO_CURRENT_PROBLEMS_COLLECTION = "currentProblems";

export class CurrentProblemService {

  public static async getCurrentProblems(): Promise<CurrentProblem[]> {
    const currentProblemsRaw = await getDocs(collection(db, PATH_TO_CURRENT_PROBLEMS_COLLECTION));
    const currentProblemsDTO: CurrentProblemDTO[] = currentProblemsRaw.docs.map((currentProblemRaw) => ({
      uuid: currentProblemRaw.data().uuid,
      description: currentProblemRaw.data().description,
      isDone: currentProblemRaw.data().isDone,
    }));
    const currentProblems = currentProblemsDTO
      .map((currentProblemDTO) => CurrentProblemDTOToCurrentProblemConverter(currentProblemDTO));
    return currentProblems;
  }

}