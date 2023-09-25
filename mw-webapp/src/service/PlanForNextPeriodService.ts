import {collection, getDocs} from "firebase/firestore";
import {db} from "src/firebase";
import {PlanForNextPeriodDTO} from "src/model/firebaseCollection/PlanForNextPeriodDTO";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION = "plansForNextPeriod";

/**
 * PlansForNextPeriod requests
 */
export class PlanForNextPeriodService {

  /**
   * Read PlansForNextPeriod collection
   * @returns PLanForNextPeriodDTO[]
   */
  public static async getPlansForNextPeriod(): Promise<PlanForNextPeriodDTO[]> {
    const plansForNextPeriodRaw = await getDocs(collection(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION));
    const plansForNextPeriod: PlanForNextPeriodDTO[] = querySnapshotToDTOConverter<PlanForNextPeriodDTO>(plansForNextPeriodRaw);
    return plansForNextPeriod;
  }

}