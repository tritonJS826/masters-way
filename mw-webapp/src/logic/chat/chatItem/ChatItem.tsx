import clsx from "clsx";
import {chatAccessIds} from "cypress/accessIds/chatAccessIds";
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
   * Chat's name
   */
  name: string;

  /**
   * Chat's name
   */
    dataCy?: string;

   /**
    * Chat's className
    */
   className?: string;

  /**
   * Avatar's source
   */
  src: string | null;

  /**
   * Callback triggered on click chat item
   */
  onClick?: () => void;
}

/**
 * ChatItem component
 */
export const ChatItem = (props: ChatItemProps) => {

  return (
    <HorizontalContainer
      onClick={props.onClick}
      className={clsx(styles.chatItemWrapper, props.className)}
      dataCy={props.dataCy}
    >
      <Avatar
        alt={props.name}
        src={props.src}
      />
      <VerticalContainer className={styles.chatItem}>
        <p
          className={styles.chatItemName}
          data-cy={chatAccessIds.chatContainer.chatItemName}
        >
          {props.name}
        </p>
      </VerticalContainer>
    </HorizontalContainer>
  );
};
