import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase.js";
import {querySnapshotToDTOConverter} from "../converter/querySnapshotToDTOConverter.js";
import { PlanForNextPeriodDTOMigration } from "../DTOModel/PlanForNextPeriodDTO.js";

const PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION = "plansForNextPeriod";

/**
 * Provides methods to interact with the PlansForNextPeriod collection
 */
export class PlanForNextPeriodService {

  /**
   * Get PlansForNextPeriodDTO
   */
  public static async getPlansForNextPeriodDTO(): Promise<PlanForNextPeriodDTOMigration[]> {
    const plansForNextPeriodRef = collection(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION);
    const plansForNextPeriodRaw = await getDocs(plansForNextPeriodRef);
    const plansForNextPeriodDTO = querySnapshotToDTOConverter<PlanForNextPeriodDTOMigration>(plansForNextPeriodRaw);

    return plansForNextPeriodDTO;
  }

}