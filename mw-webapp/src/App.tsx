import {useEffect, useState} from "react";
import {RouterProvider} from "react-router-dom";
import {Modal} from "src/component/modal/Modal";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {Text} from "src/component/text/Text";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {HealthCheckDAL} from "src/dataAccessLogic/HealthCheckDAL";
import {ChannelId} from "src/eventBus/EventBusChannelDict";
import {ChatEventId} from "src/eventBus/events/chat/ChatEventDict";
import {useListenEventBus} from "src/eventBus/useListenEvent";
import {
  DEFAULT_NOTIFICATION_SETTINGS,
  globalContext,
} from "src/GlobalContext";
import {languageStore} from "src/globalStore/LanguageStore";
import {router} from "src/router/Router";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/App.module.scss";

/**
 * App
 */
export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isApiWorking, setIsApiWorking] = useState(true);

  const {language} = languageStore;

  useListenEventBus(ChannelId.CHAT, ChatEventId.MESSAGE_RECEIVED, () => {
    displayNotification({text: ChatEventId.MESSAGE_RECEIVED, type: NotificationType.INFO});
  });

  /**
   * Check health of the API
   */
  const checkApiHealth = async () => {
    const isWorkingApi = await HealthCheckDAL.checkApiHealth();
    setIsApiWorking(isWorkingApi);
  };

  useEffect(() => {
    checkApiHealth();
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
              placeholder=''
              level={HeadingLevel.h2}
            />
            <Text text={LanguageService.modals.healthCheckModal.description[language]} />
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
