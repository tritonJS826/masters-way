import clsx from "clsx";
import {Separator} from "src/component/separator/Separator";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/component/hiddenBlock/notificationItem/NotificationItem.module.scss";

/**
 * Notification item props
 */
export interface NotificationItemProps {

  /**
   * Notification title
   */
  title: string;

  /**
   * Notification description
   */
  description: string;

  /**
   * Additional classNme
   */
  className?: string;
}

/**
 * NotificationItem component
 */
export const NotificationItem = (props: NotificationItemProps) => {
  return (
    <VerticalContainer className={clsx(styles.notificationItem, props.className)}>
      <VerticalContainer className={styles.notificationTexts}>
        <Title
          level={HeadingLevel.h3}
          text={props.title}
          placeholder=""
        />
        <div className={styles.notificationDescription}>
          NotificationItem sdf sdfa ejflsfj szf soif h;fh ;zhf ;sife ;zfi z;sf s; sdf sf hfis igosz goi zs
        </div>
      </VerticalContainer>
      <Separator />
    </VerticalContainer>
  );
};
