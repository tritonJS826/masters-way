import {useContext} from "react";
import {Button} from "src/component/button/Button";
import {HeadingLevel, Title} from "src/component/title/Title";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {globalContext} from "src/GlobalContext";
import {OSNotification} from "src/utils/notifications/OSNotification";
import style from "src/logic/settingsPage/SettingsPage.module.scss";

/**
 * Settings page
 */
export const SettingsPage = () => {
  const {notification} = useContext(globalContext);

  return (
    <>
      <Title
        level={HeadingLevel.h2}
        text="Settings page"
      />
      <ul className={style.settingsList}>
        <Tooltip content="Coming soon">
          <li>
            theme: dark/light
          </li>
        </Tooltip>
        <Tooltip content="Coming soon">
          <li>
            language: eng/ru
          </li>
        </Tooltip>
        <Tooltip content="Coming soon">
          <li>
            isShowHintOnLoadApp: boolean
          </li>
        </Tooltip>
        <Tooltip content="Coming soon">
          <li>
            tables view for mobile (set horizontal resolution): full table/ short table/ calendar
            tables view for tablet (set horizontal resolution): full table/ short table/ calendar
            tables view for desktop (set horizontal resolution): full table/ short table/ calendar
          </li>
        </Tooltip>
        <Tooltip content="Coming soon">
          <li>
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
          </li>
        </Tooltip>
      </ul>
    </>
  );
};
