import {PlanJobTagService} from "src/service/PlanJobTagService";

/**
 * Params for {@link PlanJobTagDAL.createPlanJobTag}
 */
interface CreatePlanJobTagParams {

  /**
   * Tag uuid
   */
  jobTagUuid: string;

  /**
   * Plan uuid
   */
  planUuid: string;
}

/**
 * Provides methods to interact with the PlanJobTags
 */
export class PlanJobTagDAL {

  /**
   * Create planJobTag
   */
  public static async createPlanJobTag(requestParameters: CreatePlanJobTagParams): Promise<void> {
    await PlanJobTagService.createPlanJobTag({request: requestParameters});
  }

  /**
   * Delete planJobTag by UUID
   */
  public static async deletePlanJobTag(requestParameters: CreatePlanJobTagParams): Promise<void> {
    await PlanJobTagService.deletePlanJobTag({
      planId: requestParameters.planUuid,
      jobTagId: requestParameters.jobTagUuid,
    });
  }

}
