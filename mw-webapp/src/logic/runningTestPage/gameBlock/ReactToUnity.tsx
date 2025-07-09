import {ReactUnityEventParameter} from "react-unity-webgl/distribution/types/react-unity-event-parameters";
import {QuestionResultReactToUnity} from "src/model/unity/QuestionResultReactToUnity";
import {QuestionUnity} from "src/model/unity/QuestionUnity";
import {SendUserAnsweredQuestionReactToUnity} from "src/model/unity/SendUserAnsweredQuestionReactToUnity";
import {UserCapturedTargetReactToUnity} from "src/model/unity/UserCapturedTargetReactToUnity";
import {UserJoinedSessionReactToUnity} from "src/model/unity/UserJoinedSessionReactToUnity";

const UnityListenerName = "ReactEventHandler" as const;

/**
 * Event names used to send from React to Unity.
 */
enum ReactToUnityEvents {
  QuestionListReceived = "HandleQuestionListReceived",
  UserAnswerHandledByServer = "HandleUserAnswerHandledByServer",
  UserJoinedSession = "HandleUserJoinedSession",
  UserCapturedTarget = "HandleUserCapturedTarget",
  UserAnsweredQuestion = "HandleUserAnsweredQuestion",
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
  ): (questionsUnityList: SendQuestionListReceivedParam) => void {
    return (questionsUnityListJSON: SendQuestionListReceivedParam) =>
      sendMessage(UnityListenerName, ReactToUnityEvents.QuestionListReceived, JSON.stringify(questionsUnityListJSON));
  }

  /**
   * Send handled user answer to unity
   */
  public static sendUserAnswerHandledByServer(
    sendMessage: SendMessage,
  ): (questionResult: QuestionResultReactToUnity) => void {
    return (questionResult: QuestionResultReactToUnity) =>
      sendMessage(UnityListenerName, ReactToUnityEvents.UserAnswerHandledByServer, JSON.stringify(questionResult));
  }

  /**
   * Send handled user answer to unity
   */
  public static sendUserJoinedSession(
    sendMessage: SendMessage,
  ): (questionResult: UserJoinedSessionReactToUnity) => void {
    return (questionResult: UserJoinedSessionReactToUnity) =>
      sendMessage(UnityListenerName, ReactToUnityEvents.UserJoinedSession, JSON.stringify(questionResult));
  }

  /**
   * Send handled user answer to unity
   */
  public static sendUserCapturedTarget(
    sendMessage: SendMessage,
  ): (questionResult: UserCapturedTargetReactToUnity) => void {
    return (questionResult: UserCapturedTargetReactToUnity) =>
      sendMessage(UnityListenerName, ReactToUnityEvents.UserCapturedTarget, JSON.stringify(questionResult));
  }

  /**
   * Send handled user answer to unity
   */
  public static sendUserAnsweredQuestion(
    sendMessage: SendMessage,
  ): (questionResult: SendUserAnsweredQuestionReactToUnity) => void {
    return (questionResult: SendUserAnsweredQuestionReactToUnity) =>
      sendMessage(UnityListenerName, ReactToUnityEvents.UserAnsweredQuestion, JSON.stringify(questionResult));
  }

}
