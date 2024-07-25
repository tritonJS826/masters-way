import {useEffect, useState} from "react";
import {DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTrigger, Root as DialogRoot} from "@radix-ui/react-dialog";
import clsx from "clsx";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Input, InputType} from "src/component/input/Input";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {ChatDAL, createMessageInGroupParams} from "src/dataAccessLogic/ChatDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {ChatItem} from "src/logic/chat/chatItem/ChatItem";
import {MessageItem} from "src/logic/chat/messageItem/MessageItem";
import {Chat} from "src/model/businessModel/Chat";
import {ChatPreview} from "src/model/businessModelPreview/ChatPreview";
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

}

/**
 * Chat component
 */
export const ChatPage = (props: ChatProps) => {
  const [isGroupChatOpen, setIsGroupChatOpen] = useState<boolean>(false);
  const [chat, setChat] = useState<Chat | null>(null);

  /**
   * Load active chat
   */
  const loadActiveChat = async (chatUuid: string) => {
    const fetchedChat = await ChatDAL.getRoomById(chatUuid);

    setChat(fetchedChat);
  };

  const {language} = languageStore;
  const [isOpen, setIsOpen] = useState(props.isOpen ?? false);
  const [message, setMessage] = useState<string>("");
  const [chatList, setChatList] = useState<ChatPreview[]>([]);
  const [isChatHiddenOnMobile, setIsChatHiddenOnMobile] = useState<boolean>(true);

  /**
   * Send message
   */
  const sendMessage = async (params: createMessageInGroupParams) => {
    await ChatDAL.createMessageInRoom({
      message: params.message,
      roomId: params.roomId,
    });
  };

  /**
   * Load chat list
   */
  const loadChatList = () => {
    // Const fetchedChats = IsGroupChatOpen
    // ? await ChatDAL.getRooms(RoomType.GROUP)
    // : await ChatDAL.getRooms(RoomType.PRIVATE);

    // setChatList(fetchedChats.chatsPreview);
    setChatList([]);
  };

  useEffect(() => {
    loadChatList();
  }, [isGroupChatOpen]);

  /**
   * Render loading
   */
  const renderLoader = () => {
    return (
      <div>
        No chats... Loading...
        {" "}
      </div>
    );
  };

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
                  onClick={() => setIsGroupChatOpen(false)}
                  buttonType={ButtonType.SECONDARY}
                  value="Personal chats"
                />
                <Button
                  onClick={() => setIsGroupChatOpen(true)}
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
              <VerticalContainer className={clsx(
                styles.chatList,
                !isChatHiddenOnMobile && styles.chatListHide,
              )}
              >
                {chatList
                  ? chatList.map((chatItem) => (
                    <ChatItem
                      key={chatItem.roomId}
                      name={chatItem.name}
                      src={chatItem.src}
                      onClick={() => {
                        loadActiveChat(chatItem.roomId);
                        setIsChatHiddenOnMobile(false);
                      }}
                    />
                  ))
                  : renderLoader()
                }
                <ChatItem
                  name="Jonnie Joe"
                  src=""
                  onClick={() => setIsChatHiddenOnMobile(false)}
                />
                <ChatItem
                  name="VeratsennikavaKatsiarynasVeratsennikavaKatsiarynaVeratsennikavaKatsiaryna"
                  src=""
                />
              </VerticalContainer>

              {chat &&
                <VerticalContainer className={clsx(
                  styles.chatBlock,
                  !isChatHiddenOnMobile && styles.chatBlockOpen,
                )}
                >
                  <HorizontalContainer className={styles.chatInfo}>
                    <ChatItem
                      name={chat.name}
                      src={chat.src}
                    />
                    <Button
                      buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                      onClick={() => setIsChatHiddenOnMobile(true)}
                      icon={
                        <Icon
                          size={IconSize.MEDIUM}
                          name={"MoreVertical"}
                        />
                      }
                    />
                  </HorizontalContainer>
                  <VerticalContainer className={styles.messageList}>
                    {chat.messages.map((messageItem) => (
                      <MessageItem
                        key={messageItem.ownerId}
                        src=""
                        userName={messageItem.ownerId}
                        message={
                          <p>
                            {messageItem.message}
                          </p>
                        }
                      />
                    ))}
                    <MessageItem
                      src=""
                      userName="111"
                      message={
                        <p>
                          111
                        </p>
                      }
                    />

                    <MessageItem
                      src=""
                      userName="111"
                      message={
                        <p>
                          222
                        </p>
                      }
                    />
                  </VerticalContainer>
                </VerticalContainer>
              }
            </HorizontalContainer>

            {chat &&
              <HorizontalContainer className={styles.messageInputBlock}>
                <Input
                  value={message}
                  onChange={setMessage}
                  placeholder="Write a message..."
                  typeInput={InputType.Border}
                />
                <Button
                  value="Send"
                  onClick={() => {
                    sendMessage({
                      message,
                      roomId: chat.roomId,
                    });
                    setMessage("");
                  }}
                  buttonType={ButtonType.PRIMARY}
                />
              </HorizontalContainer>
            }

          </VerticalContainer>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};
