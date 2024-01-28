import {collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where, WriteBatch} from "firebase/firestore";
import {db} from "src/firebase";
import {GOAL_UUID_FIELD, GoalDTO, GoalDTOSchema, GoalPartialDTOSchema, GoalsDTOSchema} from "src/model/DTOModel/GoalDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotsToDTOConverter} from "src/service/converter/querySnapshotsToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";
import {QUERY_LIMIT} from "src/service/firebaseVariables";
import {RequestOperations} from "src/service/RequestOperations";
import {getChunksArray} from "src/utils/getChunkArray";
import {logToConsole} from "src/utils/logToConsole";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

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

    const validatedGoalsDTO = GoalsDTOSchema.parse(goalsDTO);

    logToConsole(`GoalService:getGoalsDTO: ${validatedGoalsDTO.length} ${RequestOperations.READ} operations`);

    return validatedGoalsDTO;
  }

  /**
   * Get GoalsDTO by uuid
   */
  public static async getGoalsDTOByUuids(goalUuids: string[]): Promise<GoalDTO[]> {
    const goalsRef = collection(db, PATH_TO_GOALS_COLLECTION);
    const chunksGoalsDTO = getChunksArray(goalUuids, QUERY_LIMIT);
    const goalsDTOQueries = chunksGoalsDTO.map((chunk) => {
      return query(goalsRef, where(GOAL_UUID_FIELD, "in", chunk));
    });

    const goalsRaw = await Promise.all(goalsDTOQueries.map(getDocs));

    const goalsDTO = querySnapshotsToDTOConverter<GoalDTO>(goalsRaw);

    const validatedGoalsDTO = GoalsDTOSchema.parse(goalsDTO);

    logToConsole(`GoalService:getGoalsDTOByUuids: ${validatedGoalsDTO.length} ${RequestOperations.READ} operations`);

    return validatedGoalsDTO;
  }

  /**
   * Get GoalDTO
   */
  public static async getGoalDTO(uuid: string): Promise<GoalDTO> {
    const goalRaw = await getDoc(doc(db, PATH_TO_GOALS_COLLECTION, uuid));
    const goalDTO = documentSnapshotToDTOConverter<GoalDTO>(goalRaw);

    const validatedGoalDTO = GoalDTOSchema.parse(goalDTO);

    logToConsole(`GoalService:getGoalDTO: 1 ${RequestOperations.READ} operation`);

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

    logToConsole(`GoalService:createGoalDTO: 1 ${RequestOperations.WRITE} operation`);

    return validatedGoalDTO;
  }

  /**
   * Update GoalDTO
   */
  public static async updateGoalDTO(partialGoalDTO: PartialWithUuid<GoalDTO>) {
    const validatedGoalDTO = GoalPartialDTOSchema.parse(partialGoalDTO);

    await updateDoc(doc(db, PATH_TO_GOALS_COLLECTION, validatedGoalDTO.uuid), validatedGoalDTO);

    logToConsole(`GoalService:updateGoalDTO: 1 ${RequestOperations.WRITE} operation`);
  }

  /**
   * Create GoalDTO with Batch
   */
  public static createGoalDTOWithBatch(goalDTOWithoutUuid: GoalDTOWithoutUuid, batch: WriteBatch): GoalDTO {
    const docRef = doc(collection(db, PATH_TO_GOALS_COLLECTION));
    const goalDTO = {
      ...goalDTOWithoutUuid,
      uuid: docRef.id,
    };

    batch.set(docRef, goalDTO);

    const validatedGoalDTO = GoalDTOSchema.parse(goalDTO);

    logToConsole(`GoalService:createGoalDTOWithBatch: 1 ${RequestOperations.WRITE} operation`);

    return validatedGoalDTO;
  }

  /**
   * Delete GoalDTO with batch
   */
  public static deleteGoalDTOWithBatch(goalDTOUuid: string, batch: WriteBatch) {
    const wayRef = doc(db, PATH_TO_GOALS_COLLECTION, goalDTOUuid);
    batch.delete(wayRef);

    logToConsole(`GoalService:deleteGoalDTOWithBatch: 1 ${RequestOperations.WRITE} operation`);
  }

}
