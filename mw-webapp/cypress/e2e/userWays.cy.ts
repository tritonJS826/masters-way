import userWaysData from "cypress/fixtures/userWaysFixture.json";
import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import {Theme, themedVariables} from "src/globalStore/ThemeStore";
import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import testWayData from "cypress/fixtures/testWayDataFixture.json";
import {LanguageService} from "src/service/LanguageService";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {Navigation} from "cypress/support/Navigation";

afterEach(() => {
    cy.clearAllStorage();
});

function hexToRgb(hex: string): string {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(x => x + x).join('');
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgb(${r}, ${g}, ${b})`;
}

describe("NoAuth User's ways scope tests", () => {
    beforeEach(() => {
        cy.resetGeneralDb();
        cy.visit('/');
        Navigation.openAllUsersPage();
    });

    const expectedCollectionButtonColor = hexToRgb(themedVariables.collectionCardActiveColor[Theme.DARK]);

    it('NoAuth_UserWay_ClickCollectionButton', () => {
        allUsersSelectors.card.getCardLink(userWaysData.users.Alice.userName).click();

        userWaysSelectors.collectionBlock.getOwnWayCollectionButton().click();

        userWaysSelectors.collectionBlock.getWayCollectionButtonMainInfo().first()
            .should('have.css', 'background-color', expectedCollectionButtonColor);
        userWaysSelectors.collectionBlock.getWayAmountCollectionButton().first()
            .should('have.text', userWaysData.users.Alice.ownCollection.waysNumberCollectionButton);
        userWaysSelectors.wayTitles.getWayStatusTitle()
            .should('have.text', `${userWaysData.users.Alice.ownCollection.name} (${userWaysData.users.Alice.ownCollection.publicWaysNumber})`);
        cy.get('[data-cy^="wayLink_"]').should('have.length', userWaysData.users.Alice.ownCollection.publicWaysNumber);
        userWaysSelectors.collectionBlock.getWayLink(userWaysData.users.Alice.ownCollection.publicWaysTitles[1].title)
            .should('exist')
            .and('be.visible');
        userWaysSelectors.collectionBlock.getWayLink(userWaysData.users.Alice.ownCollection.publicWaysTitles[2].title)
            .should('exist')
            .and('be.visible');
       
        userWaysSelectors.collectionBlock.getMentoringWayCollectionButton().click();

        userWaysSelectors.collectionBlock.getWayCollectionButtonMainInfo().eq(1)
            .should('have.css', 'background-color', expectedCollectionButtonColor);
        userWaysSelectors.collectionBlock.getWayAmountCollectionButton().eq(1)
            .should('have.text', userWaysData.users.Alice.mentoringCollection.waysNumberCollectionButton);
        userWaysSelectors.wayTitles.getWayStatusTitle()
            .should('have.text', `${userWaysData.users.Alice.mentoringCollection.name} (${userWaysData.users.Alice.mentoringCollection.publicWaysNumber})`);
        cy.get('[data-cy^="wayLink_"]').should('have.length', userWaysData.users.Alice.mentoringCollection.publicWaysNumber);
        userWaysSelectors.collectionBlock.getWayLink(userWaysData.users.Alice.mentoringCollection.publicWaysTitles[1].title)
            .should('exist')
            .and('be.visible');
    
        userWaysSelectors.collectionBlock.getFavoriteWayCollectionButton().click();

        userWaysSelectors.collectionBlock.getWayCollectionButtonMainInfo().eq(2)
            .should('have.css', 'background-color', expectedCollectionButtonColor);
        userWaysSelectors.collectionBlock.getWayAmountCollectionButton().eq(2)
            .should('have.text', userWaysData.users.Alice.favoriteCollection.waysNumberCollectionButton);
        userWaysSelectors.wayTitles.getWayStatusTitle()
            .should('have.text', `${userWaysData.users.Alice.favoriteCollection.name} (${userWaysData.users.Alice.favoriteCollection.publicWaysNumber})`);
        cy.get('[data-cy^="wayLink_"]').should('have.length', userWaysData.users.Alice.favoriteCollection.publicWaysNumber);
        userWaysSelectors.collectionBlock.getWayLink(userWaysData.users.Alice.favoriteCollection.publicWaysTitles[1].title)
            .should('exist')
            .and('be.visible');
    });

    it('NoAuth_UserWay_CardViewOpenWay', () => {
        allUsersSelectors.card.getCardLink(testUserData.users.Jane.userName).click();
        allWaysSelectors.allWaysCard.getCardLink(testWayData.ways.janeWay.wayName).first().click();

        cy.url().should('include', testWayData.ways.janeWay.wayId);
        wayDescriptionSelectors.wayDashBoardLeft.getTitle().should('have.text', testWayData.ways.janeWay.wayName);
    });

    it('NoAuth_UserWay_TableViewOpenWay', () => {
        allUsersSelectors.card.getCardLink(testUserData.users.Jane.userName).click();
        allWaysSelectors.filterViewBlock.getTableViewButton().click();
        allWaysSelectors.allWaysTable.getWayLink(testWayData.ways.janeWay.wayName).first().click();

        cy.url().should('include', testWayData.ways.janeWay.wayId);
        wayDescriptionSelectors.wayDashBoardLeft.getTitle().should('have.text', testWayData.ways.janeWay.wayName);
    });

});

describe("IsAuth User's ways scope tests", () => {
    beforeEach(() => {
        cy.resetGeneralDb();
        cy.login(testUserData.testUsers.studentJonh.loginLink);
    });

    it('IsAuth_UserWays_CreateNewWay', () => {
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        userWaysSelectors.getCreateNewWayButton().click();

        cy.url().should('match', new RegExp(`\\/way\\/${testUserData.urlPattern}`));
        wayDescriptionSelectors.wayDashBoardLeft.getTitle().should('have.text',`Way of ${testUserData.testUsers.studentJonh.email}`);
    });

    it('IsAuth_UserWays_AddWayToCustomerCollection', () => {
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        userWaysSelectors.collectionBlock.getAddCollectionButton().click();
        userWaysSelectors.getCreateNewWayButton().click();

        wayDescriptionSelectors.wayActionMenu.getWayActionButton().click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubTriggerItem().contains(LanguageService.way.wayActions.collectionManagement.en).click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubMenuItem().contains(`${LanguageService.way.wayActions.addTo.en} ${LanguageService.user.collections.newCollection.en}`).click();
        headerSelectors.getAvatar().click();
        userWaysSelectors.collectionBlock.getCustomerCollectionButton().click();

        userWaysSelectors.collectionBlock
            .getCustomerCollectionButton()
            .within(() => {
                userWaysSelectors.collectionBlock
                .getWayAmountCollectionButton()
                .should('have.text', 'Ways: 1');
            });
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.wayTitle).should('exist');
        userWaysSelectors.wayTitles.getWayStatusTitle().contains(`${LanguageService.user.collections.newCollection.en} (1)`);
    });

});