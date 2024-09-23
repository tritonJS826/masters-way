import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";
import {chatSelectors} from "cypress/scopesSelectors/scenariosSelectors/chatSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import chatData from "cypress/fixtures/scenariosFixtures/chatFixture.json"

beforeEach(() => {
    cy.resetDb();
    cy.login(testUserData.testUsers.mentorMax.loginLink); 
});

afterEach(() => {
    cy.clearAllStorage();
});

describe('Chat tests', () => {

  it('Scenario_AnyLoggedinUser_SendMessageInChat', () => {
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        cy.openAllUsersPage();

        allUsersSelectors.card.getCardLink(testUserData.users.Jane.userName).click();
        userPersonalSelectors.getConnectButton().click();
        chatSelectors.getOpenChatButton().click({force: true});
        chatSelectors.chatContainer.getChatItem(testUserData.users.Jane.userName).click();
        chatSelectors.chatContainer.getMessageInput().type(chatData.textMessage);
        chatSelectors.chatContainer.getSendMessageButton().click();

        chatSelectors.chatContainer.getMessageItem().should('contain.text', chatData.textMessage);
    });

    it('Scenario_AnyLoggedinUser_ReciveMessageInChat', () => {
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        cy.logout();
        cy.login(testUserData.testUsers.studentJonh.loginLink); 
        cy.openAllUsersPage();

        allUsersSelectors.card.getCardLink(testUserData.testUsers.mentorMax.name).click();
        userPersonalSelectors.getConnectButton().click();
        chatSelectors.getOpenChatButton().click({force: true});
        chatSelectors.chatContainer.getChatItem(testUserData.testUsers.mentorMax.name).click();
        chatSelectors.chatContainer.getMessageInput().type(chatData.textMessage);
        chatSelectors.chatContainer.getSendMessageButton().click();

        chatSelectors.chatContainer.getMessageItem().should('contain.text', chatData.textMessage);

        headerSelectors.getHeader().click({force: true});
        cy.logout();
        cy.login(testUserData.testUsers.mentorMax.loginLink);

        chatSelectors.getmessagesAmount().should('contain.text', '1');

        chatSelectors.getOpenChatButton().click({force: true});
        chatSelectors.chatContainer.getChatItem(testUserData.testUsers.studentJonh.name).click();

        chatSelectors.chatContainer.getChatItemName().should('contain.text', testUserData.testUsers.studentJonh.name);
        chatSelectors.chatContainer.getMessageItem().should('contain.text', chatData.textMessage);
    });

});