import {FromUserMentoringRequestService} from "src/service/FromUserMentoringRequestService";

/**
 * Provides methods to interact with the mentorRequests
 */
export class MentorRequestDAL {

  /**
   * Create mentorRequest
   */
  public static async createMentorRequest(userUuid: string, wayUuid: string): Promise<void> {
    await FromUserMentoringRequestService.createFromUserMentoringRequest({
      request: {
        userUuid,
        wayUuid,
      },
    });
  }

  /**
   * Delete mentorRequest
   */
  public static async deleteMentorRequest(userUuid: string, wayUuid: string): Promise<void> {
    await FromUserMentoringRequestService.deleteFromUserMentoringRequest({
      userUuid,
      wayUuid,
    });
  }

}
