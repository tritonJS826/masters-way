// Import {ReactElement} from "react";
import clsx from "clsx";
import {chatAccessIds} from "cypress/accessIds/chatAccessIds";
import {Avatar} from "src/component/avatar/Avatar";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {pages} from "src/router/pages";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
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
   * User's  UUID
   */
  userUuid: string;

  /**
   * Avatar's source
   */
  src: string;

  /**
   * Message's value
   */
  message: string;

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
      <Link path={pages.user.getPath({uuid: props.userUuid})}>
        <Avatar
          alt={props.userName}
          src={props.src}
        />
      </Link>
      <HorizontalContainer
        dataCy={chatAccessIds.chatContainer.messageItem}
        className={clsx(
          styles.message,
          props.isOwnMessage && styles.ownMessage,
        )}
      >
        {renderMarkdown(props.message)}
      </HorizontalContainer>
    </HorizontalContainer>
  );
};
