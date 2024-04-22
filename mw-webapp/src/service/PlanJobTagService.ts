import {CreatePlanJobTagRequest, DeletePlanJobTagRequest} from "src/apiAutogenerated";
import {planJobTagService} from "src/service/services";

/**
 * Provides methods to interact with the PanJobTags
 */
export class PlanJobTagService {

  /**
   * Create plan job tag
   */
  public static async createPlanJobTag(requestParameters: CreatePlanJobTagRequest): Promise<void> {
    await planJobTagService.createPlanJobTag(requestParameters);
  }

  /**
   * Delete plan job tag by UUID
   */
  public static async deletePlanJobTag(requestParameters: DeletePlanJobTagRequest): Promise<void> {
    await planJobTagService.deletePlanJobTag(requestParameters);
  }

}
