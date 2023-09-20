import {collection, getDocs} from "firebase/firestore";
import {PlanForNextPeriodDTOToPlanForNextPeriodConverter} from "src/converter/PlanForNextPeriodConverter";
import {db} from "src/firebase";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {PlanForNextPeriod as PlanForNextPeriodDTO} from "src/model/firebaseCollection/PlanForNextPeriod";

const PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION = "plansForNextPeriod";

export class PlanForNextPeriodService {

  public static async getPlansForNextPeriod(): Promise<PlanForNextPeriod[]> {
    const plansForNextPeriodRaw = await getDocs(collection(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION));
    const plansForNextPeriodDTO: PlanForNextPeriodDTO[] = plansForNextPeriodRaw.docs.map((planForNextPeriodRaw) => ({
      uuid: planForNextPeriodRaw.data().uuid,
      job: planForNextPeriodRaw.data().job,
      timeUnit: planForNextPeriodRaw.data().timeUnit,
      estimationTime: planForNextPeriodRaw.data().estimationTime,
    }));
    const plansForNextPeriod = plansForNextPeriodDTO
      .map((jobDoneDTO) => PlanForNextPeriodDTOToPlanForNextPeriodConverter(jobDoneDTO));
    return plansForNextPeriod;
  }

}