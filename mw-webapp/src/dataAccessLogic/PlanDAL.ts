import {Plan} from "src/model/businessModel/Plan";
import {PlanService} from "src/service/PlanService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Provides methods to interact with the plans
 */
export class PlanDAL {

  /**
   * Create plan
   */
  public static async createPlan(ownerUuid: string, dayReportUuid: string): Promise<Plan> {
    const planDTO = await PlanService.createPlan({
      request: {
        dayReportUuid,
        description: "",
        ownerUuid,
        time: 0,
        isDone: false,
      },
    });

    const plan = new Plan({
      ...planDTO,
      updatedAt: new Date(planDTO.updatedAt),
      createdAt: new Date(planDTO.createdAt),
    });

    return plan;
  }

  /**
   * Update plan
   */
  public static async updatePlan(plan: PartialWithUuid<Plan>): Promise<Plan> {
    const updatedPlanDTO = await PlanService.updatePlan({
      planId: plan.uuid,
      request: plan,
    });

    const updatedPlan = new Plan({
      ...updatedPlanDTO,
      updatedAt: new Date(updatedPlanDTO.updatedAt),
      createdAt: new Date(updatedPlanDTO.createdAt),
    });

    return updatedPlan;
  }

  /**
   * Delete plan by UUID
   */
  public static async deletePlan (planId: string): Promise<void> {
    await PlanService.deletePlan({planId});
  }

}
