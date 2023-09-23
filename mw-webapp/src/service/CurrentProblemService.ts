import {collection, getDocs} from "firebase/firestore";
import {currentProblemDTOToCurrentProblemPreviewConverter} from "src/convertDTOToBusiness/currentProblemConverter";
import {db} from "src/firebase";
import {CurrentProblemPreview} from "src/model/businessModelPreview/CurrentProblemPreview";

const PATH_TO_CURRENT_PROBLEMS_COLLECTION = "currentProblems";

export class CurrentProblemService {

  public static async getCurrentProblems(): Promise<CurrentProblemPreview[]> {
    const currentProblemsRaw = await getDocs(collection(db, PATH_TO_CURRENT_PROBLEMS_COLLECTION));
    const currentProblems = currentProblemDTOToCurrentProblemPreviewConverter(currentProblemsRaw);
    return currentProblems;
  }

}