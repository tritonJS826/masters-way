import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {NotificationItem} from "src/component/hiddenBlock/notificationItem/NotificationItem";
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
}

/**
 * HiddenBlock component
 */
export const HiddenBlock = observer((props: HiddenBlockProps) => {

  return (
    <VerticalContainer className={clsx(styles.hiddenBlockContainer, !props.isOpen && styles.hidden)}>
      <Title
        level={HeadingLevel.h2}
        text={props.title}
        placeholder=""
      />
      {props.isOpen && props.notificationList?.map((notificationItem) => (
        <NotificationItem
          key={notificationItem.description}
          title={notificationItem.description}
          description={notificationItem.description}
        />
      ))}
      Coming soon...
    </VerticalContainer>
  );
});
