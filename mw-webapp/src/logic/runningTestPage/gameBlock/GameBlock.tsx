import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Unity, useUnityContext} from "react-unity-webgl";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Footer} from "src/component/footer/Footer";
import {Loader} from "src/component/loader/Loader";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {RunningGameStore} from "src/logic/runningTestPage/gameBlock/RunningGameStore";
import {QuestionUnity} from "src/model/businessModel/QuestionUnity";
import {pages} from "src/router/pages";
import styles from "src/logic/runningTestPage/gameBlock/GameBlock.module.scss";

/**
 * Event names used to send from Unity to React.
 */
enum UnityToReactEvents {
  GameFinished = "GameFinished",
  // TODO: replace with "GameStarted"
  GameStarted = "GameStart",
  UserAnsweredQuestion = "UserAnsweredQuestion",
  UserCapturedTarget = "UserCapturedTarget",
}

/**
 * Event names used to send from React to Unity.
 */
enum ReactToUnityEvents {
  QuestionListReceived = "QuestionListReceived",
  UserAnswerHandledByServer = "UserAnswerHandledByServer"
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
 * Game block
 * TODO: probably it should not be separate page, but should be placed in runningTestPage as just one of possible views
 */
export const GameBlock = observer((props: GameBlockProps) => {
  const navigate = useNavigate();
  const {language} = languageStore;
  const {theme} = themeStore;
  const {user, isLoading} = userStore;

  const runningGameStore = useStore<
  new (testUuid: string) => RunningGameStore,
  [string, string], RunningGameStore>({
      storeForInitialize: RunningGameStore,
      dataForInitialization: [props.testUuid],
      dependency: [props.testUuid, props.userUuid],
    });

  if (!runningGameStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  const [isGameOverReact, setIsGameOver] = useState(false);
  const [scoreReact, setScore] = useState<string>(props.sessionUuid + props.testUuid);
  const {unityProvider, sendMessage, addEventListener, removeEventListener} = useUnityContext({
    loaderUrl: "/sol/build/Build/build.loader.js",
    dataUrl: "/sol/build/Build/build.data.unityweb",
    frameworkUrl: "/sol/build/Build/build.framework.js.unityweb",
    codeUrl: "/sol/build/Build/build.wasm.unityweb",
  });

  /**
   * TODO: remove this example
   */
  const sendCallUiTest = () => {
    // SendMessage(answer question)
    sendMessage("Canvas", "JsonTest", "dudli-didly");
  };

  /**
   * Send questions list to unity
   */
  const sendQuestionListReceived = (questionsUnityList: QuestionUnity) => {
    // TODO Place question list from server according the schema
    sendMessage("Canvas", ReactToUnityEvents.QuestionListReceived, questionsUnityList);
  };

  /**
   * Send handled user answer to unity
   */
  const sendUserAnswerHandledByServer = () => {
    // SendMessage(answer question)
    sendMessage("Canvas", ReactToUnityEvents.UserAnswerHandledByServer, "dudli-didly");
  };

  /**
   * Handle event game finished
   */
  const handleGameFinished = (userNameA: unknown, scoreA: unknown) => {
    // Request gemini.getGameResult
    // Redirect to question results page
    navigate(pages.resultTest.getPath({testUuid: props.testUuid, sessionUuid: props.testUuid}));

    // TODO: remove Example
    setIsGameOver(true);
    setScore(scoreA as React.SetStateAction<string>);
  };

  /**
   * Handle event user answered question
   */
  const handleUserAnsweredQuestion = () => {
    // Request gemini.checkAndGenerateAnswer
    sendUserAnswerHandledByServer(/**put result from server JSON here */);
  };

  /**
   * Handle event game started
   */
  const handleGameStarted = (a: unknown, b: unknown) => {
    // Request gemini.getQuestionList or load them from other source
    // Trigger QuestionListReceived
    const questionsUnityList = runningGameStore.test.questions.map((question) => new QuestionUnity({
      name: question.name,
      answer: question.answer,
      order: question.order,
      questionText: question.questionText,
      uuid: question.uuid,
      timeToAnswer: question.timeToAnswer,
    }));
    sendQuestionListReceived(questionsUnityList);
    // TODO: remove Example
    alert("Game started");
    setScore(b as React.SetStateAction<string>);
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

  return (
    <VerticalContainer className={styles.gamePageWrapper}>
      <VerticalContainer className={styles.gameBlock}>
        {/* Remove this example */}
        <Button
          onClick={sendCallUiTest}
          value="spawn it does not work"
          buttonType={ButtonType.SECONDARY}
        />

        {/* Remove this example */}
        <Button
          onClick={() => sendMessage("Canvas", "Test", JSON.stringify([{a: 1, b: 2}, {a: 3, b: 4}]))}
          value="sednd json! It works"
          buttonType={ButtonType.SECONDARY}
        />

        {/* Remove this example */}
        <Title
          level={HeadingLevel.h3}
          text={isGameOverReact ? "game over" : "game in progress"}
          placeholder=""
          isEditable={false}
        />
        {/* Remove this example */}
        <Title
          level={HeadingLevel.h3}
          text={scoreReact}
          placeholder=""
          isEditable={false}
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
