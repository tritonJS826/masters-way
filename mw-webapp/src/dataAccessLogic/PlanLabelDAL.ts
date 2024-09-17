import {PlanLabelService} from "src/service/PlanLabelService";

/**
 * Params for {@link PlanLabelDAL.createPlanLabel}
 */
interface CreatePlanLabelParams {

  /**
   * Label uuid
   */
  labelUuid: string;

  /**
   * Plan uuid
   */
  planUuid: string;
}

/**
 * Provides methods to interact with the PlanLabel
 */
export class PlanLabelDAL {

  /**
   * Create plan label
   */
  public static async createPlanJobTag(requestParameters: CreatePlanLabelParams): Promise<void> {
    await PlanLabelService.createPlanLabel({request: requestParameters});
  }

  /**
   * Delete plan label by UUID
   */
  public static async deletePlanJobTag(requestParameters: CreatePlanLabelParams): Promise<void> {
    await PlanLabelService.deletePlanLabel({
      planId: requestParameters.planUuid,
      labelId: requestParameters.labelUuid,
    });
  }

}
