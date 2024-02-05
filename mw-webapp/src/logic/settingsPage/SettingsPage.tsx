import {useContext} from "react";
import {Button} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {OptionType} from "src/component/select/option/Option";
import {Select} from "src/component/select/Select";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {globalContext} from "src/GlobalContext";
import {ThemeSwitcher} from "src/logic/themeSwitcher/ThemeSwitcher";
import {Language, LanguageWorker} from "src/utils/LanguageWorker";
import {OSNotification} from "src/utils/notifications/OSNotification";
import styles from "src/logic/settingsPage/SettingsPage.module.scss";

/**
 * Settings page
 */
export const SettingsPage = () => {
  const {notification} = useContext(globalContext);

  const currentLanguage = LanguageWorker.getCurrentLanguage();

  const leanguageOptions: OptionType<Language>[] = [
    {id: "1", value: Language.ENGLISH, text: "en"},
    {id: "2", value: Language.RUSSIAN, text: "ru"},
  ];

  return (
    <>
      <Title
        level={HeadingLevel.h2}
        text="Settings"
      />
      <div className={styles.settingsList}>
        <HorizontalContainer>
          <Tooltip
            position={PositionTooltip.TOP}
            content="Coming soon"
          >
            <ThemeSwitcher />
          </Tooltip>
        </HorizontalContainer>
        <HorizontalContainer>
          <Tooltip
            position={PositionTooltip.TOP}
            content="Coming soon"
          >
            <Select
              label="Language: "
              value={currentLanguage}
              name="language"
              options={leanguageOptions}
              onChange={(value) => {
                LanguageWorker.setLanguage(value);
              }}
            />
          </Tooltip>
        </HorizontalContainer>
        <HorizontalContainer>
          <Tooltip
            position={PositionTooltip.TOP}
            content="Coming soon"
          >
            <Select
              label="isShowHintOnLoadApp"
              value="true"
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
            content="Coming soon"
          >
            <Select
              label=" tables view for mobile (set horizontal resolution)"
              value="dark"
              name="viewMobile"
              options={[
                {id: "1", value: "full table", text: "full table"},
                {id: "2", value: "short table", text: "short table"},
                {id: "3", value: "calendar", text: "calendar"},
              ]}
              onChange={() => {}}
            />
          </Tooltip>
        </HorizontalContainer>
        <HorizontalContainer>
          <Tooltip
            position={PositionTooltip.TOP}
            content="Coming soon"
          >
            <Select
              label="tables view for tablet (set horizontal resolution)"
              value="dark"
              name="viewTablet"
              options={[
                {id: "1", value: "full table", text: "full table"},
                {id: "2", value: "short table", text: "short table"},
                {id: "3", value: "calendar", text: "calendar"},
              ]}
              onChange={() => {}}
            />
          </Tooltip>
        </HorizontalContainer>
        <HorizontalContainer>
          <Tooltip
            position={PositionTooltip.TOP}
            content="Coming soon"
          >
            <Select
              label="tables view for desktop (set horizontal resolution)"
              value="dark"
              name="viewDesktop"
              options={[
                {id: "1", value: "full table", text: "full table"},
                {id: "2", value: "short table", text: "short table"},
                {id: "3", value: "calendar", text: "calendar"},
              ]}
              onChange={() => {}}
            />
          </Tooltip>
        </HorizontalContainer>
        <HorizontalContainer>
          <Tooltip
            position={PositionTooltip.TOP}
            content="Coming soon"
          >
            isShowNotifications:
            {" "}
            {notification.isEnabled}
            {" "}
            {notification.notificationTime}
            <Button
              value={"test notification"}
              onClick={() => {
                OSNotification.addDeferredNotification("21:00");
              }}
            />
          </Tooltip>
        </HorizontalContainer>
      </div>
    </>
  );
};
