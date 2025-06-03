import {sessionService} from "src/service/services";

/**
 * Create test session params
 */
export interface CreateTestSessionParams {

  /**
   * User uuid
   */
  userUuid: string;

}

/**
 * Provides methods to interact with the Sessions
 */
export class SessionDAL {

  /**
   * Create session
   */
  public static async createSession(
    params: CreateTestSessionParams,
  ): Promise<string> {
    const sessionUuid = await sessionService.sessionPost({request: {userUuid: params.userUuid}});

    return sessionUuid.sessionUuid;
  }

}

