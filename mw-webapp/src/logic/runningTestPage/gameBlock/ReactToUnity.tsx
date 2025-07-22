import {ReactUnityEventParameter} from "react-unity-webgl/distribution/types/react-unity-event-parameters";
import {QuestionResultReactToUnity} from "src/model/unity/QuestionResultReactToUnity";
import {QuestionUnity} from "src/model/unity/QuestionUnity";
import {SendUserAnsweredQuestionReactToUnity} from "src/model/unity/SendUserAnsweredQuestionReactToUnity";
import {SessionStateUpdatedReactToUnity} from "src/model/unity/SessionStateUpdatedReactToUnity";
import {UserCapturedTargetReactToUnity} from "src/model/unity/UserCapturedTargetReactToUnity";
import {UserJoinedSessionReactToUnity} from "src/model/unity/UserJoinedSessionReactToUnity";
import {UserReadyToStartPlayReactToUnity} from "src/model/unity/UserReadyToStartPlayReactToUnity";

const UnityListenerName = "ReactEventHandler" as const;

/**
 * Event names used to send from React to Unity.
 */
enum ReactToUnityEvents {
  QuestionListReceived = "HandleQuestionListReceived",
  SessionStateUpdated = "HandleSessionStateUpdated",
  UserJoinedSession = "HandleUserJoinedSession",
  UserReadyToStartPlay = "HandleUserReadyToStartPlay",
  HostStartedGame = "HandleHostStartedGame",
  UserCapturedTarget = "HandleUserCapturedTarget",
  UserAnsweredQuestion = "HandleUserAnsweredQuestion",
  UserAnswerHandledByServer = "HandleUserAnswerHandledByServer",
}

type SendMessage = (gameObjectName: string, methodName: string, parameter?: ReactUnityEventParameter) => void

type SendQuestionListReceivedParam = {

  /**
   * List of question
   */
  questions: QuestionUnity[];
};

/**
 * Event names used to send from React to Unity.
 */
export class ReactToUnity {

  /**
   * Send questions list to unity
   */
  public static sendQuestionListReceived(
    sendMessage: SendMessage,
  ): (payload: SendQuestionListReceivedParam) => void {
    return (payload: SendQuestionListReceivedParam) =>
      sendMessage(UnityListenerName, ReactToUnityEvents.QuestionListReceived, JSON.stringify(payload));
  }

  /**
   * Send session state updated
   */
  public static sendSessionStateUpdated(
    sendMessage: SendMessage,
  ): (payload: SessionStateUpdatedReactToUnity) => void {
    return (payload: SessionStateUpdatedReactToUnity) =>
      sendMessage(UnityListenerName, ReactToUnityEvents.SessionStateUpdated, JSON.stringify(payload));
  }

  /**
   * Send handled user answer to unity
   */
  public static sendUserJoinedSession(
    sendMessage: SendMessage,
  ): (payload: UserJoinedSessionReactToUnity) => void {
    return (payload: UserJoinedSessionReactToUnity) =>
      sendMessage(UnityListenerName, ReactToUnityEvents.UserJoinedSession, JSON.stringify(payload));
  }

  /**
   * Send handled user answer to unity
   */
  public static sendUserReadyToStartPlay(
    sendMessage: SendMessage,
  ): (payload: UserReadyToStartPlayReactToUnity) => void {
    return (payload: UserReadyToStartPlayReactToUnity) =>
      sendMessage(UnityListenerName, ReactToUnityEvents.UserReadyToStartPlay, JSON.stringify(payload));
  }

  /**
   * Send host started game
   */
  public static sendHostStartedGame(
    sendMessage: SendMessage,
  ): () => void {
    return () => {
      sendMessage(UnityListenerName, ReactToUnityEvents.HostStartedGame, JSON.stringify({}));
    };
  }

  /**
   * Send handled user answer to unity
   */
  public static sendUserCapturedTarget(
    sendMessage: SendMessage,
  ): (payload: UserCapturedTargetReactToUnity) => void {
    return (payload: UserCapturedTargetReactToUnity) =>
      sendMessage(UnityListenerName, ReactToUnityEvents.UserCapturedTarget, JSON.stringify(payload));
  }

  /**
   * Send handled user answer to unity
   */
  public static sendUserAnsweredQuestion(
    sendMessage: SendMessage,
  ): (payload: SendUserAnsweredQuestionReactToUnity) => void {
    return (payload: SendUserAnsweredQuestionReactToUnity) =>
      sendMessage(UnityListenerName, ReactToUnityEvents.UserAnsweredQuestion, JSON.stringify(payload));
  }

  /**
   * Send handled user answer to unity
   */
  public static sendUserAnswerHandledByServer(
    sendMessage: SendMessage,
  ): (payload: QuestionResultReactToUnity) => void {
    return (payload: QuestionResultReactToUnity) =>
      sendMessage(UnityListenerName, ReactToUnityEvents.UserAnswerHandledByServer, JSON.stringify(payload));
  }

}
