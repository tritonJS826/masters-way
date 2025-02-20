import {useEffect, useRef, useState} from "react";
import {DialogClose, DialogContent, DialogOverlay, DialogPortal} from "@radix-ui/react-dialog";
import clsx from "clsx";
import {chatAccessIds} from "cypress/accessIds/chatAccessIds";
import {observer} from "mobx-react-lite";
import logo from "src/assets/mastersWayLogo.svg";
import logoLight from "src/assets/mastersWayLogoLight.svg";
import {Button, ButtonType} from "src/component/button/Button";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {LOGO_TEXT} from "src/component/header/Header";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {Loader} from "src/component/loader/Loader";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {Textarea, TextareaType} from "src/component/textarea/Textarea";
import {getMapThemeSources, ThemedImage} from "src/component/themedImage/ThemedImage";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {ChatDAL, createMessageInGroupParams, RoomType} from "src/dataAccessLogic/ChatDAL";
import {ChannelId} from "src/eventBus/EventBusChannelDict";
import {ChatEventId} from "src/eventBus/events/chat/ChatEventDict";
import {useListenEventBus} from "src/eventBus/useListenEvent";
import {languageStore} from "src/globalStore/LanguageStore";
import {Theme, themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {ChatItem} from "src/logic/chat/chatItem/ChatItem";
import {chatStore} from "src/logic/chat/ChatStore";
import {MessageItem} from "src/logic/chat/messageItem/MessageItem";
import {Room} from "src/model/businessModel/Chat";
import {Message} from "src/model/businessModel/Message";
import {ChatPreview} from "src/model/businessModelPreview/ChatPreview";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/logic/chat/chatContent/ChatContent.module.scss";

/**
 * Chat content shown on the page when chatModal is open
 */
export const ChatContent = observer(() => {
  const {language} = languageStore;
  const {user} = userStore;
  const {theme} = themeStore;
  const {isChatOpen, activeRoomStore, chatListStore, addUnreadMessageToAmount} = chatStore;
  const [isInputDisabled, setInputDisabled] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isShouldRenderChatList = !!chatListStore && !chatListStore.isLoadingchatListPreview;
  const isShouldRenderActiveRoom = !!activeRoomStore && !!activeRoomStore.activeRoom;

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
   * Get active room participant id;
   */
  const getActiveRoomParticipantId = (activeRoom: Room) => {
    const participantIndex = 1;

    return activeRoom.users[participantIndex].userId;
  };

  /**
   * Read message
   */
  const readMessage = async (messageId: string, ownerId: string) => {
    !!activeRoomStore && isChatOpen && ownerId !== user?.uuid && await ChatDAL.updateMessageStatus(messageId, true);
  };

  useListenEventBus(ChannelId.CHAT, ChatEventId.MESSAGE_RECEIVED, (payload) => {
    const isChatForMessageOpen = !!activeRoomStore && payload.roomId === activeRoomStore.activeRoom.roomId;
    if (isChatForMessageOpen) {
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

  const activeChatRoomMessages = !!activeRoomStore && activeRoomStore.activeRoom ?
    activeRoomStore.activeRoom.messages
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
    const newChatPreview = new ChatPreview({
      isBlocked: false,
      name: payload.name,
      roomId: payload.roomId,
      imageUrl: payload.imageUrl,
      participantIds: payload.users.map((participant) => participant.userId),
    });

    const isChatListRoomTypePrivateAndNewChatIsPrivate = !!chatListStore && chatListStore.roomType === RoomType.PRIVATE
      && payload.roomType === RoomType.PRIVATE;

    displayNotification({
      text: `Room ${payload.name} created!`,
      type: NotificationType.INFO,
    });
    if (isChatListRoomTypePrivateAndNewChatIsPrivate) {
      chatListStore.addChatToChatList(newChatPreview);
    }
  });

  /**
   * Component renderChatPreviewList
   */
  const renderChatPreviewList = (chatPreviewList: ChatPreview[]) => {

    return !!chatListStore && chatListStore.chatPreviewList.length === 0 ?

      LanguageService.common.chat.noChats[language]
      :
      chatPreviewList.map((chatItem) => (
        <ChatItem
          key={chatItem.roomId}
          name={chatItem.name}
          src={chatItem.imageUrl}
          className={chatItem.roomId === activeRoomStore?.activeChatItemRoomId ?
            styles.activeChatItem
            : ""}
          dataCy={chatAccessIds.chatContainer.listChatItem(chatItem.name)}
          onClick={() => {
            chatStore.initiateActiveRoomStore(chatItem.roomId);
          }}
        />
      ),
      );

  };

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

  /**
   * Render Loader
   */
  const renderLoader = () => {

    return (
      <HorizontalContainer className={styles.loaderBlock}>
        <Loader
          theme={theme}
          isAbsolute
        />
      </HorizontalContainer>
    );
  };

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
                  chatStore.resetChatStores();
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
              !activeRoomStore ? styles.chatListFullWidth : styles.chatListHide,
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
              { isShouldRenderChatList
                ? renderChatPreviewList(chatListStore.chatPreviewList)
                : renderLoader()
              }

            </VerticalContainer>

            {
              !activeRoomStore && isShouldRenderChatList &&
              <VerticalContainer className={clsx(
                styles.chatBlockClose,
              )}
              >
                <HorizontalContainer className={styles.logoWrapper}>
                  <ThemedImage
                    className={styles.logoIcon}
                    sources={getMapThemeSources({
                      [Theme.DARK]: logoLight,
                      [Theme.LIGHT]: logo,
                      [Theme.OBSIDIAN]: logoLight,
                    })}
                    theme={theme}
                    name={LOGO_TEXT}
                  />
                </HorizontalContainer>
              </VerticalContainer>
            }

            { isShouldRenderActiveRoom &&
            <VerticalContainer className={clsx(styles.chatBlock, styles.chatBlockOpen)}>
              <HorizontalContainer className={styles.chatInfo}>
                <Link
                  path={pages.user.getPath({uuid: getActiveRoomParticipantId(activeRoomStore.activeRoom)})}
                  className={styles.chatItemLink}
                >
                  <ChatItem
                    name={activeRoomStore.activeRoom.name}
                    src={activeRoomStore.activeRoom.imageUrl}
                    dataCy={chatAccessIds.chatContainer.chatItem(activeRoomStore.activeRoom.name)}
                  />
                </Link>
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

          { !!activeRoomStore && isShouldRenderChatList &&
            <HorizontalContainer className={styles.messageInputBlock}>
              <Textarea
                cy={chatAccessIds.chatContainer.messageInput}
                defaultValue={activeRoomStore.message}
                onChange={activeRoomStore.setMessage}
                placeholder={LanguageService.common.chat.messagePlaceholder[language]}
                isAutofocus
                isDisabled={isInputDisabled}
                onKeyPress={(event: React.KeyboardEvent<HTMLElement>) => {
                  if ((event.key === KeySymbols.ENTER && event.ctrlKey)
                    || (event.key === KeySymbols.ENTER && event.shiftKey)) {
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
                  await sendMessage({
                    message: activeRoomStore.message,
                    roomId: activeRoomStore.activeRoom.roomId,
                  });
                }
                }
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
