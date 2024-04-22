import {MentorUserWayService} from "src/service/MentorUserWayService";

/**
 * Provides methods to interact with the MentorUserWay
 */
export class MentorUserWayDAL {

  /**
   * Add mentor to the way
   */
  public static async addMentor(userUuid: string, wayUuid: string): Promise<void> {
    await MentorUserWayService.addMentorUserWay({
      request: {
        userUuid,
        wayUuid,
      },
    });
  }

  /**
   * Delete mentor from the way
   */
  public static async deleteMentor(userUuid: string, wayUuid: string): Promise<void> {
    await MentorUserWayService.deleteMentorUserWay({
      request: {
        userUuid,
        wayUuid,
      },
    });
  }

}
