import {
  displayNotification,
  NotificationType,
} from "src/component/notification/displayNotification";
import {emitEvent} from "src/eventBus/EmitEvent";
import {
  HostStartedGamePayload,
  makeHostStartedGameEvent,
  makeTestConnectionClosedEvent,
  makeTestConnectionEstablishedEvent,
  makeTestRefreshTokenRequiredEvent,
  makeUserAnsweredQuestionEvent,
  makeUserAnswerHandledByServerEvent,
  makeUserCapturedTargetEvent,
  makeUserJoinedSessionEvent,
  makeUserReadyToStartPlayEvent,
  UserAnsweredQuestionPayload,
  UserAnswerHandledByServerPayload,
  UserCapturedTargetPayload,
  UserJoinedSessionPayload,
  UserReadyToStartPlayPayload,
} from "src/eventBus/events/test/TestEvents";
import {serviceWorkerStore, SystemNotificationTag} from "src/globalStore/ServiceWorkerStore";
import {tokenStore} from "src/globalStore/TokenStore";
import {BaseSocketEvent} from "src/service/socket/BaseSocketEvent";
import {
  BASE_RECONNECT_INTERVAL,
  HTTP_AUTHENTICATION_FAILED_CODE,
  MAX_RECONNECT_INTERVAL, MULTIPLICAND,
} from "src/service/socket/SocketConfig";
import {env} from "src/utils/env/env";

let currentReconnectInterval = BASE_RECONNECT_INTERVAL;

/**
 * Connect to mw-test-websocket
 */
export const connectTestSocket = (sessionUuid: string) => {
  const socket = new WebSocket(
    env.API_MW_TEST_WEBSOCKET_PATH +
      `?token=${encodeURIComponent(tokenStore.accessToken ?? "")}&sessionUuid=${sessionUuid}`,
  );

  /**
   * Handler triggered on connection open
   */
  socket.onopen = () => {
    emitEvent(makeTestConnectionEstablishedEvent({}));
    currentReconnectInterval = BASE_RECONNECT_INTERVAL;
  };

  /**
   * Handler triggered on connection close
   */
  socket.onclose = (event: CloseEvent) => {
    if (event.code === HTTP_AUTHENTICATION_FAILED_CODE) {
      emitEvent(makeTestRefreshTokenRequiredEvent({}));
    }

    emitEvent(makeTestConnectionClosedEvent({}));

    setTimeout(connectTestSocket, currentReconnectInterval);

    currentReconnectInterval = Math.min(currentReconnectInterval * MULTIPLICAND, MAX_RECONNECT_INTERVAL);
  };

  /**
   * Handler triggered on error with websocket
   */
  socket.onerror = () => {
    displayNotification({
      text: "Test websocket error! Try to reconnect!",
      type: NotificationType.ERROR,
    });
  };

  /**
   * Message handlers
   */
  socket.onmessage = (eventRaw: MessageEvent<string>) => {
    const event = new BaseSocketEvent(JSON.parse(eventRaw.data));

    switch (event.type) {
      case "mw-test-websocket:user-joined-session":
        emitEvent(makeUserJoinedSessionEvent(event.payload as UserJoinedSessionPayload));
        serviceWorkerStore.systemNotification({
          title: "Somebody joined to the game!",
          text: `${(event.payload as UserJoinedSessionPayload).userUuid} joined! `,
          tag: SystemNotificationTag.TEST,
        });
        break;
      case "mw-test-websocket:user-ready-to-start-play":
        emitEvent(makeUserReadyToStartPlayEvent(event.payload as UserReadyToStartPlayPayload));
        serviceWorkerStore.systemNotification({
          title: "New message!",
          text: `${(event.payload as UserReadyToStartPlayPayload).userUuid} is ready to start!`,
          tag: SystemNotificationTag.TEST,
        });
        break;
      case "mw-test-websocket:host-started-game":
        emitEvent(makeHostStartedGameEvent(event.payload as HostStartedGamePayload));
        // ServiceWorkerStore.systemNotification({
        //   title: "New message!",
        //   text: `${(event.payload as HostStartedGamePayload).userId} is ready to start!`,
        //   tag: SystemNotificationTag.TEST,
        // });
        break;
      case "mw-test-websocket:user-captured-target":
        emitEvent(makeUserCapturedTargetEvent(event.payload as UserCapturedTargetPayload));
        break;
      case "mw-test-websocket:user-answered-question":
        emitEvent(makeUserAnsweredQuestionEvent(event.payload as UserAnsweredQuestionPayload));
        break;
      case "mw-test-websocket:user-answer-handled-by-server":
        emitEvent(makeUserAnswerHandledByServerEvent(event.payload as UserAnswerHandledByServerPayload));
        break;
      default:
        displayNotification({
          type: NotificationType.ERROR,
          text: "Undefined message name from test",
        });
    }
  };

  return socket;
};
