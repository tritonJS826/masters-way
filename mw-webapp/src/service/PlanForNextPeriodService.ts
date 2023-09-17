import {get, ref} from "firebase/database";
import {PlanForNextPeriodDTOToPlanForNextPeriodConverter} from "src/converter/PlanForNextPeriodConverter";
import {db} from "src/firebase";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {PlanForNextPeriod as PlanForNextPeriodDTO} from "src/model/firebaseCollection/PlanForNextPeriod";

export class PlanForNextPeriodService {

  public static async onValueFromRealTimeDb(): Promise<PlanForNextPeriod[]> {
    const snapshot = await get(ref(db, "/plansForNextPeriod"));
    const plansForNextPeriodRaw: PlanForNextPeriodDTO[] = await snapshot.val();
    const plansForNextPeriod: PlanForNextPeriod[] = plansForNextPeriodRaw.map((item) =>
      PlanForNextPeriodDTOToPlanForNextPeriodConverter(item));
    return plansForNextPeriod;
  }

}