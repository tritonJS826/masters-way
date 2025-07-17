import {
  HostStartedGamePayload,
  SessionStateUpdatedPayload,
  TestConnectionClosedPayload,
  TestConnectionEstablishedPayload,
  TestRefreshTokenRequiredPayload,
  UserAnsweredQuestionPayload,
  UserAnswerHandledByServerPayload,
  UserCapturedTargetPayload,
  UserJoinedSessionPayload,
  UserReadyToStartPlayPayload,
} from "src/eventBus/events/test/TestEvents";

/**
 * All event ids for test channel.
 *
 * Every event should be business oriented, not technical.
 *
 * There is separate enum for every channel because events
 * should be unique for every channel.
 *
 * Include channel name in event name for debugging and uniqueness.
 */
export enum TestEventId {
  USER_ANSWER_HANDLED_BY_SERVER = "MW_TEST:USER_ANSWER_HANDLED_BY_SERVER",
  USER_JOINED_SESSION = "MW_TEST:USER_JOINED_SESSION",
  USER_READY_TO_START_PLAY = "MW:TEST:USER_READY_TO_START_PLAY",
  USER_CAPTURED_TARGET = "MW_TEST:USER_CAPTURED_TARGET",
  USER_ANSWERED_QUESTION = "MW_TEST:USER_ANSWERED_QUESTION",
  HOST_STARTED_GAME = "MW_TEST:HOWT_STARTED_GAME",
  CONNECTION_ESTABLISHED = "MW_TEST:CONNECTION_ESTABLISHED",
  CONNECTION_CLOSED = "MW_TEST:CONNECTION_CLOSED",
  REFRESH_TOKEN_REQUIRED = "MW_TEST:REFRESH_TOKEN_REQUIRED",
  SESSION_STATE_UPDATED = "MW_TEST:SESSION_STATE_UPDATED"
}

/**
 * Dictionary of all events for test channel.
 * Key is event type, value is event payload.
 */
export type TestEventDict = {

  /**
   * User joined to the room created
   */
  [TestEventId.USER_JOINED_SESSION]: UserJoinedSessionPayload;

  /**
   * User is ready to start to play sol. Game will started when all joined users will be ready.
   */
  [TestEventId.USER_READY_TO_START_PLAY]: UserReadyToStartPlayPayload;

  /**
   * User captured another target in the sol unity game mw-test-websocket
   */
  [TestEventId.USER_CAPTURED_TARGET]: UserCapturedTargetPayload;

 /**
  * User submit answer to question
  */
  [TestEventId.USER_ANSWERED_QUESTION]: UserAnsweredQuestionPayload;

  /**
   * User answered in question and it was handled on server from mw-test-websocket
   */
  [TestEventId.USER_ANSWER_HANDLED_BY_SERVER]: UserAnswerHandledByServerPayload;

  /**
   * Host started game
   */
  [TestEventId.HOST_STARTED_GAME]: HostStartedGamePayload;

  /**
   * Session data was updated
   */
  [TestEventId.SESSION_STATE_UPDATED]: SessionStateUpdatedPayload;

  /**
   * Connection to mw-test-websocket established
   */
  [TestEventId.CONNECTION_ESTABLISHED]: TestConnectionEstablishedPayload;

  /**
   * Connections to mw-test-websocket closed
   */
  [TestEventId.CONNECTION_CLOSED]: TestConnectionClosedPayload;

  /**
   * Refresh token required
   */
  [TestEventId.REFRESH_TOKEN_REQUIRED]: TestRefreshTokenRequiredPayload;
};
