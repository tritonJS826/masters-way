import {ToUserMentoringRequestService} from "src/service/ToUserMentoringRequestService";

/**
 * Provides methods to interact with the mentorRequests
 */
export class MentorRequestDAL {

  /**
   * Create mentorRequest
   */
  public static async createMentorRequest(userUuid: string, wayUuid: string): Promise<void> {
    await ToUserMentoringRequestService.createToUserMentoringRequest({
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
    await ToUserMentoringRequestService.deleteToUserMentoringRequest({
      userUuid,
      wayUuid,
    });
  }

}
