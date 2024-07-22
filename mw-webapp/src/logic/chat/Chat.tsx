import {useState} from "react";
import {DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTrigger, Root as DialogRoot} from "@radix-ui/react-dialog";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Input, InputType} from "src/component/input/Input";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {ChatItem} from "src/logic/chat/chatItem/ChatItem";
import {MessageItem} from "src/logic/chat/messageItem/MessageItem";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/chat/Chat.module.scss";

/**
 * Chat props
 */
interface ChatProps {

  /**
   * Controls whether the modal is initially open or closed.
   * @default false
   */
  isOpen?: boolean;

  /**
   * Chat
   * TODO: need to create common model Chat for group and P2p chat
   */
  // chat: ChatGroup | null;

  /**
   * Chat list
   */
  // chatList: ChatPreview[];

}

/**
 * Chat component
 */
export const Chat = (props: ChatProps) => {
  const {language} = languageStore;
  const [isOpen, setIsOpen] = useState(props.isOpen ?? false);
  const [message, setMessage] = useState<string>("");
  // Const [isGroupChatOpen, setIsGroupChatOpen] = useState<boolean>(false);

  /**
   * Get chat list
   */
  // const getChatList = async () => {
  //   const chatList = isGroupChatOpen
  //     ? await ChatGroupDAL.getGroupRooms()
  //     : await ChatP2pDAL.getP2pRooms();

  //   return chatList;

  //   setIsGroupChatOpen(true);
  // };

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <div
          role="button"
          className={styles.chatTrigger}
        >
          <Icon
            name="WayIcon"
            size={IconSize.SMALL}
            className={styles.chatIcon}
          />
          <div className={styles.chatTriggerText}>
            {LanguageService.common.chat.openChat[language]}
          </div>
        </div>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className={styles.chatOverlay} />
        <DialogContent className={styles.chatContent}>
          <VerticalContainer className={styles.chatContainer}>
            <HorizontalContainer className={styles.chatHeader}>
              <HorizontalContainer>
                <Button
                  onClick={() => {}}
                  buttonType={ButtonType.SECONDARY}
                  value="Personal chats"
                />
                <Button
                  onClick={() => {}}
                  buttonType={ButtonType.SECONDARY}
                  value="Group chats"
                />
              </HorizontalContainer>
              <DialogClose asChild>
                <div
                  role="button"
                  className={styles.removeButton}
                >
                  <Icon
                    size={IconSize.SMALL}
                    name="RemoveIcon"
                    className={styles.removeIcon}
                  />
                </div>

              </DialogClose>
            </HorizontalContainer>

            <HorizontalContainer className={styles.chatContactsMessages}>
              <VerticalContainer className={styles.chatList}>
                {/* {props.chatList.map((chatItem) => (
                  <ChatItem
                    key={chatItem.roomId}
                    name={chatItem.name}
                    src={chatItem.src}
                  />
                ))
                } */}
                <ChatItem
                  name="Jonnie Joe"
                  src=""
                />
                <ChatItem
                  name="VeratsennikavaKatsiarynasVeratsennikavaKatsiarynaVeratsennikavaKatsiaryna"
                  src=""
                />
              </VerticalContainer>

              <VerticalContainer className={styles.chatBlock}>
                <HorizontalContainer className={styles.chatInfo}>
                  <ChatItem
                    name="VeratsennikavaKatsiarynasVeratsennikavaKatsiarynaVeratsennikavaKatsiaryna"
                    src=""
                  />

                  <Button
                    buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                    onClick={() => {}}
                    icon={
                      <Icon
                        size={IconSize.MEDIUM}
                        name={"MoreVertical"}
                      />
                    }
                  />
                </HorizontalContainer>
                <VerticalContainer className={styles.messageList}>
                  <MessageItem
                    src=""
                    userName="sddfsdf sdfds sf"
                    message={
                      <p>
                        Hehehe
                      </p>
                    }
                  />
                  <MessageItem
                    src=""
                    userName="sddfsdf sdfds sf"
                    message={
                      <p>
                        Hehehe
                      </p>
                    }
                    isOwnMessage={true}
                  />
                  <MessageItem
                    src=""
                    userName="sddfsdf sdfds sf"
                    message={
                      <p>
                        Hehehe
                      </p>
                    }
                  />
                  <MessageItem
                    src=""
                    userName="sddfsdf sdfds sf"
                    message={
                      <p>
                        Hehehe
                      </p>
                    }
                  />
                </VerticalContainer>
              </VerticalContainer>
            </HorizontalContainer>

            <HorizontalContainer className={styles.messageInputBlock}>
              <Input
                value={message}
                onChange={setMessage}
                placeholder="Write a message..."
                typeInput={InputType.Border}
              />
              <Button
                value="Send"
                onClick={() => setMessage("")}
                buttonType={ButtonType.PRIMARY}
              />
            </HorizontalContainer>

          </VerticalContainer>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};
