import {collection, getDocs} from "firebase/firestore";
import {
  planForNextPeriodDTOToPlanForNextPeriodConverter,
  querySnapshotToPlanForNextPeriodDTOConverter,
} from "src/converter/planForNextPeriodConverter";
import {db} from "src/firebase";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {PlanForNextPeriod as PlanForNextPeriodDTO} from "src/model/firebaseCollection/PlanForNextPeriod";
import {PathToCollection} from "src/service/PathToCollection";

export class PlanForNextPeriodService {

  public static async getPlansForNextPeriod(): Promise<PlanForNextPeriod[]> {
    const plansForNextPeriodRaw = await getDocs(collection(db, PathToCollection.plansForNextPeriod));
    const plansForNextPeriodDTO: PlanForNextPeriodDTO[] = querySnapshotToPlanForNextPeriodDTOConverter(plansForNextPeriodRaw);
    const plansForNextPeriod = plansForNextPeriodDTO.map(planForNextPeriodDTOToPlanForNextPeriodConverter);
    return plansForNextPeriod;
  }

}