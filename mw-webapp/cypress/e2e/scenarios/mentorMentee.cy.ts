import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import wayDescriptionData from "cypress/fixtures/wayDescriptionFixture.json";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import userWaysData from "cypress/fixtures/userWaysFixture.json";

beforeEach(() => {
    cy.resetGeneralDb();
});

afterEach(() => {
    cy.clearAllStorage();
});

describe('Mentor-mentee tests', () => {

    it('Scenario_Mentor_AddAsWayMentor', () => {
        cy.login(testUserData.testUsers.studentJonh.loginLink);
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        userWaysSelectors.getCreateNewWayButton().click();
        cy.logout();
        cy.login(testUserData.testUsers.mentorMax.loginLink);
        cy.openAllUsersPage();

        allUsersSelectors.card.getCardLink(testUserData.testUsers.studentJonh.name)
            .contains(testUserData.testUsers.studentJonh.name)
            .click();
        userWaysSelectors.wayCollectionButtonsBlock.getOwnWayCollectionButton().click();
        userWaysSelectors.wayCollectionButtonsBlock.getWayLink(testUserData.testUsers.studentJonh.wayTitle).click();
        wayDescriptionSelectors.peopleBlock.getApplyAsMentorButton().click();

        wayDescriptionSelectors.peopleBlock.getApplyAsMentorButton().should('not.exist');
        wayDescriptionSelectors.peopleBlock.getMentorOfWayText().should('have.text', wayDescriptionData.peopleBlock.mentorshipRequestHeader);
        cy.logout();

        cy.login(testUserData.testUsers.studentJonh.loginLink);
        userWaysSelectors.wayCollectionButtonsBlock.getOwnWayCollectionButton().click();
        userWaysSelectors.wayCollectionButtonsBlock.getWayLink(testUserData.testUsers.studentJonh.wayTitle).click();
        
        wayDescriptionSelectors.mentorRequestDialog.getMentorNameLink().should('have.text', testUserData.testUsers.mentorMax.name);
        
        wayDescriptionSelectors.mentorRequestDialog.getAcceptButton().click();

        wayDescriptionSelectors.peopleBlock.getMentorOfWayText().find('h3').should('have.text', wayDescriptionData.peopleBlock.mentorOfWayText);
        wayDescriptionSelectors.peopleBlock.getWayMentorLink().should('have.text', testUserData.testUsers.mentorMax.name);

        cy.logout();
        navigationMenuSelectors.menuItemLinks.getAllWaysItemLink().click();
        allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
        allWaysSelectors.filterViewBlock.getDayReportsSelectOption0().click();
        allWaysSelectors.allWaysTable.getWayLink(testUserData.testUsers.studentJonh.wayTitle).first().click();
        
        wayDescriptionSelectors.peopleBlock.getMentorOfWayText().find('h3').should('have.text', wayDescriptionData.peopleBlock.mentorOfWayText);
        wayDescriptionSelectors.peopleBlock.getWayMentorLink().should('have.text', testUserData.testUsers.mentorMax.name);

        cy.openAllUsersPage();
        allUsersSelectors.card.getCardLink(testUserData.testUsers.mentorMax.name).click();
        userWaysSelectors.wayCollectionButtonsBlock.getWayAmountCollectionButton().eq(1).should('have.text', userWaysData.collectionButton.mentoring.waysAmount);
        userWaysSelectors.wayCollectionButtonsBlock.getMentoringWayCollectionButton().click();
        allWaysSelectors.allWaysTable.getWayLink(testUserData.testUsers.studentJonh.wayTitle).should('exist').and('be.visible');
    });

});