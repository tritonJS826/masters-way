import {CompanionFeedback} from "src/model/businessModel/CompanionFeedback";
import {CompanionService} from "src/service/CompanionService";

/**
 * Companion data access layer
 */
export class CompanionDAL {

  /**
   * Get companion feedback for a way
   * @param wayUuid - Way UUID
   * @returns Companion feedback model
   */
  public static async getCompanionFeedback(wayUuid: string): Promise<CompanionFeedback> {
    const feedback = await CompanionService.getCompanionFeedback({wayId: wayUuid});

    return new CompanionFeedback(feedback);
  }

}
