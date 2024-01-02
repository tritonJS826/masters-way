import {useContext} from "react";
import {Button} from "src/component/button/Button";
import {Select} from "src/component/select/Select";
import {HeadingLevel, Title} from "src/component/title/Title";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {globalContext} from "src/GlobalContext";
import {OSNotification} from "src/utils/notifications/OSNotification";
import {Theme, ThemeWorker} from "src/utils/ThemeWorker";
import styles from "src/logic/settingsPage/SettingsPage.module.scss";

/**
 * Settings page
 */
export const SettingsPage = () => {
  const {notification} = useContext(globalContext);

  const currentTheme = ThemeWorker.getCurrentTheme();
  if (!currentTheme) {
    throw new Error("Theme is not defined!");
  }

  return (
    <>
      <Title
        level={HeadingLevel.h2}
        text="Settings"
      />
      <div className={styles.settingsList}>
        <Tooltip content="Coming soon">
          <Select
            label="Theme: "
            value={currentTheme}
            name="theme"
            options={[
              {id: "1", value: Theme.DARK, text: "dark"},
              {id: "2", value: Theme.LIGHT, text: "light"},
            ]}
            onChange={(value) => {
              // TODO: improve select interface to avoid 'as' operator
              ThemeWorker.setTheme(value as Theme);
            }}
          />
        </Tooltip>
        <Tooltip content="Coming soon">
          <Select
            label="language"
            value="en"
            name="language"
            options={[
              {id: "1", value: "en", text: "en"},
              {id: "2", value: "ru", text: "ru"},
            ]}
            onChange={() => {}}
          />
        </Tooltip>
        <Tooltip content="Coming soon">
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
        <Tooltip content="Coming soon">
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
        <Tooltip content="Coming soon">
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
        <Tooltip content="Coming soon">
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
        <Tooltip content="Coming soon">
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
      </div>
    </>
  );
};
