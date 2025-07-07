import {useCallback, useEffect, useState} from "react";
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
import {RunningTestPageProps} from "src/logic/runningTestPage/RunningTestPageProps";
import styles from "src/logic/gamePage/GamePage.module.scss";

/**
 * Game page
 * TODO: probably it should not be separate page, but should be placed in runningTestPage as just one of possible views
 */
export const GamePage = observer((props: RunningTestPageProps) => {
  const {language} = languageStore;
  const {theme} = themeStore;
  const {user, isLoading} = userStore;

  const [isGameOverReact, setIsGameOver] = useState(false);
  const [userNameReact, setUserName] = useState<string>(props.sessionUuid + props.testUuid);
  const [scoreReact, setScore] = useState<string>("0");
  const {unityProvider, sendMessage, addEventListener, removeEventListener} = useUnityContext({
    loaderUrl: "/sol/build/Build/build.loader.js",
    dataUrl: "/sol/build/Build/build.data.unityweb",
    frameworkUrl: "/sol/build/Build/build.framework.js.unityweb",
    codeUrl: "/sol/build/Build/build.wasm.unityweb",
  });

  const handleGameOver = useCallback((userNameA: unknown, scoreA: unknown) => {
    setIsGameOver(true);
    setUserName(userNameA as React.SetStateAction<string>);
    setScore(scoreA as React.SetStateAction<string>);
  }, [sendMessage]);

  const handleUserAnsweredQuestion = useCallback(() => {
  }, [sendMessage]);

  const handleGameStart = useCallback((a: unknown, b: unknown) => {
    // eslint-disable-next-line no-console
    console.log(b);
    setUserName("handleGameStarted catched" as React.SetStateAction<string>);
    setScore("100" as React.SetStateAction<string>);
    // SendMessage("GameController", "SpawnEnemies", someParam);
  }, [sendMessage]);

  useEffect(() => {
    addEventListener("GameOver", handleGameOver);
    addEventListener("GameStart", handleGameStart);
    addEventListener("UserAnsweredQuestion", handleUserAnsweredQuestion);

    return () => {
      removeEventListener("GameOver", handleGameOver);
      removeEventListener("GameStart", handleGameStart);
      removeEventListener("UserAnsweredQuestion", handleUserAnsweredQuestion);
    };
  }, [addEventListener, removeEventListener, handleGameOver, sendMessage]);

  const sendCallUiTest = useCallback(() => {
    // SendMessage(answer question)
    sendMessage("Canvas", "Test", "dudli-didly");
  }, []);

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
        <Button
          onClick={sendCallUiTest}
          value="spawn it does not work"
          buttonType={ButtonType.SECONDARY}
        />

        <Button
          onClick={() => sendMessage("Canvas", "JsonTest", "dudli-didly")}
          value="send message array message! It works"
          buttonType={ButtonType.SECONDARY}
        />

        <Button
          onClick={() => sendMessage("Canvas", "Test", JSON.stringify([{a: 1, b: 2}, {a: 3, b: 4}]))}
          value="sednd json! It works"
          buttonType={ButtonType.SECONDARY}
        />

        <Title
          level={HeadingLevel.h3}
          text={isGameOverReact ? "game over" : "game in progress"}
          placeholder=""
          isEditable={false}
        />
        <Title
          level={HeadingLevel.h3}
          text={userNameReact}
          placeholder=""
          isEditable={false}
        />
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
