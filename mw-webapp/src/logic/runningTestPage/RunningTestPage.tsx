import {observer} from "mobx-react-lite";
import {Loader} from "src/component/loader/Loader";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {GameBlock} from "src/logic/runningTestPage/gameBlock/GameBlock";
import {RunningTest} from "src/logic/runningTestPage/runningTest/RunningTest";
import {RunningTestPageProps} from "src/logic/runningTestPage/RunningTestPageProps";
import styles from "src/logic/runningTestPage/RunningTestPage.module.scss";

/**
 * Running Test page
 */
export const RunningTestPage = observer((props: RunningTestPageProps) => {
  const {theme} = themeStore;
  const {user, isLoading} = userStore;

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
    <VerticalContainer className={styles.container}>
      {/* TODO parse url param normal way */}
      {props.isGameMode === "false" ?
        <RunningTest
          userUuid={user.uuid}
          testUuid={props.testUuid}
          sessionUuid={props.sessionUuid}
        />
        : (
          <GameBlock
            testUuid={props.testUuid}
            sessionUuid={props.sessionUuid}
            userUuid={user.uuid}
          />
        )
      }
    </VerticalContainer>
  );
});
