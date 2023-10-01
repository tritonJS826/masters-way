import {collection, getDocs} from "firebase/firestore";
import {db} from "src/firebase";
import {PlanForNextPeriodDTO} from "src/model/firebaseCollection/PlanForNextPeriodDTO";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION = "plansForNextPeriod";

/**
 * Provides methods to interact with the PlansForNextPeriod collection in Firestore.
 */
export class PlanForNextPeriodService {

  /**
   * Read PlansForNextPeriod collection
   * @returns {Promise<PLanForNextPeriodDTO[]>} promise of PlanForNextPeriodDTO[]
   */
  public static async getPlansForNextPeriodDTO(): Promise<PlanForNextPeriodDTO[]> {
    const plansForNextPeriodRaw = await getDocs(collection(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION));
    const plansForNextPeriod: PlanForNextPeriodDTO[] = querySnapshotToDTOConverter<PlanForNextPeriodDTO>(plansForNextPeriodRaw);
    return plansForNextPeriod;
  }

}