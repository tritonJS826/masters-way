import {useEffect, useState} from "react";
import {DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTrigger, Root as DialogRoot} from "@radix-ui/react-dialog";
import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Input, InputType} from "src/component/input/Input";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {ChatDAL, createMessageInGroupParams, RoomType} from "src/dataAccessLogic/ChatDAL";
import {ChannelId} from "src/eventBus/EventBusChannelDict";
import {ChatEventId} from "src/eventBus/events/chat/ChatEventDict";
import {useListenEventBus} from "src/eventBus/useListenEvent";
import {languageStore} from "src/globalStore/LanguageStore";
import {userStore} from "src/globalStore/UserStore";
import {ChatItem} from "src/logic/chat/chatItem/ChatItem";
import {MessageItem} from "src/logic/chat/messageItem/MessageItem";
import {Chat} from "src/model/businessModel/Chat";
import {Message} from "src/model/businessModel/Message";
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
export const ChatPage = observer((props: ChatProps) => {
  const [isGroupChatOpen, setIsGroupChatOpen] = useState<boolean>(false);
  const [chat, setChat] = useState<Chat | null>(null);

  const {language} = languageStore;
  const {user} = userStore;
  const [isOpen, setIsOpen] = useState(props.isOpen ?? false);
  const [message, setMessage] = useState<string>("");
  const [groupChatName, setGroupChatName] = useState<string>("");
  const [chatList, setChatList] = useState<ChatPreview[]>([]);
  const [isChatHiddenOnMobile, setIsChatHiddenOnMobile] = useState<boolean>(true);
  const [unreadMessagesAmount, setUnreadMessagesAmount] = useState<number>(0);

  useListenEventBus(ChannelId.CHAT, ChatEventId.MESSAGE_RECEIVED, (payload) => {
    const isChatForMessageOpen = payload.roomId === chat?.roomId;
    if (isChatForMessageOpen) {
      const newMessage = new Message({
        message: payload.message,
        ownerId: payload.ownerId,
      });
      chat.addMessage(newMessage);
    } else {
      displayNotification({
        text: `${payload.ownerName}: ${payload.message}`,
        type: NotificationType.INFO,
      });
    }
  });

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
    const trimmedMessage = params.message.trim();
    const isValidMessage = trimmedMessage !== "";
    if (isValidMessage) {
      setMessage("");
      await ChatDAL.createMessageInRoom({
        message: params.message,
        roomId: params.roomId,
      });
    }
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
   * Load amount of all unread messages
   */
  const loadUnreadMessagesAmount = async () => {
    const unreadMessages = await ChatDAL.getChatPreview();
    setUnreadMessagesAmount(unreadMessages);
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
    loadUnreadMessagesAmount();
  }, []);

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger
        onClick={loadChatList}
        asChild
      >
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
          <div className={styles.unreadMessagesAmount}>
            {unreadMessagesAmount}
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
                  onClick={() => {
                    setIsGroupChatOpen(false);
                    setIsChatHiddenOnMobile(true);
                  }}
                  buttonType={ButtonType.SECONDARY}
                  value={LanguageService.common.chat.personalChats[language]}
                />
                <Button
                  onClick={() => {
                    setIsGroupChatOpen(true);
                    setIsChatHiddenOnMobile(true);
                  }}
                  buttonType={ButtonType.SECONDARY}
                  value={LanguageService.common.chat.groupChats[language]}
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
                      placeholder={LanguageService.common.chat.groupChatPlaceholder[language]}
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
                      value={LanguageService.common.chat.createGroupChatButton[language]}
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
                    {LanguageService.common.chat.noChats[language]}
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
                    <Dropdown
                      trigger={(
                        <Button
                          className={styles.wayActionsIcon}
                          buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                          onClick={() => {}}
                          icon={
                            <Icon
                              size={IconSize.MEDIUM}
                              name={"MoreVertical"}
                            />
                          }
                        />
                      )}
                      dropdownMenuItems={[
                        {
                          id: "Close chat",
                          value: LanguageService.common.chat.closeChat[language],

                          /**
                           * Close chat on mobile
                           */
                          onClick: () => setIsChatHiddenOnMobile(true),
                        },
                      ]}
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
                  placeholder={LanguageService.common.chat.messagePlaceholder[language]}
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
                  value={LanguageService.common.chat.sendButton[language]}
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
});
