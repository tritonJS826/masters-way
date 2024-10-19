import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {NotificationItem} from "src/component/hiddenBlock/notificationItem/NotificationItem";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {Notification} from "src/model/businessModel/Notification";
import styles from "src/component/hiddenBlock/HiddenBlock.module.scss";

/**
 * Hidden block props
 */
interface HiddenBlockProps {

  /**
   * Hidden block title
   */
  title: string;

  /**
   * Hidden block notificationList
   */
  notificationList: Notification[] | null;

  /**
   * Class name for Hidden block
   */
  className?: string;

  /**
   * Hidden block id shown if true
   * @default false
   */
  isOpen?: boolean;

  /**
   * Callback to open notifications
   */
  closeNotificationBlock: (isNotificationBlockOpen: boolean) => void;
}

/**
 * HiddenBlock component
 */
export const HiddenBlock = observer((props: HiddenBlockProps) => {

  return (
    <VerticalContainer className={clsx(styles.hiddenBlockContainer, !props.isOpen && styles.hidden)}>
      <HorizontalContainer className={styles.titleAndCloseButton}>
        <Title
          level={HeadingLevel.h2}
          text={props.title}
          placeholder=""
        />
        <Button
          onClick={() => props.closeNotificationBlock(false)}
          buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
          value={
            <Icon
              size={IconSize.SMALL}
              name="RemoveIcon"
            />}
        />
      </HorizontalContainer>
      {props.isOpen && props.notificationList?.map((notificationItem) => (
        <NotificationItem
          key={notificationItem.title}
          title={notificationItem.title}
          description={notificationItem.description}
        />
      ))}
      Coming soon...
    </VerticalContainer>
  );
});
