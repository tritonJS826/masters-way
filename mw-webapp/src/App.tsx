import {useEffect, useState} from "react";
import {RouterProvider} from "react-router-dom";
import {Modal} from "src/component/modal/Modal";
import {Text} from "src/component/text/Text";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {HealthCheckDAL} from "src/dataAccessLogic/HealthCheckDAL";
import {
  DEFAULT_NOTIFICATION_SETTINGS,
  globalContext,
} from "src/GlobalContext";
import {languageStore} from "src/globalStore/LanguageStore";
import {router} from "src/router/Router";
import {LanguageService} from "src/service/LanguageService";
import {connectChatSocket} from "src/service/socket/ChatSocket";
import styles from "src/App.module.scss";

/**
 * App
 */
export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isApiWorking, setIsApiWorking] = useState(true);

  const {language} = languageStore;

  /**
   * Check health of the API
   */
  const checkApiHealth = async () => {
    const isWorkingApi = await HealthCheckDAL.checkApiHealth();
    setIsApiWorking(isWorkingApi);
  };

  useEffect(() => {
    checkApiHealth();
    connectChatSocket();
  }, []);

  if (!isApiWorking) {
    return (
      <Modal
        isOpen={!isApiWorking}
        trigger={<></>}
        content={
          <VerticalContainer className={styles.modalContainer}>
            <Title
              text={LanguageService.modals.healthCheckModal.title[language]}
              placeholder=""
              level={HeadingLevel.h2}
            />
            <Text text={
              LanguageService.modals.healthCheckModal.description[language]
            }
            />
          </VerticalContainer>
        }
      />
    );
  }

  return (
    <globalContext.Provider value={{
      isInitialized,
      setIsInitialized,
      // TODO: load from local storage
      notification: DEFAULT_NOTIFICATION_SETTINGS,
    }}
    >
      <RouterProvider router={router} />
    </globalContext.Provider>
  );
};
