import {currentSessionStateDTOToCurrentSessionState}
  from "src/dataAccessLogic/DTOToPreviewConverter/currentSessionStateDTOToCurrentSessionState";
import {CurrentSessionState} from "src/model/businessModel/CurrentSessionState";
import {TestWebsocketService} from "src/service/TestWebsocketService";

/**
 * User joined session params
 */
export interface UserJoinedSessionParams {

    /**
     * Session uuid
     */
    sessionUuid: string;

    /**
     * Session uuid
     */
    userUuid: string;
}

/**
 * User ready to start play params
 */
export interface UserReadyToStartPlayParams {

    /**
     * Session uuid
     */
    sessionUuid: string;

    /**
     * Session uuid
     */
    userUuid: string;
}

/**
 * Host started game
 */
export interface HostStartedGameParams {

    /**
     * Session uuid
     */
    sessionUuid: string;

    /**
     * Session uuid
     */
    userUuid: string;
}

/**
 * User captured target params
 */
export interface UserCapturedTargetParams {

    /**
     * Session uuid
     */
    sessionUuid: string;

    /**
     * Session uuid
     */
    userUuid: string;

    /**
     * Question uuid
     */
    questionUuid: string;
}

/**
 * Provides methods to interact with the TestSessionResult
 */
export class TestWebsocketDAL {

  /**
   * Send user joined session event
   */
  public static async SendUserJoinedSessionEvent(params: UserJoinedSessionParams): Promise<CurrentSessionState> {
    const currentSessionStateDTO = await TestWebsocketService
      .sendUserJoinedSessionEvent({sessionUuid: params.sessionUuid, request: {userUuid: params.userUuid}});

    const currentSessionState = currentSessionStateDTOToCurrentSessionState(currentSessionStateDTO);

    return currentSessionState;
  }

  /**
   * Send user joined session event
   */
  public static async sendUserReadyToStartPlayEvent(params: UserReadyToStartPlayParams): Promise<void> {
    await TestWebsocketService
      .sendUserReadyToStartPlayEvent({sessionUuid: params.sessionUuid, request: {userUuid: params.userUuid}});

    return;
  }

  /**
   * Send user joined session event
   */
  public static async sendHostStartedGameEvent(params: HostStartedGameParams): Promise<void> {
    await TestWebsocketService
      .sendHostStartedGameEvent({sessionUuid: params.sessionUuid, request: {userUuid: params.userUuid}});

    return;
  }

  /**
   * Send user joined session event
   */
  public static async sendUserCapturedTargetEvent(params: UserCapturedTargetParams): Promise<void> {
    await TestWebsocketService
      .sendUserCapturedTargetEvent({
        sessionUuid: params.sessionUuid,
        request: {
          userUuid: params.userUuid,
          questionUuid: params.questionUuid,
        },
      });

    return;
  }

}

