import {collection, deleteDoc, doc, getDoc, setDoc, updateDoc, writeBatch} from "firebase/firestore";
import {db} from "src/firebase";
import {PlanForNextPeriodDTO, PlanForNextPeriodDTOSchema} from "src/model/DTOModel/PlanForNextPeriodDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {PATH_TO_DAY_REPORTS_COLLECTION} from "src/service/DayReportService";

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
   * Get PlanForNextPeriodDTO by Uuid
   */
  public static async getPlanForNextPeriodDTO(uuid: string): Promise<PlanForNextPeriodDTO> {
    const planForNextPeriodRaw = await getDoc(doc(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION, uuid));
    const planForNextPeriodDTO = documentSnapshotToDTOConverter<PlanForNextPeriodDTO>(planForNextPeriodRaw);

    const validatedPlanForNextPeriodDTO = PlanForNextPeriodDTOSchema.parse(planForNextPeriodDTO);

    return validatedPlanForNextPeriodDTO;
  }

  /**
   * Create PlanForNextPeriodDTO
   */
  public static async createPlanForNextPeriodDTO
  (planForNextPeriodDTOWithoutUuid: PlanForNextPeriodDTOWithoutUuid): Promise<PlanForNextPeriodDTO> {
    const docRef = doc(collection(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION));

    const planForNextPeriodDTO = {
      ...planForNextPeriodDTOWithoutUuid,
      uuid: docRef.id,
    };

    const validatedPlanForNextPeriodDTO = PlanForNextPeriodDTOSchema.parse(planForNextPeriodDTO);

    await setDoc(docRef, validatedPlanForNextPeriodDTO);

    return validatedPlanForNextPeriodDTO;
  }

  /**
   * Update PlanForNextPeriodDTO
   */
  public static async updatePLanForNextPeriodDTO(planForNextPeriodDTO: PlanForNextPeriodDTO, uuid: string) {
    const validatedPlanForNextPeriodDTO = PlanForNextPeriodDTOSchema.parse(planForNextPeriodDTO);

    await updateDoc(doc(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION, uuid), validatedPlanForNextPeriodDTO);
  }

  /**
   * Delete PlanForNextPeriodDTO
   */
  public static async deletePlanForNextPeriodDTO(planForNextPeriodDTOUuid: string) {
    deleteDoc(doc(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION, planForNextPeriodDTOUuid));
  }

  /**
   * Delete PlanForNextPeriod with batch
   */
  public static async deletePlanForNextPeriodDTOWithBatch(
    planForNextPeriodUuid: string,
    dayReportUuid: string,
    planForNextPeriodUuids: string[]) {
    const batch = writeBatch(db);
    const dayReportRef = doc(db, PATH_TO_DAY_REPORTS_COLLECTION, dayReportUuid);
    const planForNextPeriodRef = doc(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION, planForNextPeriodUuid);
    batch.update(dayReportRef, {planForNextPeriodUuids});
    batch.delete(planForNextPeriodRef);
    await batch.commit();
  }

}