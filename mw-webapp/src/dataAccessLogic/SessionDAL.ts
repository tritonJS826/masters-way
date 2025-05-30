import {sessionService} from "src/service/services";

/**
 * Create test session params
 */
export interface CreateTestSessionParams {

  /**
   * Session uuid
   */
  sessionUuid: string;

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
  ): Promise<void> {
    await sessionService.sessionPost({request: {userUuid: params.sessionUuid}});

    // Return session;
  }

}

