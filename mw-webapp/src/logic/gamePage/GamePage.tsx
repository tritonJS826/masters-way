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
  const [scoreReact, setScore] = useState<string>("");
  const {unityProvider, sendMessage, addEventListener, removeEventListener} = useUnityContext({
    loaderUrl: "sol/build/Build/build.loader.js",
    dataUrl: "sol/build/Build/build.data",
    frameworkUrl: "sol/build/Build/build.framework.js",
    codeUrl: "sol/build/Build/build.wasm",
  });

  const handleGameOver = useCallback((userNameA: unknown, scoreA: unknown) => {
    setIsGameOver(true);
    setUserName(userNameA as React.SetStateAction<string>);
    setScore(scoreA as React.SetStateAction<string>);
  }, []);

  const handleUserAnsweredQuestion = useCallback(() => {
  }, []);

  const handleGameStarted = useCallback(() => {
    // Load questions sdata here
    // sendMessage("GameController", "SpawnEnemies", someParam);
  }, []);

  useEffect(() => {
    addEventListener("GameOver", handleGameOver);
    addEventListener("GameStarted", handleUserAnsweredQuestion);
    addEventListener("UserAnsweredQuestion", handleGameStarted);

    return () => {
      removeEventListener("GameOver", handleGameOver);
      removeEventListener("UserAnsweredQuestion", handleUserAnsweredQuestion);
      removeEventListener("GameStarted", handleGameStarted);
    };
  }, [addEventListener, removeEventListener, handleGameOver]);

  const someParam: number = 100;

  /**
   * Experimantal button to interact with unity from react
   */
  function handleClickSpawnEnemies() {
    sendMessage("GameController", "SpawnEnemies", someParam);
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

  return (
    <VerticalContainer className={styles.gamePageWrapper}>
      <VerticalContainer className={styles.gameBlock}>
        <Button
          onClick={handleClickSpawnEnemies}
          value="spawn"
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
          style={{width: 1920, height: 1080}}
        />
      </VerticalContainer>

      <Footer language={language} />
    </VerticalContainer>
  );

});
