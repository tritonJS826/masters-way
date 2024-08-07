import {CreateFromUserMentoringRequestRequest, DeleteFromUserMentoringRequestRequest} from "src/apiAutogenerated/general";
import {fromUserMentoringRequest} from "src/service/services";

/**
 * Provides methods to interact with the FromUserMentoringRequest
 */
export class FromUserMentoringRequestService {

  /**
   * Create from user mentoring request
   */
  public static async createFromUserMentoringRequest(requestParameters: CreateFromUserMentoringRequestRequest): Promise<void> {
    await fromUserMentoringRequest.createFromUserMentoringRequest(requestParameters);
  }

  /**
   * Delete from user mentoring request
   */
  public static async deleteFromUserMentoringRequest(requestParameters: DeleteFromUserMentoringRequestRequest): Promise<void> {
    await fromUserMentoringRequest.deleteFromUserMentoringRequest(requestParameters);
  }

}

