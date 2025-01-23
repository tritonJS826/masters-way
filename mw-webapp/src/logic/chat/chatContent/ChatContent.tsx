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
import {Message} from "src/model/businessModel/Message";
import {LanguageService} from "src/service/LanguageService";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/logic/chat/chatContent/ChatContent.module.scss";

/**
 * Chat content shown on the page when chatModal is open
 */
export const ChatContent = observer(() => {
  const {language} = languageStore;
  const {user} = userStore;
  const {isChatOpen, activeRoomStore, chatListStore, addUnreadMessageToAmount} = chatStore;
  const [isInputDisabled, setInputDisabled] = useState<boolean>(false);
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
  //   activeRoomStore.setActiveRoomStore(room);
  // };

  /**
   * Read message
   */
  const readMessage = async (messageId: string, ownerId: string) => {
    !!activeRoomStore && isChatOpen && ownerId !== user?.uuid && await ChatDAL.updateMessageStatus(messageId, true);
  };

  useListenEventBus(ChannelId.CHAT, ChatEventId.MESSAGE_RECEIVED, (payload) => {
    const isChatForMessageOpen = !!activeRoomStore && payload.roomId === activeRoomStore.activeRoomId;
    if (isChatForMessageOpen && activeRoomStore.activeRoom) {
      const newMessage = new Message({
        uuid: payload.messageId,
        message: payload.message,
        ownerId: payload.ownerId,
        ownerName: payload.ownerName,
        ownerImageUrl: payload.ownerImageUrl,
        messageReaders: [],
      });
      activeRoomStore.activeRoom.addMessage(newMessage);
      readMessage(newMessage.uuid, newMessage.ownerId);
    } else {
      addUnreadMessageToAmount();
      displayNotification({
        text: `${payload.ownerName}: ${payload.message}`,
        type: NotificationType.INFO,
      });
    }
  });

  const activeChatRoomMessages = !!activeRoomStore && activeRoomStore.activeRoom
    ? activeRoomStore.activeRoom.messages
    : [];
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [activeChatRoomMessages]);

  /**
   * Send message
   */
  const sendMessage = async (params: createMessageInGroupParams) => {
    const trimmedMessage = params.message.trim();
    const isValidMessage = trimmedMessage !== "";
    if (isValidMessage && !!activeRoomStore) {
      setInputDisabled(true);
      try {
        await ChatDAL.createMessageInRoom({
          message: params.message,
          roomId: params.roomId,
        });
        activeRoomStore.setMessage("");
      } catch (error) {
        displayNotification({
          text: "The message was not sent. Check your Internet connection.",
          type: NotificationType.ERROR,
        });
      }
    } else {

      /**
       * Send error notification when activeRoomStore is null
       */
      if (!activeRoomStore) {
        displayNotification({
          text: "Active chat is not exist.",
          type: NotificationType.ERROR,
        });
      }
    }
    setInputDisabled(false);
  };

  useListenEventBus(ChannelId.CHAT, ChatEventId.ROOM_CREATED, (payload) => {

    const isPrivateChatOpenAndNewChatIsPrivate = !!chatListStore && chatListStore.roomType === RoomType.PRIVATE
      && payload.roomType === RoomType.PRIVATE;

    /* This constant  will be use when we reopen group chats feature */
    const isShouldUpdateChatList = isPrivateChatOpenAndNewChatIsPrivate;

    displayNotification({
      text: `Room ${payload.name} created!`,
      type: NotificationType.INFO,
    });
    if (isShouldUpdateChatList) {
      chatListStore.loadChatList();
    }
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
          chatStore.resetChatStores();
        }}
        className={styles.chatContent}
      >
        <VerticalContainer className={styles.chatContainer}>
          <HorizontalContainer className={styles.chatHeader}>
            <HorizontalContainer>
              {/* Commented feature while  groups button is commented
              <Button
                onClick={() => {
                  if (chatListStore) {
                    chatListStore.loadChatList();
                    chatStore.resetActiveRoomStore();
                  }
                }}
                buttonType={ButtonType.SECONDARY}
                value={LanguageService.common.chat.personalChats[language]}
              /> */}

              {/* Commented feature while it's not realized on the back-end
              <Button
                onClick={() => {
                  setRoomType(RoomType.GROUP);
                  loadChatList();
                  activeRoomStore.clearActiveChat();
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
                  chatStore.resetActiveRoomStore();
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
              !!activeRoomStore && styles.chatListHide,
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
              { !!chatListStore && chatListStore.chatPreviewList.length > 0
                ? chatListStore.chatPreviewList.map((chatItem) => (
                  <ChatItem
                    key={chatItem.roomId}
                    name={chatItem.name}
                    src={chatItem.imageUrl}
                    dataCy={chatAccessIds.chatContainer.listChatItem(chatItem.name)}
                    onClick={() => {
                      chatStore.initiateActiveRoomStore(chatItem.roomId);
                    }}
                  />
                ))
                : <div>
                  {LanguageService.common.chat.noChats[language]}
                </div>
              }
            </VerticalContainer>

            { !!activeRoomStore && activeRoomStore.activeRoom &&
            <VerticalContainer className={clsx(
              styles.chatBlock,
              activeRoomStore && styles.chatBlockOpen,
            )}
            >
              <HorizontalContainer className={styles.chatInfo}>
                <ChatItem
                  name={activeRoomStore.activeRoom.name}
                  src={activeRoomStore.activeRoom.imageUrl}
                  dataCy={chatAccessIds.chatContainer.chatItem(activeRoomStore.activeRoom.name)}
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
                            chatStore.resetActiveRoomStore();
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
                  { activeRoomStore.activeRoom.messages.map((messageItem) => (
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

          { !!activeRoomStore && activeRoomStore.activeRoom &&
            <HorizontalContainer className={styles.messageInputBlock}>
              <Textarea
                cy={chatAccessIds.chatContainer.messageInput}
                defaultValue={activeRoomStore.message}
                onChange={activeRoomStore.setMessage}
                placeholder={LanguageService.common.chat.messagePlaceholder[language]}
                isAutofocus
                isDisabled={isInputDisabled}
                onKeyPress={(event: React.KeyboardEvent<HTMLElement>) => {
                  if ((event.key === KeySymbols.ENTER && event.ctrlKey && activeRoomStore.activeRoom)
                    || (event.key === KeySymbols.ENTER && event.shiftKey && activeRoomStore.activeRoom)) {
                    sendMessage({
                      message: activeRoomStore.message,
                      roomId: activeRoomStore.activeRoom.roomId,
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
                    if (activeRoomStore.activeChat) {
                      await uploadFile(activeRoomStore.activeChat.roomId, event);
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
                  if (!!activeRoomStore && activeRoomStore.activeRoom) {
                    await sendMessage({
                      message: activeRoomStore.message,
                      roomId: activeRoomStore.activeRoom.roomId,
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
