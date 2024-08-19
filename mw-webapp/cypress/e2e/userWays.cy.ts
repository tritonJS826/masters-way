import userWaysData from "cypress/fixtures/userWaysFixture.json";
import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import {Theme, themedVariables} from "src/globalStore/ThemeStore";
import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";

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
        cy.resetDb();
        cy.visit('/');
        cy.openAllUsersPage();
    });

    const expectedCollectionButtonColor = hexToRgb(themedVariables.primaryBgBtnActiveColor[Theme.DARK]);

    it('NoAuth_UserWay_OwnWaysCollectionButton', () => {
        allUsersSelectors.card.getCardLink(userWaysData.users.Alice.userName).click();

        userWaysSelectors.wayCollectionButtonsBlock.getOwnWayCollectionButton().click();

        userWaysSelectors.wayCollectionButtonsBlock.getWayCollectionButtonMainInfo().first()
            .should('have.css', 'background-color', expectedCollectionButtonColor);
        userWaysSelectors.wayCollectionButtonsBlock.getWayAmountCollectionButton().first()
            .should('have.text', userWaysData.users.Alice.ownWaysNumberCollectionButton);
        userWaysSelectors.wayTitles.getWayStatusTitle()
            .should('have.text', `Own (${userWaysData.users.Alice.ownPublicWaysNumber})`);
        cy.get('[data-cy^="wayLink_"]').should('have.length', userWaysData.users.Alice.ownPublicWaysNumber);
        userWaysSelectors.wayCollectionButtonsBlock.getWayLink(userWaysData.users.Alice.ownPublicWaysTitles[1].title)
            .should('exist')
            .and('be.visible');
        userWaysSelectors.wayCollectionButtonsBlock.getWayLink(userWaysData.users.Alice.ownPublicWaysTitles[2].title)
            .should('exist')
            .and('be.visible');
    });

    it('NoAuth_UserWay_MentoringCollectionButton', () => {
        allUsersSelectors.card.getCardLink(userWaysData.users.Alice.userName).click();

        userWaysSelectors.wayCollectionButtonsBlock.getMentoringWayCollectionButton().click();

        userWaysSelectors.wayCollectionButtonsBlock.getWayCollectionButtonMainInfo().eq(1)
            .should('have.css', 'background-color', expectedCollectionButtonColor);
        userWaysSelectors.wayCollectionButtonsBlock.getWayAmountCollectionButton().eq(1)
            .should('have.text', userWaysData.users.Alice.mentoringWaysNumberCollectionButton);
        userWaysSelectors.wayTitles.getWayStatusTitle()
            .should('have.text', `Mentoring (${userWaysData.users.Alice.mentoringWaysNumber})`);
        cy.get('[data-cy^="wayLink_"]').should('have.length', userWaysData.users.Alice.mentoringWaysNumber);
        userWaysSelectors.wayCollectionButtonsBlock.getWayLink(userWaysData.users.Alice.mentoringWaysTitles[1].title)
            .should('exist')
            .and('be.visible');
    });

});

describe("IsAuth User's ways scope tests", () => {
    beforeEach(() => {
        cy.resetDb();
        cy.login(testUserData.testUsers.studentJonh.loginLink);
    });

    it('IsAuth_UserWays_CreateNewWay', () => {
        userWaysSelectors.getCreateNewWayButton().click();

        cy.url().should('match', new RegExp(`\\/way\\/${testUserData.urlPattern}`));
        wayDescriptionSelectors.wayDashBoardLeft.getTitle().should('have.text',`Way of ${testUserData.testUsers.studentJonh.email}`);
    });

});