import clsx from "clsx";
import {Avatar} from "src/component/avatar/Avatar";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/logic/chat/chatItem/ChatItem.module.scss";

/**
 * User's status
 */
export enum UserStatus {

  /**
   * User is online
   */
  ONLINE = "online",

  /**
   * USer is offline
   */
  OFFLINE = "offline"
}

/**
 * ChatItem props
 */
interface ChatItemProps {

  /**
   * User's name
   */
  userName: string;

  /**
   * Avatar's source
   */
  src: string;

  /**
   * If true the user is online, if not the user is offline
   */
  isUserOnline: boolean;
}

/**
 * ChatItem component
 */
export const ChatItem = (props: ChatItemProps) => {
  return (
    <HorizontalContainer>
      <Avatar
        alt={props.userName}
        src={props.src}
      />
      <VerticalContainer>
        <p className={styles.chatItem}>
          {props.userName}
        </p>
        <HorizontalContainer className={styles.userStatusBlock}>
          <div className={clsx(
            styles.userStatusIndicator,
            props.isUserOnline && styles.online,
          )}
          />
          <span>
            {props.isUserOnline ? UserStatus.ONLINE : UserStatus.OFFLINE}
          </span>
        </HorizontalContainer>
      </VerticalContainer>
    </HorizontalContainer>
  );
};
