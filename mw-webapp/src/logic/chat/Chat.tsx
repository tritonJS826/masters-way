import {useEffect, useState} from "react";
import {DialogTrigger, Root as DialogRoot} from "@radix-ui/react-dialog";
import clsx from "clsx";
import {chatAccessIds} from "cypress/accessIds/chatAccessIds";
import {observer} from "mobx-react-lite";
import {MessageIcon} from "src/assets/icons/MessageIcon";
import {IconSize} from "src/component/icon/Icon";
import {RoomType} from "src/dataAccessLogic/ChatDAL";
import {ChannelId} from "src/eventBus/EventBusChannelDict";
import {ChatEventId} from "src/eventBus/events/chat/ChatEventDict";
import {useListenEventBus} from "src/eventBus/useListenEvent";
import {languageStore} from "src/globalStore/LanguageStore";
import {ChatContent} from "src/logic/chat/chatContent/ChatContent";
import {chatStore} from "src/logic/chat/ChatStore";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/chat/Chat.module.scss";

/**
 * Chat component
 */
export const ChatModal = observer(() => {
  const {language} = languageStore;
  const {isChatOpen, setIsChatOpen, unreadMessagesAmount, loadUnreadMessagesAmount} = chatStore;

  const [isConnectionEstablished, setIsConnectionEstablished] = useState(false);
  useListenEventBus(ChannelId.CHAT, ChatEventId.CONNECTION_ESTABLISHED, () => {
    setIsConnectionEstablished(true);
  });

  useListenEventBus(ChannelId.CHAT, ChatEventId.CONNECTION_CLOSED, () => {
    setIsConnectionEstablished(false);
  });

  useEffect(() => {
    if (!isChatOpen) {
      loadUnreadMessagesAmount();
    }
    if (isChatOpen && isConnectionEstablished && chatStore.activeRoomStore?.activeRoom) {
      chatStore.activeRoomStore.reloadMessages();
    }
  }, [isChatOpen, isConnectionEstablished]);

  return (
    <DialogRoot
      open={isChatOpen}
      onOpenChange={setIsChatOpen}
    >
      <DialogTrigger
        onClick={() => {
          chatStore.initiateChatListStore(RoomType.PRIVATE);
        }}
        asChild
        data-cy={chatAccessIds.openChatButton}
      >
        <div
          role="button"
          className={styles.chatTrigger}
        >
          <div className={clsx(
            styles.indicator,
            isConnectionEstablished
              ? styles.onlineIndicator
              : styles.offlineIndicator)}
          />
          <div className={styles.iconWrapper}>
            <MessageIcon
              name="MessageIcon"
              size={IconSize.BIG}
              className={styles.messageIcon}
            />
          </div>
          <div className={styles.chatTriggerText}>
            {LanguageService.common.chat.openChat[language]}
          </div>
          <div
            className={styles.unreadMessagesAmount}
            data-cy={chatAccessIds.messagesAmount}
          >
            {unreadMessagesAmount}
          </div>
        </div>
      </DialogTrigger>

      <ChatContent />

    </DialogRoot>
  );
});
