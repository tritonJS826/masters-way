import {Label} from "src/model/businessModel/Label";
import {Plan} from "src/model/businessModel/Plan";
import {PlanService} from "src/service/PlanService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Create Plan params
 */
interface CreatePlanParams {

  /**
   * Owner UUID
   */
  ownerUuid: string;

  /**
   * DayReport UUID
   */
  dayReportUuid: string;

  /**
   * Way's UUID
   */
  wayUuid: string;

  /**
   * Way's name
   */
  wayName: string;

}

/**
 * Update Plan params
 */
interface UpdatePlanParams {

  /**
   * Partial comment to update
   */
  plan: PartialWithUuid<Plan>;

  /**
   * Way's UUID
   */
  wayUuid: string;

  /**
   * Way's name
   */
  wayName: string;
}

/**
 * Provides methods to interact with the plans
 */
export class PlanDAL {

  /**
   * Create plan
   */
  public static async createPlan(params: CreatePlanParams): Promise<Plan> {
    const planDTO = await PlanService.createPlan({
      request: {
        dayReportUuid: params.dayReportUuid,
        description: "",
        ownerUuid: params.ownerUuid,
        time: 0,
        isDone: false,
      },
    });

    const plan = new Plan({
      ...planDTO,
      updatedAt: new Date(planDTO.updatedAt),
      createdAt: new Date(planDTO.createdAt),
      wayName: params.wayName,
      wayUuid: params.wayUuid,
      tags: planDTO.tags.map((label) => new Label(label)),
    });

    return plan;
  }

  /**
   * Update plan
   */
  public static async updatePlan(params: UpdatePlanParams): Promise<Plan> {
    const updatedPlanDTO = await PlanService.updatePlan({
      planId: params.plan.uuid,
      request: params.plan,
    });

    const updatedPlan = new Plan({
      ...updatedPlanDTO,
      updatedAt: new Date(updatedPlanDTO.updatedAt),
      createdAt: new Date(updatedPlanDTO.createdAt),
      wayName: params.wayName,
      wayUuid: params.wayUuid,
      tags: updatedPlanDTO.tags.map((label) => new Label(label)),
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
