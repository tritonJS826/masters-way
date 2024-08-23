import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import wayDescriptionData from "cypress/fixtures/wayDescriptionFixture.json";

beforeEach(() => {
    cy.resetDb();
});

afterEach(() => {
    cy.clearAllStorage();
});

describe('IsAuth Composite ways scope tests', () => {

    it('IsAuth_CompositeWay_Creation', () => {
        cy.login(testUserData.testUsers.studentJonh.loginLink);
        userWaysSelectors.getCreateNewWayButton().click();
        cy.logout();
        cy.login(testUserData.testUsers.mentorMax.loginLink);
        userWaysSelectors.getCreateNewWayButton().click();

        cy.openAllWaysPage();
        allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
        allWaysSelectors.filterViewBlock.getDayReportsSelectOption0().click();
        allWaysSelectors.allWaysCard.getCardLink(testUserData.users.Dana.way.wayTitle).first().click();
        wayDescriptionSelectors.wayActionMenu.getWayActionButton().click();
        wayDescriptionSelectors.wayActionMenu.getWayActionMenuItem()
            .contains(`Add to composite way ${testUserData.testUsers.mentorMax.wayTitle}`)
            .click();
        cy.openAllWaysPage();
        allWaysSelectors.allWaysCard.getCardLink(testUserData.testUsers.studentJonh.wayTitle).first().click();
        wayDescriptionSelectors.wayActionMenu.getWayActionButton().click({force: true});
        wayDescriptionSelectors.wayActionMenu.getWayActionMenuItem()
            .contains(`Add to composite way ${testUserData.testUsers.mentorMax.wayTitle}`)
            .click();
        cy.openAllWaysPage();
        allWaysSelectors.allWaysCard.getCardLink(testUserData.testUsers.mentorMax.wayTitle).first().click();

        wayDescriptionSelectors.peopleBlock.childWaysTitle().should('have.text', wayDescriptionData.peopleBlock.childWaysTitle);
        wayDescriptionSelectors.peopleBlock.getChildLink(testUserData.users.Dana.way.wayTitle)
            .should('be.visible')
            .should('have.text', testUserData.users.Dana.way.wayTitle);
        wayDescriptionSelectors.peopleBlock.getChildLink(testUserData.users.Dana.userName)
            .should('be.visible')
            .should('have.text', testUserData.users.Dana.userName);
        wayDescriptionSelectors.peopleBlock.getChildLink(testUserData.testUsers.studentJonh.wayTitle)
            .should('be.visible')
            .should('have.text', testUserData.testUsers.studentJonh.wayTitle);
        wayDescriptionSelectors.peopleBlock.getChildLink(testUserData.testUsers.studentJonh.name)
            .should('be.visible')
            .should('have.text', testUserData.testUsers.studentJonh.name);

    });

});