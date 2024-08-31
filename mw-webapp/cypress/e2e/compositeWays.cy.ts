import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import wayDescriptionData from "cypress/fixtures/wayDescriptionFixture.json";
import {dayReportsSelectors} from "cypress/scopesSelectors/dayReportsSelectors";

beforeEach(() => {
    cy.resetDb();
});

afterEach(() => {
    cy.clearAllStorage();
});

describe('IsAuth Composite ways scope tests', () => {

    it('IsAuth_CompositeWay_Creation', () => {
        const danaEvansNameForReports = testUserData.users.Dana.userName.split(" ")[0];

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
        wayDescriptionSelectors.wayActionMenu.getWayActionSubTriggerItem()
            .contains(`Composite way management`)
            .click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubMenuItem()
            .contains(`Add to composite way ${testUserData.testUsers.mentorMax.wayTitle}`)
            .click();
        cy.openAllWaysPage();
        allWaysSelectors.allWaysCard.getCardLink(testUserData.testUsers.studentJonh.wayTitle).first().click();
        wayDescriptionSelectors.wayActionMenu.getWayActionButton().click({ force: true });
        wayDescriptionSelectors.wayActionMenu.getWayActionSubTriggerItem()
            .contains(`Composite way management`)
            .click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubMenuItem()
            .contains(`Add to composite way ${testUserData.testUsers.mentorMax.wayTitle}`)
            .click();
        cy.logout();

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

        dayReportsSelectors.dayReportsContent.getReportDate().should('have.length', testUserData.users.Dana.way.reportTotalAmount);
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().should('have.length', testUserData.users.Dana.way.reportTotalAmount);
        dayReportsSelectors.dayReportsContent.getReportDate().first().should('have.text', testUserData.users.Dana.way.reportDate2);
        dayReportsSelectors.dayReportsContent.jobDone.getReporterName().first().should('have.text', danaEvansNameForReports);
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().first().should('have.text', testUserData.users.Dana.way.jobDescription2);
        dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJob().first().should('have.text', testUserData.users.Dana.way.timeSpentOnJob2);
        dayReportsSelectors.dayReportsContent.getReportDate().eq(1).should('have.text', testUserData.users.Dana.way.reportDate1);
        dayReportsSelectors.dayReportsContent.jobDone.getReporterName().eq(1).should('have.text', danaEvansNameForReports);
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().eq(1).should('have.text', testUserData.users.Dana.way.jobDescription1);
        dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJob().eq(1).should('have.text', testUserData.users.Dana.way.timeSpentOnJob1);
    });

    it('IsAuth_CompositeWay_DeleteWay', () => {
        const danaEvansNameForReports = testUserData.users.Dana.userName.split(" ")[0];

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
      wayDescriptionSelectors.wayActionMenu.getWayActionSubTriggerItem()
            .contains(`Composite way management`)
            .click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubMenuItem()
            .contains(`Add to composite way ${testUserData.testUsers.mentorMax.wayTitle}`)
            .click();
        cy.openAllWaysPage();
        allWaysSelectors.allWaysCard.getCardLink(testUserData.testUsers.studentJonh.wayTitle).first().click();
      wayDescriptionSelectors.wayActionMenu.getWayActionButton().click({ force: true });
      wayDescriptionSelectors.wayActionMenu.getWayActionSubTriggerItem()
            .contains(`Composite way management`)
            .click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubMenuItem()
            .contains(`Add to composite way ${testUserData.testUsers.mentorMax.wayTitle}`)
            .click();

        cy.openAllWaysPage();
        allWaysSelectors.allWaysCard.getCardLink(testUserData.testUsers.mentorMax.wayTitle).first().click();
        wayDescriptionSelectors.peopleBlock.getDeleteFromCompositeWay(testUserData.testUsers.studentJonh.wayTitle).click();
        wayDescriptionSelectors.peopleBlock.dialogContent.getDeleteButton().click();
        wayDescriptionSelectors.peopleBlock.getDeleteFromCompositeWay(testUserData.users.Dana.way.wayTitle).click();
        wayDescriptionSelectors.peopleBlock.dialogContent.getDeleteButton().click();

        wayDescriptionSelectors.peopleBlock.childWaysTitle().should('not.exist');
        wayDescriptionSelectors.peopleBlock.getChildLink(testUserData.users.Dana.userName).should('not.exist');
        wayDescriptionSelectors.peopleBlock.getChildLink(testUserData.testUsers.studentJonh.wayTitle).should('not.exist');
        dayReportsSelectors.dayReportsContent.getReportDate().should('not.exist');
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().should('not.exist');
    });

});