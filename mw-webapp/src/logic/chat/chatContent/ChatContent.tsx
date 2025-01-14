import {useEffect, useRef, useState} from "react";
import {DialogClose, DialogContent, DialogOverlay, DialogPortal} from "@radix-ui/react-dialog";
import clsx from "clsx";
import {chatAccessIds} from "cypress/accessIds/chatAccessIds";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {Textarea, TextareaType} from "src/component/textarea/Textarea";
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
import {chatStore} from "src/logic/chat/ChatStore";
import {MessageItem} from "src/logic/chat/messageItem/MessageItem";
import {Room} from "src/model/businessModel/Chat";
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
  const {isChatOpen, activeChatStore, chatListStore, addUnreadMessageToAmount} = chatStore;
  const [isInputDisabled, setInputDisabled] = useState<boolean>(false);
  const [activeRoom, setActiveRoom] = useState<Room>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Create group chat
   * Commented feature while it's not realized on the back-end
   */

  // const createGroupRoom = async () => {
  //   const room = await ChatDAL.findOrCreateRoom({
  //     roomType: RoomType.GROUP,
  //     name: groupChatName,
  //   });
  //   setGroupChatName("");
  //   activeChatStore.setActiveChatStore(room);
  // };

  /**
   * Read message
   */
  const readMessage = async (messageId: string, ownerId: string) => {
    activeChatStore?.activeChat && isChatOpen && ownerId !== user?.uuid && await ChatDAL.updateMessageStatus(messageId, true);
  };

  useEffect(() => {
    if (activeChatStore?.activeChat) {
      setActiveRoom(activeChatStore.activeChat);
    }
  }, [activeChatStore?.activeChat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }

  }, [activeChatStore?.activeChat]);

  useListenEventBus(ChannelId.CHAT, ChatEventId.MESSAGE_RECEIVED, (payload) => {
    const isChatForMessageOpen = payload.roomId === activeChatStore?.activeChat?.roomId;
    if (isChatForMessageOpen) {
      const newMessage = new Message({
        uuid: payload.messageId,
        message: payload.message,
        ownerId: payload.ownerId,
        ownerName: payload.ownerName,
        ownerImageUrl: payload.ownerImageUrl,
        messageReaders: [],
      });
      activeChatStore?.activeChat?.addMessage(newMessage);
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
  }, [activeChatStore?.activeChat?.messages]);

  /**
   * Send message
   */
  const sendMessage = async (params: createMessageInGroupParams) => {
    const trimmedMessage = params.message.trim();
    const isValidMessage = trimmedMessage !== "";
    if (isValidMessage && activeChatStore) {
      setInputDisabled(true);
      try {
        await ChatDAL.createMessageInRoom({
          message: params.message,
          roomId: params.roomId,
        });
        activeChatStore.setMessage("");
      } catch (error) {
        displayNotification({
          text: "The message was not sent. Check your Internet connection.",
          type: NotificationType.ERROR,
        });
      }
    } else {

      /**
       * Send error notification when activeChatStore is null
       */
      if (!activeChatStore) {
        displayNotification({
          text: "Active chat is not exist.",
          type: NotificationType.ERROR,
        });
      }
    }
    setInputDisabled(false);
  };

  useEffect(() => {
    if (isChatOpen) {
      chatListStore?.loadChatList();
    }
  }, [isChatOpen]);

  // UseEffect(() => {
  //   if (!isChatOpen && chatListStore?.roomType !== RoomType.PRIVATE) {
  //     chatListStore?.setRoomType(RoomType.PRIVATE);
  //     chatListStore?.loadChatList();
  //   }
  // }, [isChatOpen]);

  useListenEventBus(ChannelId.CHAT, ChatEventId.ROOM_CREATED, (payload) => {
    const newChatInRoomList = new ChatPreview({
      isBlocked: false,
      name: payload.name,
      roomId: payload.roomId,
      imageUrl: payload.imageUrl,
      participantIds: payload.users.map((participant) => participant.userId),
    });

    const isGroupChatOpenAndNewChatIsGroup = chatListStore?.roomType === RoomType.GROUP && payload.roomType === RoomType.GROUP;
    const isPrivateChatOpenAndNewChatIsPrivate = chatListStore?.roomType === RoomType.PRIVATE
      && payload.roomType === RoomType.PRIVATE;

    const isShouldUpdateChatList = isGroupChatOpenAndNewChatIsGroup || isPrivateChatOpenAndNewChatIsPrivate;

    if (isShouldUpdateChatList) {
      chatListStore.addChatToChatList(newChatInRoomList);
    }

    displayNotification({
      text: `Room ${payload.name} created!`,
      type: NotificationType.INFO,
    });

  });

  /**
   * Upload file
   * We decided to off this functionality because users afraid to login when we ask access to google disk.
   * Need to check hypothesis
   */
  // const uploadFile = async (roomId: string, event: React.ChangeEvent<HTMLInputElement>) => {
  //   const fileBlob = !!event.target.files && event.target.files[0];
  //   if (fileBlob) {
  //     await FileDAL.uploadFile({
  //       roomId,
  //       file: fileBlob,
  //     });
  //   }
  // };

  return (
    <DialogPortal>
      <DialogOverlay className={styles.chatOverlay} />
      <DialogContent
        onInteractOutside={() => {
          chatStore.deleteActiveChatStore();
        }}
        className={styles.chatContent}
      >
        <VerticalContainer className={styles.chatContainer}>
          <HorizontalContainer className={styles.chatHeader}>
            <HorizontalContainer>
              <Button
                onClick={() => {
                  chatListStore?.loadChatList();
                }}
                buttonType={ButtonType.SECONDARY}
                value={LanguageService.common.chat.personalChats[language]}
              />

              {/* Commented feature while it's not realized on the back-end
              <Button
                onClick={() => {
                  setRoomType(RoomType.GROUP);
                  loadChatList();
                  activeChatStore.clearActiveChat();
                }}
                buttonType={ButtonType.SECONDARY}
                value={LanguageService.common.chat.groupChats[language]}
              /> */}
            </HorizontalContainer>
            <DialogClose asChild>
              <div
                role="button"
                className={styles.removeButton}
                onClick={() => {
                  chatStore.deleteActiveChatStore();
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
              {/* Commented feature while it's not realized on the back-end
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
              */}
              { chatListStore && chatListStore.chatList.length > 0
                ? chatListStore?.chatList.map((chatItem) => (
                  <ChatItem
                    key={chatItem.roomId}
                    name={chatItem.name}
                    src={chatItem.imageUrl}
                    dataCy={chatAccessIds.chatContainer.listChatItem(`${chatItem.name}`)}
                    onClick={() => {
                      chatStore.initiateActiveChatStore(chatItem.roomId);
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
                  dataCy={chatAccessIds.chatContainer.chatItem(`${activeChatStore.activeChat.name}`)}
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
                            chatStore.deleteActiveChatStore();
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
                  {activeChatStore.activeChat?.messages.map((messageItem) => (
                    <MessageItem
                      key={messageItem.uuid}
                      src={messageItem.ownerImageUrl}
                      userName={messageItem.ownerName}
                      userUuid={messageItem.ownerId}
                      message={messageItem.message}
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
              <Textarea
                cy={chatAccessIds.chatContainer.messageInput}
                defaultValue={activeChatStore.message}
                onChange={activeChatStore.setMessage}
                placeholder={LanguageService.common.chat.messagePlaceholder[language]}
                isAutofocus
                isDisabled={isInputDisabled}
                onKeyPress={(event: React.KeyboardEvent<HTMLElement>) => {
                  if ((event.key === KeySymbols.ENTER && event.ctrlKey && activeRoom)
                    || (event.key === KeySymbols.ENTER && event.shiftKey && activeRoom)) {
                    sendMessage({
                      message: activeChatStore.message,
                      roomId: activeRoom.roomId,
                    });
                  }
                }}
                typeTextarea={TextareaType.Border}
                className={styles.chatTextarea}
              />
              {/* We decided to off this functionality because users afraid to login when we ask access to google disk.
              Need to check hypothesis
              <label>
                <input
                  type="file"
                  onChange={async (event) => {
                    if (activeRoom) {
                      await uploadFile(activeRoom.roomId, event);
                    }
                  }}
                  className={styles.uploadFileInput}
                />
                <Tooltip
                  position={PositionTooltip.BOTTOM}
                  content="Coming soon"
                >
                  <Icon
                    size={IconSize.MEDIUM}
                    name={"UploadIcon"}
                    className={styles.uploadFileIcon}
                  />
                </Tooltip>
              </label> */}
              <Button
                value={LanguageService.common.chat.sendButton[language]}
                onClick={async () => {
                  if (activeChatStore.activeChat) {
                    await sendMessage({
                      message: activeChatStore.message,
                      roomId: activeChatStore.activeChat.roomId,
                    });
                  }
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
