import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import wayDescriptionData from "cypress/fixtures/wayDescriptionFixture.json";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import {LanguageService} from "src/service/LanguageService";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {wayMetricsSelectors} from "cypress/scopesSelectors/wayMetricsSelectors";
import wayMetricsData from "cypress/fixtures/wayMetricsFixture.json"
import {dayReportsSelectors} from "cypress/scopesSelectors/dayReportsSelectors";
import dayReportsData from "cypress/fixtures/dayReportsFixture.json";
import wayPageContent from "src/dictionary/WayPageContent.json";
import {userWaysAccessIds} from "cypress/accessIds/userWaysAccessIds";
import {Symbols} from "src/utils/Symbols";
import {AllWaysPage, MinDayReports} from "cypress/support/pages/AllWaysPage";
import {WayPage, JobDoneOrPlanLabelTarget} from "cypress/support/pages/WayPage";
import {Navigation, Page} from "cypress/support/Navigation";
import {AllUsersPage} from "cypress/support/pages/AllUsersPage";
import {UserPage} from "cypress/support/pages/UserPage";

beforeEach(() => {
    cy.resetGeneralDb();
});

afterEach(() => {
    cy.clearAllStorage();
});

describe('Mentor-mentee tests', () => {

    it('Scenario_Mentor_AddAsWayMentor', () => {
        cy.login(testUserData.testUsers.studentJohn.loginLink);
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        UserPage.createNewWay();
        cy.logout();
        cy.login(testUserData.testUsers.mentorMax.loginLink);
        Navigation.openPage(Page.AllUsers);
        AllUsersPage.openUserPersonalAreaPageByClickingCard(testUserData.testUsers.studentJohn.name);
        userWaysSelectors.collectionBlock.getOwnWayCollectionButton().click();
        UserPage.openWayByClickingCard(testUserData.testUsers.studentJohn.wayTitle);
        wayDescriptionSelectors.peopleBlock.getApplyAsMentorButton().click();

        wayDescriptionSelectors.peopleBlock.getApplyAsMentorButton().should('not.exist');
        wayDescriptionSelectors.peopleBlock.getMentorsOfWayText().should('have.text', wayDescriptionData.peopleBlock.mentorshipRequestHeader);
        cy.logout();

        cy.login(testUserData.testUsers.studentJohn.loginLink);
        userWaysSelectors.collectionBlock.getOwnWayCollectionButton().click();
        UserPage.openWayByClickingCard(testUserData.testUsers.studentJohn.wayTitle);
        
        wayDescriptionSelectors.mentorRequestDialog.getMentorNameLink().should('have.text', testUserData.testUsers.mentorMax.name);
        
        wayDescriptionSelectors.mentorRequestDialog.getAcceptButton().click();

        wayDescriptionSelectors.peopleBlock.getMentorsOfWayText().find('h3').should('have.text', wayDescriptionData.peopleBlock.mentorOfWayText);
        wayDescriptionSelectors.peopleBlock.getWayMentorLink().should('have.text', testUserData.testUsers.mentorMax.name);

        cy.logout();
        navigationMenuSelectors.menuItemLinks.getAllWaysItemLink().click();
        AllWaysPage
            .adjustWayFilterMinDayReports(MinDayReports.any)
            .openWayByClickingCard(testUserData.testUsers.studentJohn.wayTitle);
        
        wayDescriptionSelectors.peopleBlock.getMentorsOfWayText().find('h3').should('have.text', wayDescriptionData.peopleBlock.mentorOfWayText);
        wayDescriptionSelectors.peopleBlock.getWayMentorLink().should('have.text', testUserData.testUsers.mentorMax.name);

        Navigation.openPage(Page.AllUsers);
        AllUsersPage.openUserPersonalAreaPageByClickingCard(testUserData.testUsers.mentorMax.name);
        userWaysSelectors.collectionBlock.getWayAmountCollectionButton().eq(1).should('have.text', `${LanguageService.user.collections.ways.en}: 1`);
        userWaysSelectors.collectionBlock.getMentoringWayCollectionButton().click();
        allWaysSelectors.allWaysTable.getWayLink(testUserData.testUsers.studentJohn.wayTitle).should('exist').and('be.visible');
    });

    it('Scenario_MentorStudent_WayMentoring', () => {
        const mentorTimeSpentOnJob = '20';
        const mentorEstimatedPlanTime = '14';

        cy.login(testUserData.testUsers.studentJohn.loginLink);
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        UserPage.createNewWay();
        WayPage.editGoal(testUserData.testUsers.studentJohn.goal);
        wayMetricsSelectors.metricButtons.getAddNewGoalMetricButton().click();
        wayMetricsSelectors.getMetricDescription().dblclick();
        wayMetricsSelectors.getMetricDescriptionInput().type(wayMetricsData.wayMetricDescriptions[0]);
        headerSelectors.getHeader().click();
        WayPage
            .createNewDayReport()
            .addDayReportData({
                reportIndex:0,
                jobDoneDescription: dayReportsData.jobDoneDescription,
                timeSpentOnJob: dayReportsData.timeSpentOnJob,
                planDescription: dayReportsData.planDescription,
                estimatedPlanTime: dayReportsData.estimatedPlanTime,
                problemDescription: dayReportsData.problemDescription,
                commentDescription: dayReportsData.commentDescription
            })
            .adjustLabel(dayReportsData.labels.student)
            .addLabel({
                labelName: dayReportsData.labels.student,
                labelTarget: JobDoneOrPlanLabelTarget.jobDone,
                numberOfJobDoneOrPlan: 0
            })
            .addLabel({
                labelName: dayReportsData.labels.student,
                labelTarget: JobDoneOrPlanLabelTarget.plan,
                numberOfJobDoneOrPlan: 0
            });
        cy.logout();

        cy.login(testUserData.testUsers.mentorMax.loginLink);
        Navigation.openPage(Page.AllUsers);
        AllUsersPage.openUserPersonalAreaPageByClickingCard(testUserData.testUsers.studentJohn.name);
        userWaysSelectors.collectionBlock.getOwnWayCollectionButton().click();
        UserPage.openWayByClickingCard(testUserData.testUsers.studentJohn.wayTitle);
        wayDescriptionSelectors.peopleBlock.getApplyAsMentorButton().click();
        cy.logout();
        cy.login(testUserData.testUsers.studentJohn.loginLink);
        userWaysSelectors.collectionBlock.getOwnWayCollectionButton().click();
        UserPage.openWayByClickingCard(testUserData.testUsers.studentJohn.wayTitle);
        wayDescriptionSelectors.mentorRequestDialog.getAcceptButton().click();
        cy.logout();
        
        cy.login(testUserData.testUsers.mentorMax.loginLink);
        userWaysSelectors.collectionBlock.getMentoringWayCollectionButton().click();
        UserPage.openWayByClickingCard(testUserData.testUsers.studentJohn.wayTitle);
        wayMetricsSelectors.getCompleteMetricCheckbox().check();

        wayMetricsSelectors.progressBar.getLeftLabel().should('have.text', wayMetricsData.progressBar["leftLabel100%"]);
        wayMetricsSelectors.progressBar.getRightLabel().should('have.text', wayMetricsData.progressBar["rightLabel1/1"]);

        wayMetricsSelectors.metricButtons.getAddNewGoalMetricButton().click();

        wayMetricsSelectors.getMetricDescription().eq(1).dblclick();
        wayMetricsSelectors.getMetricDescriptionInput().type(wayMetricsData.mentorMetricDescriptions);
        headerSelectors.getHeader().click();

        wayMetricsSelectors.getMetricDescription().should('have.length', wayMetricsData.totalMetrics2);
        wayMetricsSelectors.getMetricDescription().eq(1).should('have.text', wayMetricsData.mentorMetricDescriptions);
        wayMetricsSelectors.progressBar.getLeftLabel().should('have.text', wayMetricsData.progressBar["leftLabel50%"]);
        wayMetricsSelectors.progressBar.getRightLabel().should('have.text', wayMetricsData.progressBar["rightLabel1/2"]);

        WayPage
            .editGoal(`${testUserData.testUsers.studentJohn.goal} mentor edition`)
            .adjustLabel(dayReportsData.labels.mentor)
            .addDayReportData({
                reportIndex: 1,
                jobDoneDescription: `Mentor ${dayReportsData.jobDoneDescription}!`,
                timeSpentOnJob: mentorTimeSpentOnJob,
                planDescription: `Mentor ${dayReportsData.planDescription}!`,
                estimatedPlanTime: mentorEstimatedPlanTime,
                problemDescription: `Mentor ${dayReportsData.problemDescription}!`,
                commentDescription: `Mentor ${dayReportsData.commentDescription}!`
            })
            .addLabel({
                labelName: dayReportsData.labels.mentor,
                labelTarget: JobDoneOrPlanLabelTarget.jobDone,
                numberOfJobDoneOrPlan: 1})
            .addLabel({
                labelName: dayReportsData.labels.mentor,
                labelTarget: JobDoneOrPlanLabelTarget.plan,
                numberOfJobDoneOrPlan: 1});

        dayReportsSelectors.labels.addLabel.getAddLabelLine(JobDoneOrPlanLabelTarget.jobDone).eq(1).click();
        dayReportsSelectors.labels.addLabel.getLabelToChoose().should('have.length', 2);
        dayReportsSelectors.labels.addLabel.getCancelButton().click();

        cy.logout();
        headerSelectors.getHeader().click({force: true});

        wayDescriptionSelectors.wayDashBoardLeft.getGoal().should('have.text', `${testUserData.testUsers.studentJohn.goal} mentor edition`); 
        wayMetricsSelectors.getMetricDescription().eq(1).should('have.text', wayMetricsData.mentorMetricDescriptions);
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().eq(1).should('have.text', `Mentor ${dayReportsData.jobDoneDescription}!`);
        dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJob().eq(1).should('have.text', mentorTimeSpentOnJob);
        dayReportsSelectors.dayReportsContent.plans.getPlanDescription().eq(1).should('have.text', `Mentor ${dayReportsData.planDescription}!`);
        dayReportsSelectors.dayReportsContent.plans.getEstimatedPlanTime().eq(1).should('have.text', mentorEstimatedPlanTime);
        dayReportsSelectors.dayReportsContent.problems.getProblemDescription().eq(1).should('have.text', `Mentor ${dayReportsData.problemDescription}!`);
        dayReportsSelectors.dayReportsContent.comments.getCommentDescription().eq(1).should('have.text', `Mentor ${dayReportsData.commentDescription}!`);
        dayReportsSelectors.dayReportsContent.getSummaryText().first().should('have.text', `${LanguageService.way.reportsTable.total.en}${Symbols.NO_BREAK_SPACE}
          ${+dayReportsData.timeSpentOnJob + +mentorTimeSpentOnJob}`);
        dayReportsSelectors.dayReportsContent.getSummaryText().eq(1).should('have.text', `${LanguageService.way.reportsTable.total.en}${Symbols.NO_BREAK_SPACE}
          ${+dayReportsData.estimatedPlanTime + +mentorEstimatedPlanTime}`);

        cy.login(testUserData.testUsers.studentJohn.loginLink);
        userWaysSelectors.collectionBlock.getOwnWayCollectionButton().click();
        UserPage.openWayByClickingCard(testUserData.testUsers.studentJohn.wayTitle);
        wayDescriptionSelectors.wayActionMenu.getWayActionButton().click();
        wayDescriptionSelectors.wayActionMenu.getWayActionMenuItem().contains(wayPageContent.peopleBlock.makePrivateButton.en).click();

        userWaysSelectors.getPrivacyStatus().contains(wayPageContent.peopleBlock.wayPrivacy.private.en);

        cy.logout();
        Navigation.openPage(Page.AllWays);

        allWaysSelectors.allWaysCard.getCardLink(testUserData.testUsers.studentJohn.wayTitle).should('not.exist');

        Navigation.openPage(Page.AllUsers);
        AllUsersPage.openUserPersonalAreaPageByClickingCard(testUserData.testUsers.studentJohn.name);
        userWaysSelectors.collectionBlock.getOwnWayCollectionButton().click();

        userWaysSelectors.collectionBlock.getOwnWayCollectionButton()
            .find(`[data-cy="${userWaysAccessIds.collectionBlock.amountCollectionButton}"]`)
            .should('have.text', `${LanguageService.user.collections.ways.en}: 1`);
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJohn.wayTitle).should('not.exist');

        Navigation.openPage(Page.AllUsers);
        AllUsersPage.openUserPersonalAreaPageByClickingCard(testUserData.testUsers.mentorMax.name);
        userWaysSelectors.collectionBlock.getMentoringWayCollectionButton().click();

        userWaysSelectors.collectionBlock.getMentoringWayCollectionButton()
            .find(`[data-cy="${userWaysAccessIds.collectionBlock.amountCollectionButton}"]`)
            .should('have.text', `${LanguageService.user.collections.ways.en}: 1`);
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJohn.wayTitle).should('not.exist');

        cy.login(testUserData.testUsers.mentorMax.loginLink);
        userWaysSelectors.collectionBlock.getMentoringWayCollectionButton().click();
        UserPage.openWayByClickingCard(testUserData.testUsers.studentJohn.wayTitle);

        wayDescriptionSelectors.peopleBlock.deleteFromMentors.getTrashIcon(testUserData.testUsers.mentorMax.name).click();
        wayDescriptionSelectors.peopleBlock.deleteFromMentors.getDialogContent()
            .contains(wayPageContent.peopleBlock.deleteMentorModalContent.en.replace("$mentor", `"${testUserData.testUsers.mentorMax.name}"`));
        wayDescriptionSelectors.peopleBlock.deleteFromMentors.getDeleteButton().click();

        wayDescriptionSelectors.peopleBlock.getMentorsOfWayText().should('not.exist');

        headerSelectors.getAvatar().click();
        userWaysSelectors.collectionBlock.getMentoringWayCollectionButton().click();

        userWaysSelectors.collectionBlock.getMentoringWayCollectionButton()
            .find(`[data-cy="${userWaysAccessIds.collectionBlock.amountCollectionButton}"]`)
            .should('have.text', `${LanguageService.user.collections.ways.en}: 0`);
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJohn.wayTitle).should('not.exist');

        cy.logout();
        cy.login(testUserData.testUsers.studentJohn.loginLink);
        userWaysSelectors.collectionBlock.getOwnWayCollectionButton().click();
        UserPage.openWayByClickingCard(testUserData.testUsers.studentJohn.wayTitle);
        wayDescriptionSelectors.wayActionMenu.getWayActionButton().click();
        wayDescriptionSelectors.wayActionMenu.getWayActionMenuItem().contains(wayPageContent.wayActions.deleteTheWay.en).click();
        wayDescriptionSelectors.wayActionMenu.DeleteWayItem.dialog.getContent().contains(`${wayPageContent.wayActions.deleteWayQuestion.en} "${testUserData.testUsers.studentJohn.wayTitle}"?`)
        wayDescriptionSelectors.wayActionMenu.DeleteWayItem.dialog.getDeleteButton().click();

        userWaysSelectors.collectionBlock.getOwnWayCollectionButton()
            .find(`[data-cy="${userWaysAccessIds.collectionBlock.amountCollectionButton}"]`)
            .should('have.text', `${LanguageService.user.collections.ways.en}: 0`);
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJohn.wayTitle).should('not.exist');
    });

});