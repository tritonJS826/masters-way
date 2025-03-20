import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {chatSelectors} from "cypress/scopesSelectors/chatSelectors";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import chatData from "cypress/fixtures/chatFixture.json"
import {Navigation} from "cypress/support/Navigation";

beforeEach(() => {
    cy.resetGeneralDb();
    cy.login(testUserData.testUsers.mentorMax.loginLink); 
});

afterEach(() => {
    cy.clearAllStorage();
});

describe('Chat tests', () => {

    it('Scenario_AnyLoggedinUser_SendMessageInChat', () => {
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        Navigation
            .openAllUsersPage()
            .openUserPersonalAreaPageByClickingCard(testUserData.users.Jane.userName);

        userPersonalSelectors.getConnectButton().click();
        chatSelectors.getOpenChatButton().click({force: true});
        chatSelectors.chatContainer.getListChatItem(testUserData.users.Jane.userName).click();
        chatSelectors.chatContainer.getMessageInput().type(chatData.textMessage);
        chatSelectors.chatContainer.getSendMessageButton().click();

        chatSelectors.chatContainer.getMessageItem().should('contain.text', chatData.textMessage);
    });

    it('Scenario_AnyLoggedinUser_ReciveMessageInChat', () => {
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        cy.logout();
        cy.login(testUserData.testUsers.studentJonh.loginLink); 
        Navigation
            .openAllUsersPage()
            .openUserPersonalAreaPageByClickingCard(testUserData.testUsers.mentorMax.name);

        userPersonalSelectors.getConnectButton().click();
        chatSelectors.getOpenChatButton().click({force: true});
        chatSelectors.chatContainer.getListChatItem(testUserData.testUsers.mentorMax.name).click();
        chatSelectors.chatContainer.getMessageInput().type(chatData.textMessage);
        chatSelectors.chatContainer.getSendMessageButton().click();

        chatSelectors.chatContainer.getMessageItem().should('contain.text', chatData.textMessage);

        headerSelectors.getHeader().click({force: true});
        cy.logout();
        cy.login(testUserData.testUsers.mentorMax.loginLink);

        chatSelectors.getmessagesAmount().should('contain.text', '1');

        chatSelectors.getOpenChatButton().click({force: true});
        chatSelectors.chatContainer.getListChatItem(testUserData.testUsers.studentJonh.name).click();

        chatSelectors.chatContainer.getChatItemName().should('contain.text', testUserData.testUsers.studentJonh.name);
        chatSelectors.chatContainer.getMessageItem().should('contain.text', chatData.textMessage);
    });

});