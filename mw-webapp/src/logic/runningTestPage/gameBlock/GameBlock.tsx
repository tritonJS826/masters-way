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
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {RunningGameStore} from "src/logic/runningTestPage/gameBlock/RunningGameStore";
import {QuestionUnity} from "src/model/businessModel/QuestionUnity";
import {Question} from "src/model/businessModel/Test";
import {pages} from "src/router/pages";
import styles from "src/logic/runningTestPage/gameBlock/GameBlock.module.scss";

/**
 * Event names used to send from Unity to React.
 */
enum UnityToReactEvents {
  GameFinished = "GameFinished",
  GameStarted = "GameStarted",
  UserAnsweredQuestion = "UserAnsweredQuestion",
  UserCapturedTarget = "UserCapturedTarget",
}

const UnityListenerName = "ReactEventHandler" as const;

/**
 * Event names used to send from React to Unity.
 */
enum ReactToUnityEvents {
  QuestionListReceived = "HandleQuestionListReceived",
  UserAnswerHandledByServer = "HandleUserAnswerHandledByServer"
}

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
  const questionUnity = new QuestionUnity({
    name: question.name,
    answer: question.answer,
    order: question.order,
    questionText: question.questionText,
    uuid: question.uuid,
    timeToAnswer: question.timeToAnswer,
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
   * Send questions list to unity
   */
  const sendQuestionListReceived = (questionsUnityListJSON: string) => {
    sendMessage(UnityListenerName, ReactToUnityEvents.QuestionListReceived, questionsUnityListJSON);
  };

  /**
   * Send handled user answer to unity
   */
  const sendUserAnswerHandledByServer = (questionResultJSON: string) => {
    sendMessage(UnityListenerName, ReactToUnityEvents.UserAnswerHandledByServer, questionResultJSON);
  };

  /**
   * Handle event game finished
   */
  const handleGameFinished = () => {
    TestSessionResultDAL.createTestSessionResult({
      sessionUuid: props.sessionUuid,
      testUuid: props.testUuid,
    })
      .then(() => navigate(pages.resultTest.getPath({testUuid: props.testUuid, sessionUuid: props.testUuid})));
  };

  /**
   * Handle event user answered question
   */
  const handleUserAnsweredQuestion = (questionUuid: unknown, userAnswer: unknown) => {
    AiQuestionResultDAL.createQuestionResult({
      // TODO: do we need to send this isOk field?
      isOk: runningGameStore.activeQuestion.answer === "inputValue",
      questionUuid: questionUuid as string,
      userAnswer: userAnswer as string,
      resultDescription: "",
      testSessionUuid: props.sessionUuid,
      testUuid: props.testUuid,
      userUuid: props.userUuid,
      language,
    })
      .then(JSON.stringify)
      .then(sendUserAnswerHandledByServer);
  };

  /**
   * Handle event game started
   */
  const handleGameStarted = () => {
    // TODO: dangerous. If test was not loaded before unity the whole pipeline wil be broken
    setIsUnityDownloaded(true);
  };

  /**
   * Handle event user captured another target
   * TODO: skipped for single player
   * TODO: use debounce logic here (1 second)
   */
  const handleUserCapturedTarget = () => {
    // Skip for now
  };

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

  if (!runningGameStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  if (isLoading) {
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

    const questionsUnityListJSON = JSON.stringify({questions: questionsUnityList});
    sendQuestionListReceived(questionsUnityListJSON);
  };

  return (
    <VerticalContainer className={styles.gamePageWrapper}>
      <VerticalContainer className={styles.gameBlock}>
        <Button
          onClick={sendQuestionsToUnity}
          value={(isUnityDownloaded && runningGameStore.isInitialized) ? "Let's go!!" : "Loading..."}
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
