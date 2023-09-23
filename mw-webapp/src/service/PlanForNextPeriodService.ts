import {collection, getDocs} from "firebase/firestore";
import {planForNextPeriodDTOToPlanForNextPeriodPreviewConverter} from "src/convertDTOToBusiness/planForNextPeriodConverter";
import {db} from "src/firebase";
import {PlanForNextPeriodPreview} from "src/model/businessModelPreview/PlanForNextPeriodPreview";

const PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION = "plansForNextPeriod";

export class PlanForNextPeriodService {

  public static async getPlansForNextPeriod(): Promise<PlanForNextPeriodPreview[]> {
    const plansForNextPeriodRaw = await getDocs(collection(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION));
    const plansForNextPeriod = planForNextPeriodDTOToPlanForNextPeriodPreviewConverter(plansForNextPeriodRaw);
    return plansForNextPeriod;
  }

}