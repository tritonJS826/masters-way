import {useEffect, useRef, useState} from "react";
import {DialogClose, DialogContent, DialogOverlay, DialogPortal} from "@radix-ui/react-dialog";
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
import {ActiveChatStore} from "src/logic/chat/ChatRoomStore";
import {chatStore} from "src/logic/chat/ChatStore";
import {MessageItem} from "src/logic/chat/messageItem/MessageItem";
import {Message} from "src/model/businessModel/Message";
import {ChatPreview} from "src/model/businessModelPreview/ChatPreview";
import {LanguageService} from "src/service/LanguageService";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/logic/chat/chatContent/ChatContent.module.scss";

/**
 * Chat content shown on the page when chatModal is open
 */
export const ChatContent = observer(() => {
  const {language} = languageStore;
  const {user} = userStore;
  const {isChatOpen, addUnreadMessageToAmount} = chatStore;

  const [activeChatStore, setActiveChatStore] = useState<ActiveChatStore | null>(null);
  const {chatList, roomType, groupChatName, setGroupChatName, loadChatList, addChatToChatList, setRoomType} = chatListStore;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Create group chat
   */
  const createGroupRoom = async () => {
    const room = await ChatDAL.createRoom({
      roomType: RoomType.GROUP,
      name: groupChatName,
    });
    setGroupChatName("");
    setActiveChatStore(new ActiveChatStore(room));
  };

  /**
   * Read message
   */
  const readMessage = async (messageId: string, ownerId: string) => {
    activeChatStore?.activeChat && isChatOpen && ownerId !== user?.uuid && await ChatDAL.updateMessageStatus(messageId, true);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }

  }, [activeChatStore?.activeChat]);

  useListenEventBus(ChannelId.CHAT, ChatEventId.MESSAGE_RECEIVED, (payload) => {
    const isChatForMessageOpen = payload.roomId === activeChatStore?.activeChat.roomId;
    if (isChatForMessageOpen) {
      const newMessage = new Message({
        uuid: payload.messageId,
        message: payload.message,
        ownerId: payload.ownerId,
        ownerName: payload.ownerName,
        ownerImageUrl: payload.ownerImageUrl,
        messageReaders: [],
      });
      activeChatStore?.activeChat.addMessage(newMessage);
      readMessage(newMessage.uuid, newMessage.ownerId);
    } else {
      addUnreadMessageToAmount();
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
  }, [activeChatStore?.activeChat.messages]);

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
        activeChatStore?.setMessage("");
      } catch (error) {
        displayNotification({
          text: "The message was not sent. Check your Internet connection.",
          type: NotificationType.ERROR,
        });
      }
    }
  };

  /**
   * Load chat list
   */
  const loadChatPreviewList = () => {
    loadChatList();
  };

  useEffect(() => {
    loadChatPreviewList();
  }, []);

  useEffect(() => {
    if (!isChatOpen && roomType !== RoomType.PRIVATE) {
      setRoomType(RoomType.PRIVATE);
      loadChatPreviewList();
    }
  }, [isChatOpen]);

  /**
   * Initialize active chat store
   */
  const initializeActiveChat = async (roomId: string) => {
    const fetchedActiveChat = await ChatDAL.getRoomById(roomId);
    const activeRoom = new ActiveChatStore(fetchedActiveChat);
    setActiveChatStore(activeRoom);
  };

  useListenEventBus(ChannelId.CHAT, ChatEventId.ROOM_CREATED, (payload) => {
    const newChatInRoomList = new ChatPreview({
      isBlocked: false,
      name: payload.name,
      roomId: payload.roomId,
      imageUrl: payload.imageUrl,
      participantIds: payload.users.map((participant) => participant.userId),
    });

    const isGroupChatOpenAndNewChatIsGroup = roomType === RoomType.GROUP && payload.roomType === RoomType.GROUP;
    const isPrivateChatOpenAndNewChatIsPrivate = roomType === RoomType.PRIVATE
      && payload.roomType === RoomType.PRIVATE;
    const isShouldUpdateChatList = isGroupChatOpenAndNewChatIsGroup || isPrivateChatOpenAndNewChatIsPrivate;

    if (isShouldUpdateChatList) {
      addChatToChatList(newChatInRoomList);
    }

    displayNotification({
      text: `Room ${payload.name} created!`,
      type: NotificationType.INFO,
    });
  });

  return (
    <DialogPortal>
      <DialogOverlay className={styles.chatOverlay} />
      <DialogContent
        onInteractOutside={() => {
          setActiveChatStore(null);
        }}
        className={styles.chatContent}
      >
        <VerticalContainer className={styles.chatContainer}>
          <HorizontalContainer className={styles.chatHeader}>
            <HorizontalContainer>
              <Button
                onClick={() => {
                  setRoomType(RoomType.PRIVATE);
                  loadChatList();
                  setActiveChatStore(null);
                }}
                buttonType={ButtonType.SECONDARY}
                value={LanguageService.common.chat.personalChats[language]}
              />
              <Button
                onClick={() => {
                  setRoomType(RoomType.GROUP);
                  loadChatList();
                  setActiveChatStore(null);
                }}
                buttonType={ButtonType.SECONDARY}
                value={LanguageService.common.chat.groupChats[language]}
              />
            </HorizontalContainer>
            <DialogClose asChild>
              <div
                role="button"
                className={styles.removeButton}
                onClick={() => {
                  setActiveChatStore(null);
                }}
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
              activeChatStore && styles.chatListHide,
            )}
            >
              {roomType === RoomType.GROUP &&
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
                    onClick={() => {
                      setActiveChatStore(null);
                      initializeActiveChat(chatItem.roomId);
                    }}
                  />
                ))
                : <div>
                  {LanguageService.common.chat.noChats[language]}
                </div>
              }
            </VerticalContainer>

            {activeChatStore?.activeChat &&
            <VerticalContainer className={clsx(
              styles.chatBlock,
              activeChatStore && styles.chatBlockOpen,
            )}
            >
              <HorizontalContainer className={styles.chatInfo}>
                <ChatItem
                  name={activeChatStore.activeChat.name}
                  src={activeChatStore.activeChat.imageUrl}
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
                        onClick={() => { }}
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
                      dropdownSubMenuItems: [
                        {
                          id: "Close chat",
                          isPreventDefaultUsed: false,
                          value: LanguageService.common.chat.closeChat[language],

                          /**
                           * Close chat on mobile
                           */
                          onClick: () => {
                            setActiveChatStore(null);
                          },
                        },
                      ],
                    },
                  ]}
                />
              </HorizontalContainer>
              <VerticalContainer className={styles.messageList}>
                <div
                  ref={messagesEndRef}
                  className={clsx(styles.messages, styles.messageList)}
                >
                  {activeChatStore.activeChat.messages.map((messageItem) => (
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

          {activeChatStore?.activeChat &&
          <HorizontalContainer className={styles.messageInputBlock}>
            <Input
              dataCy={chatAccessIds.chatContainer.messageInput}
              value={activeChatStore.message}
              onChange={activeChatStore.setMessage}
              placeholder={LanguageService.common.chat.messagePlaceholder[language]}
              typeInput={InputType.Border}
              onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
                if (event.key === KeySymbols.ENTER) {
                  sendMessage({
                    message: activeChatStore.message,
                    roomId: activeChatStore.activeChat.roomId,
                  });
                }
              }}
            />
            <Button
              value={LanguageService.common.chat.sendButton[language]}
              onClick={async () => {
                await sendMessage({
                  message: activeChatStore.message,
                  roomId: activeChatStore.activeChat.roomId,
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
  );
});
