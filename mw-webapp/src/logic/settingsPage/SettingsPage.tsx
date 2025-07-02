import {useNavigate} from "react-router-dom";
import {settingsAccessIds} from "cypress/accessIds/settingsAccessIds";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {languageOptions} from "src/component/header/Header";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {NotificationNature} from "src/component/notificationBlock/notificationItem/NotificationItem";
import {ProgressBar} from "src/component/progressBar/ProgressBar";
import {Select} from "src/component/select/Select";
import {HeadingLevel, Title} from "src/component/title/Title";
import {Toggle} from "src/component/toggle/Toggle";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {EnabledNotificationSettingsDAL as NotificationSettingsDAL} from "src/dataAccessLogic/NotificationSettingsDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {serviceWorkerStore, SystemNotificationTag} from "src/globalStore/ServiceWorkerStore";
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {SettingsPageStore} from "src/logic/settingsPage/SettingsPageStore";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/settingsPage/SettingsPage.module.scss";

/**
 * Settings page
 */
export const SettingsPage = observer(() => {
  const {language, setLanguage} = languageStore;
  const {isOSNotificationAllowedByUser, setIsOSNotificationAllowedByUser} = serviceWorkerStore;
  const {user} = userStore;

  const navigate = useNavigate();

  const settingsPageStore = useStore<
  new () => SettingsPageStore,
  [], SettingsPageStore>({
      storeForInitialize: SettingsPageStore,
      dataForInitialization: [],
      dependency: [],
    });

  if (!user) {
    navigate(pages.home.getPath({}));
  }

  return (
    <VerticalContainer className={styles.container}>
      {user &&
        <VerticalContainer className={styles.coinsContainer}>
          <VerticalContainer>
            <Title
              level={HeadingLevel.h2}
              text={LanguageService.settings.coinsBlock.title[language]}
              placeholder=""
            />
            <Title
              level={HeadingLevel.h3}
              text={LanguageService.settings.coinsBlock.description[language]}
              placeholder=""
            />
          </VerticalContainer>

          <div className={styles.progressContainer}>
            <ProgressBar
              value={user?.profileSetting.coins}
              max={1000}
              textToLabel={LanguageService.settings.coinsBlock.coinsProgressLabel[language]}
            />
          </div>
          <Button
            value={LanguageService.settings.coinsBlock.getMoreCoinsButton[language]}
            onClick={() => navigate(pages.pricing.getPath({}))}
            buttonType={ButtonType.PRIMARY}
          />
        </VerticalContainer>
      }
      <VerticalContainer className={styles.settingsContainer}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.settings.title[language]}
          placeholder=""
          cy={{dataCyTitleContainer: settingsAccessIds.title}}
        />
        <div className={styles.settingsList}>
          <HorizontalContainer className={styles.line}>
            {LanguageService.settings.language[language]}
            <Select
              label={""}
              value={language}
              name="language"
              options={languageOptions}
              onChange={setLanguage}
            />
          </HorizontalContainer>
          <HorizontalContainer className={styles.line}>
            {LanguageService.settings.showHint[language]}
            :
            <Tooltip
              position={PositionTooltip.RIGHT}
              content={LanguageService.settings.comingSoon[language]}
            >
              <Select
                label={""}
                defaultValue="true"
                name="isShowHintOnLoadApp"
                options={[
                  {id: "1", value: "true", text: "true"},
                  {id: "2", value: "false", text: "false"},
                ]}
                onChange={() => {}}
              />
            </Tooltip>
          </HorizontalContainer>
          <HorizontalContainer className={styles.line}>
            {LanguageService.settings.notification.notificationLabel[language]}
            <Tooltip
              position={PositionTooltip.RIGHT}
              content={LanguageService.settings.comingSoon[language]}
            >
              <Button
                value={isOSNotificationAllowedByUser
                  ? LanguageService.settings.notification.disableSystemNotificationsButton[language]
                  : LanguageService.settings.notification.enableSystemNotificationsButton[language]
                }
                onClick={() => {
                  setIsOSNotificationAllowedByUser(!isOSNotificationAllowedByUser);
                  serviceWorkerStore.requestPermission();
                  serviceWorkerStore.systemNotification({
                    title: LanguageService.settings.notification.enableSystemNotificationsTitle[language],
                    text: isOSNotificationAllowedByUser
                      ? LanguageService.settings.notification.disableSystemNotificationsText[language]
                      : LanguageService.settings.notification.enableSystemNotificationsText[language],
                    tag: SystemNotificationTag.TEST,
                  });
                }}
              />
            </Tooltip>
          </HorizontalContainer>

          <Title
            level={HeadingLevel.h2}
            text={LanguageService.settings.notification.enabledNotificationTitle[language]}
            placeholder=""
          />
          {settingsPageStore.isInitialized && (
            <VerticalContainer>
              {settingsPageStore.notificationSettingList
                .filter(n =>
                  (n.channel === "mail" && n.nature === NotificationNature.mentoring_way) ||
                (n.channel === "mail" && n.nature === NotificationNature.own_way),
                ).map(notificationSetting => (

                  // Let's show only currently available settings
                  <HorizontalContainer
                    className={styles.line}
                    key={notificationSetting.uuid}
                  >
                    <span>
                      {notificationSetting.channel}
                    </span>
                    {" "}
                    <span>
                      {notificationSetting.nature}
                    </span>
                    <Toggle
                      onChange={() => {
                        NotificationSettingsDAL.updateNotificationSetting(
                          notificationSetting.uuid,
                          !notificationSetting.isEnabled,
                        );
                        notificationSetting.isEnabled = !notificationSetting.isEnabled;
                      }}
                      isDefaultChecked={notificationSetting.isEnabled}
                    />
                  </HorizontalContainer>
                ))}
            </VerticalContainer>
          )}
        </div>
      </VerticalContainer>
    </VerticalContainer>
  );
});
