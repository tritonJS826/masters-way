import {io} from "socket.io-client";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {makeChatMessageReceivedEvent} from "src/eventBus/events/chat/ChatEvents";
import {emitEvent} from "src/eventBus/useEmitEvent";

export const socket = io("http://localhost:7994", {autoConnect: true});

socket.on("message", (text: string) => {
  emitEvent(makeChatMessageReceivedEvent({text}));
  displayNotification({text: "received in handler", type: NotificationType.INFO});
});
