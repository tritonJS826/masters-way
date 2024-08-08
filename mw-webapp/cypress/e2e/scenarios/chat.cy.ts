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
    cy.visit(testUserData.userLoginLink); 
});

afterEach(() => {
    cy.clearAllStorage();
});

describe('Chat tests', () => {

    it('Send a message to another user in the chat', () => {
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

});