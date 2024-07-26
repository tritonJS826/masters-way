import userWaysData from "cypress/fixtures/userWaysFixture.json";
import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import {Theme, themedVariables, themeStore} from "src/globalStore/ThemeStore";

const apiUrl = Cypress.env('API_BASE_PATH');

beforeEach(() => {
    cy.request('GET', `${apiUrl}/dev/reset-db`);
    cy.visit('/');
    headerSelectors.getBurgerMenu().click();
    navigationMenuSelectors.menuItemLinks.getAllUsersItemLink().click();
});

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
    const expectedCollectionButtonColor = hexToRgb(themedVariables.primaryBgBtnActiveColor[Theme.DARK]);

    it('NoAuth_UserWay_OwnWaysCollectionButton', () => {
        allUsersSelectors.allWaysCard.getCardLink(userWaysData.users.Alice.userName).click();

        userWaysSelectors.wayCard.getOwnWayCollectionCardButton().click();

        userWaysSelectors.wayCard.getOwnWayCollectionCardButtonMainInfo().first()
            .should('have.css', 'background-color', expectedCollectionButtonColor);
        userWaysSelectors.wayCard.getWayAmountCollectionCardButton().first()
            .should('have.text', userWaysData.users.Alice.ownWaysNumberCollectionButton);
        userWaysSelectors.wayTitles.getWayStatusTitle()
            .should('have.text', `Own (${userWaysData.users.Alice.ownPublicWaysNumber})`);
        cy.get('[data-cy^="wayLink_"]').should('have.length', userWaysData.users.Alice.ownPublicWaysNumber);
        userWaysSelectors.wayCard.getWayLink(userWaysData.users.Alice.ownPublicWaysTitles[1].title)
            .should('exist')
            .and('be.visible');
        userWaysSelectors.wayCard.getWayLink(userWaysData.users.Alice.ownPublicWaysTitles[2].title)
            .should('exist')
            .and('be.visible');
    });

    it('NoAuth_UserWay_MentoringCollectionButton', () => {
        allUsersSelectors.allWaysCard.getCardLink(userWaysData.users.Alice.userName).click();

        userWaysSelectors.wayCard.getMentoringWayCollectionCardButton().click();

        userWaysSelectors.wayCard.getOwnWayCollectionCardButtonMainInfo().eq(1)
            .should('have.css', 'background-color', expectedCollectionButtonColor);
        userWaysSelectors.wayCard.getWayAmountCollectionCardButton().eq(1)
            .should('have.text', userWaysData.users.Alice.mentoringWaysNumberCollectionButton);
        userWaysSelectors.wayTitles.getWayStatusTitle()
            .should('have.text', `Mentoring (${userWaysData.users.Alice.mentoringWaysNumber})`);
        cy.get('[data-cy^="wayLink_"]').should('have.length', userWaysData.users.Alice.mentoringWaysNumber);
        userWaysSelectors.wayCard.getWayLink(userWaysData.users.Alice.mentoringWaysTitles[1].title)
            .should('exist')
            .and('be.visible');
    });

});