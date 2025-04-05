import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import userWaysData from "cypress/fixtures/userWaysFixture.json";
import userPageContent from "src/dictionary/UserPageContent.json";
import {LanguageService} from "src/service/LanguageService";
import {userWaysAccessIds} from "cypress/accessIds/userWaysAccessIds";
import {Navigation, Page} from "cypress/support/Navigation";
import {WayPage} from "cypress/support/pages/WayPage";
import {AllUsersPage} from "cypress/support/pages/AllUsersPage";
import {UserPage} from "cypress/support/pages/UserPage";

beforeEach(() => {
    cy.resetGeneralDb();
    cy.login(testUserData.testUsers.studentJohn.loginLink); 
});

afterEach(() => {
    cy.clearAllStorage();
});

describe('Collections tests', () => {

    it('Scenario_AnyLoggedinUser_CustomCollections', () => {
        cy.viewport(1200, 900);
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        UserPage.createNewWay();
        WayPage.renameWay(testUserData.testUsers.studentJohn.newWayTitle);
        headerSelectors.getAvatar().click();
        UserPage.createNewWay();
        WayPage.renameWay(testUserData.testUsers.studentJohn.newWayTitleForFavorite);
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

        UserPage.createNewWay();
        WayPage.addWayToCollection(userWaysData.customCollection.newName);
        headerSelectors.getAvatar().click();

        userWaysSelectors.collectionBlock.getCustomerCollectionButton()
            .find((`[data-cy="${userWaysAccessIds.collectionBlock.amountCollectionButton}"]`))
            .should('have.text', `${LanguageService.user.collections.ways.en}: 1`);
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.mentorMax.wayTitle).should('be.visible');
        userWaysSelectors.wayTitles.getWayStatusTitle().contains(`${userWaysData.customCollection.newName} (1)`);

        Navigation.openPage(Page.AllUsers);
        AllUsersPage.openUserPersonalAreaPageByClickingCard(testUserData.testUsers.studentJohn.name);
        UserPage.openWayByClickingCard(testUserData.testUsers.studentJohn.newWayTitle);
        WayPage.addWayToCollection(userWaysData.customCollection.newName);
        headerSelectors.getAvatar().click();

        userWaysSelectors.collectionBlock.getCustomerCollectionButton()
            .find((`[data-cy="${userWaysAccessIds.collectionBlock.amountCollectionButton}"]`))
            .should('have.text', `${LanguageService.user.collections.ways.en}: 2`);
        userWaysSelectors.collectionBlock.getCustomerCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.mentorMax.wayTitle).should('be.visible');
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJohn.newWayTitle).should('be.visible');
        userWaysSelectors.wayTitles.getWayStatusTitle().contains(`${userWaysData.customCollection.newName} (2)`);

        Navigation.openPage(Page.AllUsers);
        AllUsersPage.openUserPersonalAreaPageByClickingCard(testUserData.testUsers.studentJohn.name);
        UserPage.openWayByClickingCard(testUserData.testUsers.studentJohn.newWayTitleForFavorite);
        wayDescriptionSelectors.wayDashBoardLeft.getAddToFavoritesButton().click();
        wayDescriptionSelectors.wayDashBoardLeft.getAddToFavoritesButton().contains(1);
        headerSelectors.getAvatar().click();

        userWaysSelectors.collectionBlock.getFavoriteWayCollectionButton()
            .find((`[data-cy="${userWaysAccessIds.collectionBlock.amountCollectionButton}"]`))
            .should('have.text', `${LanguageService.user.collections.ways.en}: 1`);
        userWaysSelectors.collectionBlock.getFavoriteWayCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJohn.newWayTitleForFavorite).should('be.visible');

        userWaysSelectors.collectionBlock.getCustomerCollectionButton().click();
        UserPage.openWayByClickingCard(testUserData.testUsers.mentorMax.wayTitle);
        WayPage.deleteWayFromCollection(userWaysData.customCollection.newName);
        headerSelectors.getAvatar().click();

        userWaysSelectors.collectionBlock.getCustomerCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.mentorMax.wayTitle).should('not.exist');
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJohn.newWayTitle).should('be.visible');
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