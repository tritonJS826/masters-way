import {useCallback, useEffect, useState} from "react";
import {Unity, useUnityContext} from "react-unity-webgl";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Footer} from "src/component/footer/Footer";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import styles from "src/logic/gamePage/GamePage.module.scss";

/**
 * Game page
 */
export const GamePage = observer(() => {
  const {language} = languageStore;

  // Start unity test

  const [isGameOverReact, setIsGameOver] = useState(false);
  const [userNameReact, setUserName] = useState<string>("def");
  const [scoreReact, setScore] = useState<string>("def");
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

  useEffect(() => {
    addEventListener("GameOver", handleGameOver);

    return () => {
      removeEventListener("GameOver", handleGameOver);
    };
  }, [addEventListener, removeEventListener, handleGameOver]);

  const someParam: number = 100;

  /**
   * Experimantal button to interact with unity from react
   */
  function handleClickSpawnEnemies() {
    sendMessage("GameController", "SpawnEnemies", someParam);
  }
  // End unity test

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
