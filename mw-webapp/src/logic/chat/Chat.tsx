import {useEffect, useRef, useState} from "react";
import {DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTrigger, Root as DialogRoot} from "@radix-ui/react-dialog";
import clsx from "clsx";
import {chatAccessIds} from "cypress/accessIds/scenariosAccessIds/chatAccessIds";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Input, InputType} from "src/component/input/Input";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {ChatDAL, createMessageInGroupParams, RoomType} from "src/dataAccessLogic/ChatDAL";
import {ChannelId} from "src/eventBus/EventBusChannelDict";
import {ChatEventId} from "src/eventBus/events/chat/ChatEventDict";
import {useListenEventBus} from "src/eventBus/useListenEvent";
import {languageStore} from "src/globalStore/LanguageStore";
import {userStore} from "src/globalStore/UserStore";
import {ChatItem} from "src/logic/chat/chatItem/ChatItem";
import {chatListStore} from "src/logic/chat/ChatListStore";
import {chatRoomStore} from "src/logic/chat/ChatRoomStore";
import {chatStore} from "src/logic/chat/ChatStore";
import {MessageItem} from "src/logic/chat/messageItem/MessageItem";
import {Message} from "src/model/businessModel/Message";
import {ChatPreview} from "src/model/businessModelPreview/ChatPreview";
import {LanguageService} from "src/service/LanguageService";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/logic/chat/Chat.module.scss";

/**
 * Chat component
 */
export const ChatPage = observer(() => {
  const [isGroupChatOpen, setIsGroupChatOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [groupChatName, setGroupChatName] = useState<string>("");
  const [isChatHiddenOnMobile, setIsChatHiddenOnMobile] = useState<boolean>(true);
  // Const [activeChatUuid, setActiveChatUuid] = useState<string | null>(null);

  const {language} = languageStore;
  const {user} = userStore;

  // Const chatRoomStore = useStore<
  // new (chatUuid: string) => ChatRoomStore,
  // [string], ChatRoomStore>({
  //     storeForInitialize: ChatRoomStore,
  //     dataForInitialization: activeChatUuid ? [activeChatUuid] : null,
  //     dependency: [activeChatUuid],
  //   });

  const {activeChat, clearActiveChat, loadActiveChat, setActiveChatRoom} = chatRoomStore;
  const {isChatOpen, setIsChatOpen, unreadMessagesAmount, loadUnreadMessagesAmount} = chatStore;
  const {chatList, loadChatList, addChatToChatList} = chatListStore;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isConnectionEstablished, setIsConnectionEstablished] = useState(false);
  useListenEventBus(ChannelId.CHAT, ChatEventId.CONNECTION_ESTABLISHED, () => {
    setIsConnectionEstablished(true);
  });

  useListenEventBus(ChannelId.CHAT, ChatEventId.CONNECTION_CLOSED, () => {
    setIsConnectionEstablished(false);
  });

  useListenEventBus(ChannelId.CHAT, ChatEventId.MESSAGE_RECEIVED, (payload) => {
    const isChatForMessageOpen = payload.roomId === activeChat?.roomId;
    if (isChatForMessageOpen) {
      const newMessage = new Message({
        message: payload.message,
        ownerId: payload.ownerId,
        ownerName: payload.ownerName,
        ownerImageUrl: payload.ownerImageUrl,
        messageReaders: [],
      });
      activeChat.addMessage(newMessage);
    } else {
      displayNotification({
        text: `${payload.ownerName}: ${payload.message}`,
        type: NotificationType.INFO,
      });
    }
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [activeChat?.messages]);

  useListenEventBus(ChannelId.CHAT, ChatEventId.ROOM_CREATED, (payload) => {
    const newChatInRoomList = new ChatPreview({
      isBlocked: false,
      name: payload.name,
      roomId: payload.roomId,
      imageUrl: payload.imageUrl,
    });

    const isGroupChatOpenAndNewChatIsGroup = isGroupChatOpen && payload.roomType === RoomType.GROUP;
    const isPrivateChatOpenAndNewChatIsPrivate = !isGroupChatOpen && payload.roomType === RoomType.PRIVATE;
    const isShouldUpdateChatList = isGroupChatOpenAndNewChatIsGroup || isPrivateChatOpenAndNewChatIsPrivate;

    if (isShouldUpdateChatList) {
      addChatToChatList(newChatInRoomList);
    }

    displayNotification({
      text: `Room ${payload.name} created!`,
      type: NotificationType.INFO,
    });
  });

  /**
   * Send message
   */
  const sendMessage = async (params: createMessageInGroupParams) => {
    const trimmedMessage = params.message.trim();
    const isValidMessage = trimmedMessage !== "";
    if (isValidMessage) {
      try {
        await ChatDAL.createMessageInRoom({
          message: params.message,
          roomId: params.roomId,
        });
        setMessage("");
      } catch (error) {
        displayNotification({
          text: "The message was not sent. Check your Internet connection.",
          type: NotificationType.ERROR,
        });
      }
    }
  };

  useEffect(() => {
    loadChatList(isGroupChatOpen);
  }, [isGroupChatOpen]);

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
  }, [activeChat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }

  }, [activeChat]);

  useEffect(() => {
    if (!isChatOpen) {
      clearActiveChat();
    }

  }, [isChatOpen]);

  return (
    <DialogRoot
      open={isChatOpen}
      onOpenChange={setIsChatOpen}
    >
      <DialogTrigger
        onClick={() => loadChatList(isGroupChatOpen)}
        asChild
        data-cy={chatAccessIds.openChatButton}
      >
        <div
          role="button"
          className={styles.chatTrigger}
        >
          {/* <Icon
            name="WayIcon"
            size={IconSize.SMALL}
            className={styles.chatIcon}
          /> */}
          <div className={clsx(
            styles.indicator,
            isConnectionEstablished
              ? styles.onlineIndicator
              : styles.offlineIndicator)}
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
                      name={chatItem.name}
                      src={chatItem.imageUrl}
                      onClick={async () => {
                        const chatRoom = await loadActiveChat(chatItem.roomId);
                        setActiveChatRoom(chatRoom);
                        // SetActiveChatUuid(chatItem.roomId);
                        // LoadActiveChat(chatItem.roomId);
                        setIsChatHiddenOnMobile(false);
                      }}
                    />
                  ))
                  : <div>
                    {LanguageService.common.chat.noChats[language]}
                  </div>
                }
              </VerticalContainer>

              {activeChat &&
                <VerticalContainer className={clsx(
                  styles.chatBlock,
                  !isChatHiddenOnMobile && styles.chatBlockOpen,
                )}
                >
                  <HorizontalContainer className={styles.chatInfo}>
                    <ChatItem
                      name={activeChat.name}
                      src={activeChat.imageUrl}
                    />
                    <Dropdown
                      isModalBehavior={true}
                      trigger={(
                        <Tooltip
                          content={LanguageService.way.wayInfo.wayActionsTooltip[language]}
                          position={PositionTooltip.LEFT}
                        >
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
                        </Tooltip>
                      )}
                      dropdownMenuItems={[
                        {
                          id: "Close chat",
                          value: LanguageService.common.chat.closeChat[language],

                          /**
                           * Close chat on mobile
                           */
                          onClick: () => {
                            setIsChatHiddenOnMobile(true);
                            clearActiveChat();
                            // SetActiveChatUuid(null);
                            // LoadActiveChat();
                          },
                        },
                      ]}
                    />
                  </HorizontalContainer>
                  <VerticalContainer className={styles.messageList}>
                    <div
                      ref={messagesEndRef}
                      className={clsx(styles.messages, styles.messageList)}
                    >
                      {activeChat.messages.map((messageItem) => (
                        <MessageItem
                          key={messageItem.ownerId}
                          src={messageItem.ownerImageUrl}
                          userName={messageItem.ownerName}
                          userUuid={messageItem.ownerId}
                          message={
                            <p>
                              {messageItem.message}
                            </p>
                          }
                          isOwnMessage={messageItem.ownerId === user?.uuid}
                        />
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </VerticalContainer>
                </VerticalContainer>
              }
            </HorizontalContainer>

            {activeChat &&
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
                        roomId: activeChat.roomId,
                      });
                    }
                  }}
                  dataCy={chatAccessIds.chatContainer.messageInput}
                />
                <Button
                  value={LanguageService.common.chat.sendButton[language]}
                  onClick={() => {
                    sendMessage({
                      message,
                      roomId: activeChat.roomId,
                    });
                  }}
                  buttonType={ButtonType.PRIMARY}
                  dataCy={chatAccessIds.chatContainer.sendMessageButton}
                />
              </HorizontalContainer>
            }

          </VerticalContainer>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
});
