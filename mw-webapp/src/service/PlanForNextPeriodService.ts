import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {PlanForNextPeriodDTO} from "src/model/DTOModel/PlanForNextPeriodDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION = "plansForNextPeriod";

/**
 * PlanForNextPeriodDTO props without uuid
 */
export type PlanForNextPeriodDTOWithoutUuid = Omit<PlanForNextPeriodDTO, "uuid">;

/**
 * Provides methods to interact with the PlansForNextPeriod collection
 */
export class PlanForNextPeriodService {

  /**
   * Get PlansForNextPeriodDTO
   */
  public static async getPlansForNextPeriodDTO(): Promise<PlanForNextPeriodDTO[]> {
    const plansForNextPeriodRaw = await getDocs(collection(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION));
    const plansForNextPeriod: PlanForNextPeriodDTO[] = querySnapshotToDTOConverter<PlanForNextPeriodDTO>(plansForNextPeriodRaw);

    return plansForNextPeriod;
  }

  /**
   * Get PlanForNextPeriodDTO by Uuid
   */
  public static async getPlanForNextPeriodDTO(uuid: string): Promise<PlanForNextPeriodDTO> {
    const planForNextPeriodRaw = await getDoc(doc(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION, uuid));
    const planForNextPeriod: PlanForNextPeriodDTO = documentSnapshotToDTOConverter<PlanForNextPeriodDTO>(planForNextPeriodRaw);

    return planForNextPeriod;
  }

  /**
   * Create PlanForNextPeriodDTO
   */
  public static async createPlanForNextPeriodDTO
  (planForNextPeriodDTOWithoutUuid: PlanForNextPeriodDTOWithoutUuid): Promise<PlanForNextPeriodDTO> {
    const docRef = doc(collection(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION));
    const DEFAULT_PLAN_FOR_NEXT_PERIOD: PlanForNextPeriodDTO = {
      ...planForNextPeriodDTOWithoutUuid,
      uuid: docRef.id,
    };

    await setDoc(docRef, DEFAULT_PLAN_FOR_NEXT_PERIOD);

    return DEFAULT_PLAN_FOR_NEXT_PERIOD;
  }

  /**
   * Update PlanForNextPeriodDTO
   */
  public static async updatePLanForNextPeriodDTO(planForNextPeriodDTO: PlanForNextPeriodDTO, uuid: string) {
    await updateDoc(doc(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION, uuid), {...planForNextPeriodDTO});
  }

}