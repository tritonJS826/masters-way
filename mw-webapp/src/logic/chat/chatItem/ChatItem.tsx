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
   * Avatar's source
   */
  src?: string | null;

}

/**
 * ChatItem component
 */
export const ChatItem = (props: ChatItemProps) => {
  return (
    <HorizontalContainer className={styles.chatItemWrapper}>
      <Avatar
        alt={props.name}
        src={props.src ?? "https://drive.google.com/thumbnail?id=1am7DSSQIxse2Htl39d_F5pgdadgg8x6v&sz=w1000"}
      />
      <VerticalContainer>
        <p className={styles.chatItem}>
          {props.name}
        </p>
      </VerticalContainer>
    </HorizontalContainer>
  );
};
