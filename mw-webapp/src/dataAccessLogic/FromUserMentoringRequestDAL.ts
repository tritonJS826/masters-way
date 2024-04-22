import {FromUserMentoringRequestService} from "src/service/FromUserMentoringRequestService";

/**
 * Provides methods to interact with the FromUserMentoringRequest
 */
export class FromUserMentoringRequestDAL {

  /**
   * Add mentorRequest to the way
   */
  public static async addMentorRequest(userUuid: string, wayUuid: string): Promise<void> {
    await FromUserMentoringRequestService.createFromUserMentoringRequest({
      request: {
        userUuid,
        wayUuid,
      },
    });
  }

  /**
   * Delete mentorRequest from the way
   */
  public static async deleteMentorRequest(userUuid: string, wayUuid: string): Promise<void> {
    await FromUserMentoringRequestService.deleteFromUserMentoringRequest({
      userUuid,
      wayUuid,
    });
  }

}
