import {useEffect, useState} from "react";
import {DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTrigger, Root as DialogRoot} from "@radix-ui/react-dialog";
import clsx from "clsx";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Input, InputType} from "src/component/input/Input";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {ChatDAL, createMessageInGroupParams, RoomType} from "src/dataAccessLogic/ChatDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {userStore} from "src/globalStore/UserStore";
import {ChatItem} from "src/logic/chat/chatItem/ChatItem";
import {MessageItem} from "src/logic/chat/messageItem/MessageItem";
import {Chat} from "src/model/businessModel/Chat";
import {ChatPreview} from "src/model/businessModelPreview/ChatPreview";
import {LanguageService} from "src/service/LanguageService";
import {KeySymbols} from "src/utils/KeySymbols";
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

  const {language} = languageStore;
  const {user} = userStore;
  const [isOpen, setIsOpen] = useState(props.isOpen ?? false);
  const [message, setMessage] = useState<string>("");
  const [groupChatName, setGroupChatName] = useState<string>("");
  const [chatList, setChatList] = useState<ChatPreview[]>([]);
  const [isChatHiddenOnMobile, setIsChatHiddenOnMobile] = useState<boolean>(true);

  /**
   * Load active chat
   */
  const loadActiveChat = async (chatUuid: string) => {
    const fetchedChat = await ChatDAL.getRoomById(chatUuid);

    setChat(fetchedChat);
  };

  /**
   * Send message
   */
  const sendMessage = async (params: createMessageInGroupParams) => {
    await ChatDAL.createMessageInRoom({
      message: params.message,
      roomId: params.roomId,
    });
    setMessage("");
  };

  /**
   * Load chat list
   */
  const loadChatList = async () => {
    const fetchedChats = isGroupChatOpen
      ? await ChatDAL.getRooms(RoomType.GROUP)
      : await ChatDAL.getRooms(RoomType.PRIVATE);

    setChatList(fetchedChats.chatsPreview);
  };

  /**
   * Create group chat
   */
  const createGroupRoom = async () => {
    await ChatDAL.createRoom({
      roomType: RoomType.GROUP,
      name: groupChatName,
    });
    setGroupChatName("");
  };

  useEffect(() => {
    loadChatList();
  }, [isGroupChatOpen]);

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
                {isGroupChatOpen &&
                  <>
                    <Input
                      value={groupChatName}
                      onChange={setGroupChatName}
                      placeholder="Write a name of the chat..."
                      typeInput={InputType.Border}
                      onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
                        if (event.key === KeySymbols.ENTER) {
                          createGroupRoom();
                        }
                      }}
                    />
                    <Button
                      onClick={createGroupRoom}
                      buttonType={ButtonType.SECONDARY}
                      value="Create new group chat"
                    />
                  </>
                }
                {chatList.length > 0
                  ? chatList.map((chatItem) => (
                    <ChatItem
                      key={chatItem.roomId}
                      name={chatItem.roomId}
                      src={chatItem.src}
                      onClick={() => {
                        loadActiveChat(chatItem.roomId);
                        setIsChatHiddenOnMobile(false);
                      }}
                    />
                  ))
                  : <div>
                    No chats
                  </div>
                }
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
                        isOwnMessage={messageItem.ownerId === user?.uuid}
                      />
                    ))}
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
                  onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
                    if (event.key === KeySymbols.ENTER) {
                      sendMessage({
                        message,
                        roomId: chat.roomId,
                      });
                    }
                  }}
                />
                <Button
                  value="Send"
                  onClick={() => {
                    sendMessage({
                      message,
                      roomId: chat.roomId,
                    });

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
