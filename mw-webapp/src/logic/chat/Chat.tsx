import {useEffect, useState} from "react";
import {DialogTrigger, Root as DialogRoot} from "@radix-ui/react-dialog";
import clsx from "clsx";
import {chatAccessIds} from "cypress/accessIds/scenariosAccessIds/chatAccessIds";
import {observer} from "mobx-react-lite";
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
    loadUnreadMessagesAmount();
  }, [isChatOpen]);

  return (
    <DialogRoot
      open={isChatOpen}
      onOpenChange={setIsChatOpen}
    >
      <DialogTrigger
        onClick={() => {}}
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
          <div className={styles.chatTriggerText}>
            {LanguageService.common.chat.openChat[language]}
          </div>
          <div className={styles.unreadMessagesAmount}>
            {unreadMessagesAmount}
          </div>
        </div>
      </DialogTrigger>

      <ChatContent />

    </DialogRoot>
  );
});
