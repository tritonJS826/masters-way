import {observer} from "mobx-react-lite";
import {Button} from "src/component/button/Button";
import {languageOptions} from "src/component/header/Header";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Select} from "src/component/select/Select";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {useGlobalContext} from "src/GlobalContext";
import {languageStore} from "src/globalStore/LanguageStore";
import {LanguageService} from "src/service/LanguageService";
import {OSNotification} from "src/utils/notifications/OSNotification";
import styles from "src/logic/settingsPage/SettingsPage.module.scss";

/**
 * Settings page
 */
export const SettingsPage = observer(() => {
  const {notification} = useGlobalContext();
  const {language, setLanguage} = languageStore;

  return (
    <VerticalContainer className={styles.container}>
      <Title
        level={HeadingLevel.h2}
        text={LanguageService.settings.title[language]}
        placeholder=""
      />
      <div className={styles.settingsList}>
        <HorizontalContainer>
          <Select
            label={LanguageService.settings.language[language]}
            value={language}
            name="language"
            options={languageOptions}
            onChange={setLanguage}
          />
        </HorizontalContainer>
        <HorizontalContainer>
          <Tooltip
            position={PositionTooltip.TOP}
            content={LanguageService.settings.comingSoon[language]}
          >
            <Select
              label={LanguageService.settings.showHint[language]}
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

        <HorizontalContainer>
          <Tooltip
            position={PositionTooltip.TOP}
            content={LanguageService.settings.comingSoon[language]}
          >
            {LanguageService.settings.notification[language]}
            :
            {" "}
            {notification.isEnabled}
            {" "}
            {notification.notificationTime}
            <Button
              value={LanguageService.settings.testNotification[language]}
              onClick={() => {
                OSNotification.addDeferredNotification("21:00");
              }}
            />
          </Tooltip>
        </HorizontalContainer>
      </div>
    </VerticalContainer>
  );
});
