import {ReactElement} from "react";
import clsx from "clsx";
import {chatAccessIds} from "cypress/accessIds/scenariosAccessIds/chatAccessIds";
import {Avatar} from "src/component/avatar/Avatar";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import styles from "src/logic/chat/messageItem/MessageItem.module.scss";

/**
 * MessageItem props
 */
interface MessageItemProps {

  /**
   * User's name
   */
  userName: string;

  /**
   * Avatar's source
   */
  src: string;

  /**
   * Message's value
   */
  message: ReactElement<HTMLElement>;

  /**
   * If true - then it's user's message, if false it's a teammate's message
   * @default false
   */
  isOwnMessage?: boolean;

}

/**
 * ChatItem component
 */
export const MessageItem = (props: MessageItemProps) => {
  return (
    <HorizontalContainer className={clsx(
      styles.messageWrap,
      props.isOwnMessage && styles.own,
    )}
    >
      <Avatar
        alt={props.userName}
        src={props.src}
      />
      <HorizontalContainer
        className={clsx(
          styles.message,
          props.isOwnMessage && styles.ownMessage,
        )}
        dataCy={chatAccessIds.chatContainer.messageItem}
      >
        {props.message}
      </HorizontalContainer>
    </HorizontalContainer>
  );
};
