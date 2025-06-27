import {observer} from "mobx-react-lite";
import {Loader} from "src/component/loader/Loader";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {RunningTest} from "src/logic/runningTestPage/runningTest/RunningTest";
import styles from "src/logic/runningTestPage/RunningTestPage.module.scss";

/**
 * RunningTestPage props
 */
interface RunningTestPageProps {

  /**
   * Test's Uuid
   */
  testUuid: string;

  /**
   * Session's Uuid
   */
  sessionUuid: string;
}

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
      <RunningTest
        userUuid={user.uuid}
        testUuid={props.testUuid}
        sessionUuid={props.sessionUuid}
      />
    </VerticalContainer>
  );
});
