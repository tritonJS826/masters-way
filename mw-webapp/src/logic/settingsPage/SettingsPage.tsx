import {settingsAccessIds} from "cypress/accessIds/settingsAccessIds";
import {observer} from "mobx-react-lite";
import {Button} from "src/component/button/Button";
import {languageOptions} from "src/component/header/Header";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Select} from "src/component/select/Select";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {serviceWorkerStore, SystemNotificationTag} from "src/globalStore/ServiceWorkerStore";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/settingsPage/SettingsPage.module.scss";

/**
 * Settings page
 */
export const SettingsPage = observer(() => {
  const {language, setLanguage} = languageStore;
  const {isNotificationsEnabled, setIsOSNotificationEnabled} = serviceWorkerStore;

  return (
    <VerticalContainer className={styles.container}>
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
              value={isNotificationsEnabled
                ? LanguageService.settings.notification.disableSystemNotificationsButton[language]
                : LanguageService.settings.notification.enableSystemNotificationsButton[language]
              }
              onClick={() => {
                setIsOSNotificationEnabled(!isNotificationsEnabled);
                serviceWorkerStore.requestPermission();
                serviceWorkerStore.systemNotification({
                  title: LanguageService.settings.notification.enableSystemNotificationsTitle[language],
                  text: isNotificationsEnabled
                    ? LanguageService.settings.notification.disableSystemNotificationsText[language]
                    : LanguageService.settings.notification.enableSystemNotificationsText[language],
                  tag: SystemNotificationTag.TEST,
                });
              }}
            />
          </Tooltip>
        </HorizontalContainer>

      </div>
    </VerticalContainer>
  );
});
