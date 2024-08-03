// Import { io } from "socket.io-client";
// import {
//   displayNotification,
//   NotificationType,
// } from "src/component/notification/displayNotification";
// import { makeChatMessageReceivedEvent } from "src/eventBus/events/chat/ChatEvents";
// import { emitEvent } from "src/eventBus/useEmitEvent";

// export const socket = io("http://localhost:7994/ws", {
//   autoConnect: true,
//   path: "/ws",
// });

// socket.on("message", (text: string) => {
//   emitEvent(makeChatMessageReceivedEvent({ text }));
//   displayNotification({
//     text: "received in handler",
//     type: NotificationType.INFO,
//   });
// });

// socket.on("open", (text: string) => {
//   emitEvent(makeChatMessageReceivedEvent({ text }));
//   displayNotification({
//     text: "received in handler open",
//     type: NotificationType.INFO,
//   });
// });

/**
 * A
 */
export const connectSocket = () => {
  const exampleSocket = new WebSocket("ws://localhost:7994/ws");

  /**
   * A
   */
  exampleSocket.onopen = () => {
    // Console.log("WebSocket is open now.");
  };

  /**
   * A
   */
  exampleSocket.onmessage = () => {
    // Console.log("Received:", event.data);
  };

  /**
   * A
   */
  exampleSocket.onclose = () => {
    // Console.log("WebSocket is closed now.");
  };

  /**
   * A
   */
  exampleSocket.onerror = () => {
    // Console.log("WebSocket error:", error);
  };
};
