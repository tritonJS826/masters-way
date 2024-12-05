import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import userWaysData from "cypress/fixtures/userWaysFixture.json";
import userPageContent from "src/dictionary/UserPageContent.json";
import {LanguageService} from "src/service/LanguageService";
import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";

beforeEach(() => {
    cy.resetGeneralDb();
    cy.login(testUserData.testUsers.studentJonh.loginLink); 
});

afterEach(() => {
    cy.clearAllStorage();
});

describe('Collections tests', () => {

    it('Scenario_AnyLoggedinUser_CustomCollections', () => {
        cy.viewport(1200, 900);
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        userWaysSelectors.getCreateNewWayButton().click();
        wayDescriptionSelectors.wayDashBoardLeft.getTitle()
            .dblclick()
            .type('{selectall}')
            .type(testUserData.testUsers.studentJonh.newWayTitle + '{enter}');
        headerSelectors.getAvatar().click();
        userWaysSelectors.getCreateNewWayButton().click();
        wayDescriptionSelectors.wayDashBoardLeft.getTitle()
            .dblclick()
            .type('{selectall}')
            .type(testUserData.testUsers.studentJonh.newWayTitleForFavorite + '{enter}');
        cy.logout();
        cy.login(testUserData.testUsers.mentorMax.loginLink);

        userWaysSelectors.collectionBlock.getAddCollectionButton().click();

        userWaysSelectors.collectionBlock.getCustomerCollectionButton()
            .within(() => {
                userWaysSelectors.collectionBlock.getWayAmountCollectionButton()
                    .should('have.text', userWaysData.collectionButton.custom.waysAmount0);
            });
        userWaysSelectors.collectionBlock.customCollection.getCustomCollectionBlock()
            .within(() => {
                userWaysSelectors.collectionBlock.getWayCollectionButtonMainInfo()
                    .should('have.text', userPageContent.collections.newCollection.en);
            });
        
        userWaysSelectors.collectionBlock.customCollection.getActionMenuButton().click();
        userWaysSelectors.collectionBlock.customCollection.getAtcionMenuItem()
            .contains(userPageContent.collections.renameCollection.en)
            .click();
        userWaysSelectors.collectionBlock.customCollection.renameDialog.getInput()
            .type('{selectall}')
            .type(userWaysData.collectionButton.custom.newName);
        userWaysSelectors.collectionBlock.customCollection.renameDialog.getOkButton().click();
        
        userWaysSelectors.collectionBlock.customCollection.getCustomCollectionBlock()
            .within(() => {
                userWaysSelectors.collectionBlock.getWayCollectionButtonMainInfo()
                    .should('have.text', userWaysData.collectionButton.custom.newName);
            });

        userWaysSelectors.getCreateNewWayButton().click();
        wayDescriptionSelectors.wayActionMenu.getWayActionButton().click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubTriggerItem().contains(LanguageService.way.wayActions.collectionManagement.en).click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubMenuItem().contains(`${LanguageService.way.wayActions.addTo.en} ${userWaysData.collectionButton.custom.newName}`).click();
        headerSelectors.getAvatar().click();

        userWaysSelectors.collectionBlock.getCustomerCollectionButton()
            .within(() => {
                userWaysSelectors.collectionBlock.getWayAmountCollectionButton()
                    .should('have.text', userWaysData.collectionButton.custom.waysAmount1);
            });
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.mentorMax.wayTitle).should('be.visible');
        userWaysSelectors.wayTitles.getWayStatusTitle().contains(userWaysData.collectionButton.custom.newName + ' (1)');

        cy.openAllUsersPage();
        allUsersSelectors.card.getCardLink(testUserData.testUsers.studentJonh.name)
            .contains(testUserData.testUsers.studentJonh.name)
            .click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.newWayTitle).click();
        wayDescriptionSelectors.wayActionMenu.getWayActionButton().click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubTriggerItem().contains(LanguageService.way.wayActions.collectionManagement.en).click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubMenuItem().contains(`${LanguageService.way.wayActions.addTo.en} ${userWaysData.collectionButton.custom.newName}`).click();
        headerSelectors.getAvatar().click();

        userWaysSelectors.collectionBlock.getCustomerCollectionButton()
            .within(() => {
                userWaysSelectors.collectionBlock.getWayAmountCollectionButton()
                    .should('have.text', userWaysData.collectionButton.custom.waysAmount2);
            });
        userWaysSelectors.collectionBlock.getCustomerCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.mentorMax.wayTitle).should('be.visible');
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.newWayTitle).should('be.visible');
        userWaysSelectors.wayTitles.getWayStatusTitle().contains(userWaysData.collectionButton.custom.newName + ' (2)');

        cy.openAllUsersPage();
        allUsersSelectors.card.getCardLink(testUserData.testUsers.studentJonh.name)
            .contains(testUserData.testUsers.studentJonh.name)
            .click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.newWayTitleForFavorite).click();
        wayDescriptionSelectors.wayDashBoardLeft.getAddToFavorites().click();
        wayDescriptionSelectors.wayDashBoardLeft.getAddToFavorites().contains(1);
        headerSelectors.getAvatar().click();

        userWaysSelectors.collectionBlock.getFavoriteWayCollectionButton()
            .within(() => {
                userWaysSelectors.collectionBlock.getWayAmountCollectionButton()
                    .should('have.text', userWaysData.collectionButton.mentoring.waysAmount1);
            });
        userWaysSelectors.collectionBlock.getFavoriteWayCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.newWayTitleForFavorite).should('be.visible');

        userWaysSelectors.collectionBlock.getCustomerCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.mentorMax.wayTitle).click();
        wayDescriptionSelectors.wayActionMenu.getWayActionButton().click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubTriggerItem().contains(LanguageService.way.wayActions.collectionManagement.en).click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubMenuItem().contains(`${LanguageService.way.wayActions.deleteFrom.en} ${userWaysData.collectionButton.custom.newName}`).click();
        headerSelectors.getAvatar().click();

        userWaysSelectors.collectionBlock.getCustomerCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.mentorMax.wayTitle).should('not.exist');
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.newWayTitle).should('be.visible');        
        
        userWaysSelectors.collectionBlock.customCollection.getActionMenuButton().click();
        userWaysSelectors.collectionBlock.customCollection.getAtcionMenuItem()
            .contains(userPageContent.collections.deleteCollection.en)
            .click();
        userWaysSelectors.collectionBlock.customCollection.deleteDialog.getContent().contains(`${LanguageService.user.collections.deleteCollectionModalQuestion.en} "${userWaysData.collectionButton.custom.newName}" ?`);
        userWaysSelectors.collectionBlock.customCollection.deleteDialog.getDeleteButton().click();

        userWaysSelectors.collectionBlock.getCustomerCollectionButton().should('not.exist');
    });
});