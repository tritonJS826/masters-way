import {PlanLabelService} from "src/service/PlanLabelService";

/**
 * Params for {@link PlanLabelDAL.createPlanLabel}
 */
interface CreateDeletePlanLabelParams {

  /**
   * Label uuid
   */
  jobTagUuid: string;

  /**
   * Plan uuid
   */
  planUuid: string;
}

/**
 * Provides methods to interact with the PlanLabels
 */
export class PlanLabelDAL {

  /**
   * Create plan label
   */
  public static async createPlanLabel(requestParameters: CreateDeletePlanLabelParams): Promise<void> {
    await PlanLabelService.createPlanLabel({request: requestParameters});
  }

  /**
   * Delete plan label by UUID
   */
  public static async deletePlanLabel(requestParameters: CreateDeletePlanLabelParams): Promise<void> {
    await PlanLabelService.deletePlanLabel({
      planId: requestParameters.planUuid,
      jobTagId: requestParameters.jobTagUuid,
    });
  }

}
