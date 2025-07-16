import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Unity, useUnityContext} from "react-unity-webgl";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Footer} from "src/component/footer/Footer";
import {Loader} from "src/component/loader/Loader";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {AiQuestionResultDAL} from "src/dataAccessLogic/AiQuestionResultDAL";
import {TestSessionResultDAL} from "src/dataAccessLogic/TestSessionResultDAL";
import {TestWebsocketDAL} from "src/dataAccessLogic/TestWebsocketDAL";
import {emitEvent} from "src/eventBus/EmitEvent";
import {ChannelId} from "src/eventBus/EventBusChannelDict";
import {TestEventId} from "src/eventBus/events/test/TestEventDict";
import {
  makeSessionStateUpdatedEvent,
  SessionStateUpdatedPayload,
  UserAnsweredQuestionPayload,
  UserAnswerHandledByServerPayload,
  UserCapturedTargetPayload,
  UserJoinedSessionPayload,
  UserReadyToStartPlayPayload,
} from "src/eventBus/events/test/TestEvents";
import {useListenEventBus} from "src/eventBus/useListenEvent";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {ReactToUnity} from "src/logic/runningTestPage/gameBlock/ReactToUnity";
import {RunningGameStore} from "src/logic/runningTestPage/gameBlock/RunningGameStore";
import {UnityToReactEvents} from "src/logic/runningTestPage/gameBlock/UnityToReact";
import {Question} from "src/model/businessModel/Test";
import {QuestionUnity} from "src/model/unity/QuestionUnity";
import {pages} from "src/router/pages";
import {connectTestSocket} from "src/service/socket/TestSocket";
import styles from "src/logic/runningTestPage/gameBlock/GameBlock.module.scss";

/**
 * Parameters for test game
 */
interface GameBlockProps {

  /**
   * Test's Uuid
   */
  testUuid: string;

  /**
   * Session's Uuid
   */
  sessionUuid: string;

  /**
   * User's uuid
   */
  userUuid: string;
}

/**
 * Converter Question to QuestionUnity
 */
const questionToQuestionUnity = (question: Question) => {
  const DEFAULT_TIME_TO_ANSWER_UNITY = question.timeToAnswer;
  const questionUnity = new QuestionUnity({
    name: question.name,
    answer: question.answer,
    order: question.order,
    questionText: question.questionText,
    uuid: question.uuid,
    timeToAnswer: question.timeToAnswer >= 0 ? question.timeToAnswer : DEFAULT_TIME_TO_ANSWER_UNITY,
  });

  return questionUnity;
};

/**
 * Game block
 * TODO: probably it should not be separate page, but should be placed in runningTestPage as just one of possible views
 */
export const GameBlock = observer((props: GameBlockProps) => {
  const navigate = useNavigate();
  const {language} = languageStore;
  const {theme} = themeStore;
  const {user, isLoading} = userStore;

  const [isUnityDownloaded, setIsUnityDownloaded] = useState<boolean>(false);

  const runningGameStore = useStore<
  new (testUuid: string) => RunningGameStore,
  [string, string], RunningGameStore>({
      storeForInitialize: RunningGameStore,
      dataForInitialization: [props.testUuid],
      dependency: [props.testUuid, props.userUuid],
    });

  const {unityProvider, sendMessage, addEventListener, removeEventListener} = useUnityContext({
    loaderUrl: "/sol/build/Build/build.loader.js",
    dataUrl: "/sol/build/Build/build.data.unityweb",
    frameworkUrl: "/sol/build/Build/build.framework.js.unityweb",
    codeUrl: "/sol/build/Build/build.wasm.unityweb",
  });

  /**
   * Handle event game finished
   */
  const handleGameFinished = () => {
    // TODO: minus token if it is AI request
    // TODO: only host user should create test session results
    TestSessionResultDAL.createTestSessionResult({
      sessionUuid: props.sessionUuid,
      testUuid: props.testUuid,
    })
      .then(() => navigate(pages.resultTest.getPath({testUuid: props.testUuid, sessionUuid: props.sessionUuid})));
  };

  /**
   * Handle event user answered question
   */
  const handleUserAnsweredQuestion = (questionUuid: unknown, userAnswer: unknown) => {
    // TODO: minus token if it is AI request
    AiQuestionResultDAL.createQuestionResult({
      // TODO: do we need to send this isOk field?
      isOk: runningGameStore.getIsRightAnswerByQuestionUuid(questionUuid as string, userAnswer as string),
      questionUuid: questionUuid as string,
      userAnswer: userAnswer as string,
      resultDescription: "",
      testSessionUuid: props.sessionUuid,
      testUuid: props.testUuid,
      userUuid: props.userUuid,
      language,
    });
    // TODO: remove it after test
    // Probably we should do it after receiving event from sol websocket
    // Event listener already added
    // just remove next line after adding multiplayer mode
    // .then((answer) => ReactToUnity.sendUserAnswerHandledByServer(sendMessage)({
    //   isOk: answer.isOk,
    //   questionAnswer: answer.questionAnswer,
    //   questionDescription: answer.questionDescription,
    //   questionName: answer.questionName,
    //   questionUuid: answer.questionUuid,
    //   resultDescription: answer.resultDescription,
    //   userAnswer: answer.userAnswer,
    //   userUuid: answer.userUuid,
    //   uuid: answer.uuid,
    // }));
  };

  /**
   * Handle event game started
   * TODO: temporal thing - game should be started from unity
   */
  const handleGameStarted = () => {
    if (!user?.uuid) {
      return;
    }

    setIsUnityDownloaded(true);

    TestWebsocketDAL.SendUserJoinedSessionEvent({
      sessionUuid: props.sessionUuid,
      userUuid: user.uuid,
    }).then((currentSessionState) => {
      // Let's exclude owner from the list
      // probably we should send owner uuid also to the unity to provide consistent logic for all users

      emitEvent(makeSessionStateUpdatedEvent({
        currentUsers: currentSessionState.currentUsers,
        selfUserUuid: user.uuid,
      }));
    });
  };

  /**
   * Handle event user captured another target
   * TODO: use debounce logic here maybe?
   */
  const handleUserCapturedTarget = () => {
    // TODO: will be implemented for multiplayer
  };

  useEffect(() => {
    if (!user?.uuid) {
      return;
    }

    // In dev mode this line called twice which leads to error.
    // This error is annoying pretty safe and does not exist in production
    const socket = connectTestSocket(props.sessionUuid);

    return () => {
      socket.close();
    };

  }, [user?.uuid]);

  // Set unity to react listeners
  useEffect(() => {
    addEventListener(UnityToReactEvents.GameFinished, handleGameFinished);
    addEventListener(UnityToReactEvents.GameStarted, handleGameStarted);
    addEventListener(UnityToReactEvents.UserAnsweredQuestion, handleUserAnsweredQuestion);
    addEventListener(UnityToReactEvents.UserCapturedTarget, handleUserCapturedTarget);

    return () => {
      removeEventListener(UnityToReactEvents.GameFinished, handleGameFinished);
      removeEventListener(UnityToReactEvents.GameStarted, handleGameStarted);
      removeEventListener(UnityToReactEvents.UserAnsweredQuestion, handleUserAnsweredQuestion);
      removeEventListener(UnityToReactEvents.UserCapturedTarget, handleUserCapturedTarget);
    };
  }, [addEventListener, removeEventListener, sendMessage]);

  useListenEventBus(ChannelId.TEST, TestEventId.SESSION_STATE_UPDATED, (payload: SessionStateUpdatedPayload) => {
    ReactToUnity.sendSessionStateUpdated(sendMessage)(payload);
  });
  useListenEventBus(ChannelId.TEST, TestEventId.USER_JOINED_SESSION, (payload: UserJoinedSessionPayload) => {
    ReactToUnity.sendUserJoinedSession(sendMessage)(payload);
  });
  useListenEventBus(ChannelId.TEST, TestEventId.USER_READY_TO_START_PLAY, (payload: UserReadyToStartPlayPayload) => {
    ReactToUnity.sendUserReadyToStartPlay(sendMessage)(payload);
  });
  useListenEventBus(ChannelId.TEST, TestEventId.HOST_STARTED_GAME, () => {
    ReactToUnity.sendHostStartedGame(sendMessage)();
  });
  useListenEventBus(ChannelId.TEST, TestEventId.USER_CAPTURED_TARGET, (payload: UserCapturedTargetPayload) => {
    ReactToUnity.sendUserCapturedTarget(sendMessage)(payload);
  });
  useListenEventBus(ChannelId.TEST, TestEventId.USER_ANSWERED_QUESTION, (payload: UserAnsweredQuestionPayload) => {
    ReactToUnity.sendUserAnsweredQuestion(sendMessage)(payload);
  });
  useListenEventBus(ChannelId.TEST, TestEventId.USER_ANSWER_HANDLED_BY_SERVER, (payload: UserAnswerHandledByServerPayload) => {
    ReactToUnity.sendUserAnswerHandledByServer(sendMessage)(payload);
  });

  if (isLoading || !runningGameStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  if (!user) {
    throw new Error("User is not defined");
  }

  /**
   * Send questions to unity
   */
  const sendQuestionsToUnity = () => {
    const questionsUnityList = runningGameStore.test.questions.map(questionToQuestionUnity);
    ReactToUnity.sendQuestionListReceived(sendMessage)({questions: questionsUnityList});
  };

  return (
    <VerticalContainer className={styles.gamePageWrapper}>
      <VerticalContainer className={styles.gameBlock}>
        <Button
          onClick={sendQuestionsToUnity}
          value={(isUnityDownloaded && runningGameStore.isInitialized) ? "Let's go!!" : "Loading... (I should be in the unity)"}
          isDisabled={!runningGameStore.isInitialized}
          buttonType={ButtonType.PRIMARY}
        />

        <Unity
          unityProvider={unityProvider}
          style={{width: "100%"}}
        />
      </VerticalContainer>

      <Footer language={language} />
    </VerticalContainer>
  );

});
