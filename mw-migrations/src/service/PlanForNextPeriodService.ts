import {collection, getDoc, getDocs, doc} from "firebase/firestore";
import {db} from "../firebase.js";
import {querySnapshotToDTOConverter} from "../converter/querySnapshotToDTOConverter.js";
import { PlanForNextPeriodDTO, PlanForNextPeriodDTOMigration } from "../DTOModel/PlanForNextPeriodDTO.js";
import { documentSnapshotToDTOConverter } from "../converter/documentSnapshotToDTOConverter.js";

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

  /**
   * Get PlanForNextPeriod by Uuid
   */
  public static async getPlanForNextPeriodDTO(uuid: string): Promise<PlanForNextPeriodDTO> {
    const planRaw = await getDoc(doc(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION, uuid));
    const planDTO = documentSnapshotToDTOConverter<PlanForNextPeriodDTO>(planRaw);

    return planDTO;
  }

}