import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";
import {chatSelectors} from "cypress/scopesSelectors/scenariosSelectors/chatSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import chatData from "cypress/fixtures/scenariosFixtures/chatFixture.json"

const apiUrl = Cypress.env('API_BASE_PATH');

beforeEach(() => {
    cy.request('GET', `${apiUrl}/dev/reset-db`);
    login(testUserData.testUsers.user1.loginLink); 
});

afterEach(() => {
    cy.clearAllStorage();
});

function login(user: string): void{
    cy.visit(user);
}

function logout(): void{
    headerSelectors.getBurgerMenu().click();
    navigationMenuSelectors.getLogoutButton().click();
}

describe('Chat tests', () => {

    it('User should be able to send a message to another user in the chat', () => {
        headerSelectors.getBurgerMenu().click();
        navigationMenuSelectors.menuItemLinks.getAllUsersItemLink().click();

        allUsersSelectors.allWaysCard.getCardLink(testUserData.users.Jane.userName).click();
        userPersonalSelectors.getConnectButton().click();
        chatSelectors.getOpenChatButton().click({force: true});
        chatSelectors.chatContainer.getChatItem(testUserData.users.Jane.userName).click();
        chatSelectors.chatContainer.getMessageInput().type(chatData.textMessage);
        chatSelectors.chatContainer.getSendMessageButton().click();

        chatSelectors.chatContainer.getMessageItem().should('contain.text', chatData.textMessage);
    });

    it('User should be able to receive a message from another user in the chat', () => {
        logout();
        login(testUserData.testUsers.user2.loginLink); 
        headerSelectors.getBurgerMenu().click();
        navigationMenuSelectors.menuItemLinks.getAllUsersItemLink().click();

        allUsersSelectors.allWaysCard.getCardLink(testUserData.testUsers.user1.name).click();
        userPersonalSelectors.getConnectButton().click();
        chatSelectors.getOpenChatButton().click({force: true});
        chatSelectors.chatContainer.getChatItem(testUserData.testUsers.user1.name).click();
        chatSelectors.chatContainer.getMessageInput().type(chatData.textMessage);
        chatSelectors.chatContainer.getSendMessageButton().click();

        chatSelectors.chatContainer.getMessageItem().should('contain.text', chatData.textMessage);

        headerSelectors.getHeader().click({force: true});
        logout();
        login(testUserData.testUsers.user1.loginLink);
        chatSelectors.getOpenChatButton().click({force: true});
        chatSelectors.chatContainer.getChatItem(testUserData.testUsers.user2.name).click();

        chatSelectors.chatContainer.getChatItemName().should('contain.text', testUserData.testUsers.user2.name);
        chatSelectors.chatContainer.getMessageItem().should('contain.text', chatData.textMessage);
    });

});