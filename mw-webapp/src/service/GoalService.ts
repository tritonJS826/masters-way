import {collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {GoalDTO, GoalDTOArraySchema, GoalDTOSchema} from "src/model/DTOModel/GoalDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_GOALS_COLLECTION = "goals";

/**
 * GoalDTO props without uuid
 */
export type GoalDTOWithoutUuid = Omit<GoalDTO, "uuid">;

/**
 * Provides methods to interact with the Goals collection
 */
export class GoalService {

  /**
   * Get GoalsDTO
   */
  public static async getGoalsDTO(): Promise<GoalDTO[]> {
    const goalsRaw = await getDocs(collection(db, PATH_TO_GOALS_COLLECTION));
    const goalsDTO = querySnapshotToDTOConverter<GoalDTO>(goalsRaw);

    const validatedGoalsDTO = GoalDTOArraySchema.parse(goalsDTO);

    return validatedGoalsDTO;
  }

  /**
   * Get GoalDTO
   */
  public static async getGoalDTO(uuid: string): Promise<GoalDTO> {
    const goalRaw = await getDoc(doc(db, PATH_TO_GOALS_COLLECTION, uuid));
    const goalDTO = documentSnapshotToDTOConverter<GoalDTO>(goalRaw);

    const validatedGoalDTO = GoalDTOSchema.parse(goalDTO);

    return validatedGoalDTO;
  }

  /**
   * Create GoalDTO
   */
  public static async createGoalDTO(goalDTOWithoutUuid: GoalDTOWithoutUuid): Promise<GoalDTO> {
    const docRef = doc(collection(db, PATH_TO_GOALS_COLLECTION));

    const goalDTO = {
      ...goalDTOWithoutUuid,
      uuid: docRef.id,
    };

    const validatedGoalDTO = GoalDTOSchema.parse(goalDTO);

    await setDoc(docRef, validatedGoalDTO);

    return validatedGoalDTO;
  }

}