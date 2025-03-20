import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import userWaysData from "cypress/fixtures/userWaysFixture.json";
import userPageContent from "src/dictionary/UserPageContent.json";
import {LanguageService} from "src/service/LanguageService";
import {userWaysAccessIds} from "cypress/accessIds/userWaysAccessIds";
import {Navigation} from "cypress/support/Navigation";
import {WayPage} from "cypress/support/pages/WayPage";

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
            .find(`[data-cy="${userWaysAccessIds.collectionBlock.amountCollectionButton}"]`)
            .should('have.text', `${LanguageService.user.collections.ways.en}: 0`);
        userWaysSelectors.collectionBlock.customCollection.getCustomCollectionBlock()
            .find(`[data-cy="${userWaysAccessIds.collectionBlock.collectionButtonMainInfo}"]`)
            .should('have.text', userPageContent.collections.newCollection.en);
        
        userWaysSelectors.collectionBlock.customCollection.getActionMenuButton().click();
        userWaysSelectors.collectionBlock.customCollection.getAtcionMenuItem()
            .contains(userPageContent.collections.renameCollection.en)
            .click();
        userWaysSelectors.collectionBlock.customCollection.renameDialog.getInput()
            .type('{selectall}')
            .type(userWaysData.customCollection.newName);
        userWaysSelectors.collectionBlock.customCollection.renameDialog.getOkButton().click();
        
        userWaysSelectors.collectionBlock.customCollection.getCustomCollectionBlock()
            .find(`[data-cy="${userWaysAccessIds.collectionBlock.collectionButtonMainInfo}"]`)
            .should('have.text', userWaysData.customCollection.newName);

        userWaysSelectors.getCreateNewWayButton().click();
        WayPage.addWayToCollection(userWaysData.customCollection.newName);
        headerSelectors.getAvatar().click();

        userWaysSelectors.collectionBlock.getCustomerCollectionButton()
            .find((`[data-cy="${userWaysAccessIds.collectionBlock.amountCollectionButton}"]`))
            .should('have.text', `${LanguageService.user.collections.ways.en}: 1`);
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.mentorMax.wayTitle).should('be.visible');
        userWaysSelectors.wayTitles.getWayStatusTitle().contains(`${userWaysData.customCollection.newName} (1)`);

        Navigation
            .openAllUsersPage()
            .openUserPersonalAreaPageByClickingCard(testUserData.testUsers.studentJonh.name);
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.newWayTitle).click();
        WayPage.addWayToCollection(userWaysData.customCollection.newName);
        headerSelectors.getAvatar().click();

        userWaysSelectors.collectionBlock.getCustomerCollectionButton()
            .find((`[data-cy="${userWaysAccessIds.collectionBlock.amountCollectionButton}"]`))
            .should('have.text', `${LanguageService.user.collections.ways.en}: 2`);
        userWaysSelectors.collectionBlock.getCustomerCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.mentorMax.wayTitle).should('be.visible');
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.newWayTitle).should('be.visible');
        userWaysSelectors.wayTitles.getWayStatusTitle().contains(`${userWaysData.customCollection.newName} (2)`);

        Navigation
            .openAllUsersPage()
            .openUserPersonalAreaPageByClickingCard(testUserData.testUsers.studentJonh.name);
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.newWayTitleForFavorite).click();
        wayDescriptionSelectors.wayDashBoardLeft.getAddToFavoritesButton().click();
        wayDescriptionSelectors.wayDashBoardLeft.getAddToFavoritesButton().contains(1);
        headerSelectors.getAvatar().click();

        userWaysSelectors.collectionBlock.getFavoriteWayCollectionButton()
            .find((`[data-cy="${userWaysAccessIds.collectionBlock.amountCollectionButton}"]`))
            .should('have.text', `${LanguageService.user.collections.ways.en}: 1`);
        userWaysSelectors.collectionBlock.getFavoriteWayCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.newWayTitleForFavorite).should('be.visible');

        userWaysSelectors.collectionBlock.getCustomerCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.mentorMax.wayTitle).click();
        WayPage.deleteWayFromCollection(userWaysData.customCollection.newName);
        headerSelectors.getAvatar().click();

        userWaysSelectors.collectionBlock.getCustomerCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.mentorMax.wayTitle).should('not.exist');
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.newWayTitle).should('be.visible');
        userWaysSelectors.wayTitles.getWayStatusTitle().contains(`${userWaysData.customCollection.newName} (1)`);
        userWaysSelectors.collectionBlock.getCustomerCollectionButton()
            .find((`[data-cy="${userWaysAccessIds.collectionBlock.amountCollectionButton}"]`))
            .should('have.text', `${LanguageService.user.collections.ways.en}: 1`);    
        
        userWaysSelectors.collectionBlock.customCollection.getActionMenuButton().click();
        userWaysSelectors.collectionBlock.customCollection.getAtcionMenuItem()
            .contains(userPageContent.collections.deleteCollection.en)
            .click();
        userWaysSelectors.collectionBlock.customCollection.deleteDialog.getContent().contains(`${LanguageService.user.collections.deleteCollectionModalQuestion.en} "${userWaysData.customCollection.newName}" ?`);
        userWaysSelectors.collectionBlock.customCollection.deleteDialog.getDeleteButton().click();

        userWaysSelectors.collectionBlock.getCustomerCollectionButton().should('not.exist');
    });
});