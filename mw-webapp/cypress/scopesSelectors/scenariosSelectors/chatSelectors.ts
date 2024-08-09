import {chatAccessIds} from "cypress/accessIds/scenariosAccessIds/chatAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const chatSelectors = {
    getOpenChatButton: () => cy.get(getDataCy(chatAccessIds.openChatButton)),

    chatContainer:{
        getChatItem: (name: string) => cy.get(getDataCy(chatAccessIds.chatContainer.chatItem(name))),
        getMessageInput: () => cy.get(getDataCy(chatAccessIds.chatContainer.messageInput)),
        getSendMessageButton: () => cy.get(getDataCy(chatAccessIds.chatContainer.sendMessageButton)),
        getMessageItem: () => cy.get(getDataCy(chatAccessIds.chatContainer.messageItem))
    }
};