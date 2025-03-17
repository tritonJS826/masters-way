import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import {wayMetricsSelectors} from "cypress/scopesSelectors/wayMetricsSelectors";
import wayMetricsData from "cypress/fixtures/wayMetricsFixture.json"
import {dayReportsSelectors} from "cypress/scopesSelectors/dayReportsSelectors";
import dayReportsData from "cypress/fixtures/dayReportsFixture.json";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import {AllWaysPage, MinDayReports} from "cypress/support/pages/AllWaysPage";
import {WayPage} from "cypress/support/pages/WayPage";

beforeEach(() => {
  cy.resetGeneralDb();
  cy.login(testUserData.testUsers.studentJonh.loginLink); 
});

afterEach(() => {
  cy.clearAllStorage();
});

describe('User Way tests', () => {

  const allWaysPage = new AllWaysPage();

  it('Scenario_Student_CreateNewWay', () => {
    cy.viewport(1200, 900);
    userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});

    userWaysSelectors.getCreateNewWayButton().click();
    wayDescriptionSelectors.wayDashBoardLeft.getTitle().dblclick().type('{selectall}').type(testUserData.testUsers.studentJonh.newWayTitle + '{enter}');
    wayDescriptionSelectors.wayDashBoardLeft.getTitle().should('have.text', testUserData.testUsers.studentJonh.newWayTitle);

    wayDescriptionSelectors.wayDashBoardLeft.getGoal().dblclick().type(`${testUserData.testUsers.studentJonh.goal}{enter}${testUserData.testUsers.studentJonh.goalNewLine}{ctrl+enter}`);

    wayDescriptionSelectors.wayDashBoardLeft.tag.getAddTagButton().click();
    wayDescriptionSelectors.wayDashBoardLeft.tag.getTagInput().type(testUserData.testUsers.studentJonh.wayTag1);
    wayDescriptionSelectors.wayDashBoardLeft.tag.getCreateTagButton().click();
    wayDescriptionSelectors.wayDashBoardLeft.tag.getTagTitle().should('have.text', testUserData.testUsers.studentJonh.wayTag1);

    wayMetricsSelectors.metricButtons.getAddNewGoalMetricButton().click();
    wayMetricsSelectors.getMetricDescription().dblclick();
    wayMetricsSelectors.getMetricDescriptionInput().type(wayMetricsData.wayMetricDescriptions[0]);
    headerSelectors.getHeader().click();
    wayMetricsSelectors.getMetricDescription().should('have.text', wayMetricsData.wayMetricDescriptions[0]);
    wayMetricsSelectors.metricButtons.getGenerateNewMetricsAIButton().click();
    wayMetricsSelectors.metricsAiGeneratedDialog.getMetricCheckbox().should('have.length', wayMetricsData.totalAiGeneratedMetrics6);
    wayMetricsSelectors.metricsAiGeneratedDialog.getMetricCheckbox().first().check();
    wayMetricsSelectors.metricsAiGeneratedDialog.getMetricCheckbox().eq(wayMetricsData.totalAiGeneratedMetrics6 - 3).check();
    wayMetricsSelectors.metricsAiGeneratedDialog.getMetricCheckbox().eq(wayMetricsData.totalAiGeneratedMetrics6 - 1).check();
    wayMetricsSelectors.metricsAiGeneratedDialog.getAddSelectedMetricsButton().click();
    wayMetricsSelectors.getMetricDescription().should('have.length', wayMetricsData.totalMetrics4);
    wayMetricsSelectors.getMetricDescription().eq(1).should('have.text', wayMetricsData.wayMetricDescriptions[1]);
    wayMetricsSelectors.getMetricDescription().eq(2).should('have.text', wayMetricsData.wayMetricDescriptions[2]);
    wayMetricsSelectors.getMetricDescription().eq(3).should('have.text', wayMetricsData.wayMetricDescriptions[3]);

    wayMetricsSelectors.deleteMetric.getTrashButton().eq(1).click();
    wayMetricsSelectors.deleteMetric.getDeleteButton().click();
    wayMetricsSelectors.getMetricDescription().should('have.length', wayMetricsData.totalMetrics4 - 1);
    wayMetricsSelectors.getMetricDescription().should('not.contain', wayMetricsData.wayMetricDescriptions[1]);

    dayReportsSelectors.getCreateNewDayReportButton().click();
    WayPage.addDayReport({
      reportIndex: 0,
      jobDoneDescription: `${dayReportsData.jobDoneDescription}{enter}${dayReportsData.jobDoneDescriptionNewLine}`,
      timeSpentOnJob: dayReportsData.timeSpentOnJob,
      planDescription: dayReportsData.planDescription,
      estimatedPlanTime: dayReportsData.estimatedPlanTime,
      problemDescription: dayReportsData.problemDescription,
      commentDescription: dayReportsData.commentDescription
    });

    dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().should('contain', dayReportsData.jobDoneDescription);
    dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJob().should('contain', dayReportsData.timeSpentOnJob);
    dayReportsSelectors.dayReportsContent.problems.getProblemDescription().should('contain', dayReportsData.problemDescription);
    dayReportsSelectors.dayReportsContent.comments.getCommentDescription().should('contain', dayReportsData.commentDescription);

    cy.logout();
    navigationMenuSelectors.menuItemLinks.getAllWaysItemLink().click();
    allWaysSelectors.filterViewBlock.getCardViewButton().click();
    AllWaysPage
      .adjustWayFilterMinDayReports(MinDayReports.any)
      .openWayByClickingCard(testUserData.testUsers.studentJonh.newWayTitle);
    wayDescriptionSelectors.wayDashBoardLeft.getGoal().should('have.text', `${testUserData.testUsers.studentJonh.goal}\n${testUserData.testUsers.studentJonh.goalNewLine}`);
    wayDescriptionSelectors.wayDashBoardLeft.tag.getTagTitle().should('have.text', testUserData.testUsers.studentJonh.wayTag1);
    wayMetricsSelectors.getMetricDescription().first().should('have.text', wayMetricsData.wayMetricDescriptions[0]);
    wayMetricsSelectors.getMetricDescription().eq(1).should('have.text', wayMetricsData.wayMetricDescriptions[2]);
    wayMetricsSelectors.getMetricDescription().eq(2).should('have.text', wayMetricsData.wayMetricDescriptions[3]);
    wayMetricsSelectors.getMetricDescription().should('have.length', wayMetricsData.totalMetrics4- 1);
    dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().should('have.text', `${dayReportsData.jobDoneDescription}\n${dayReportsData.jobDoneDescriptionNewLine}`);
    dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJob().should('have.text', dayReportsData.timeSpentOnJob);
    dayReportsSelectors.dayReportsContent.plans.getPlanDescription().should('have.text', dayReportsData.planDescription);
    dayReportsSelectors.dayReportsContent.plans.getEstimatedPlanTime().should('have.text', dayReportsData.estimatedPlanTime);
    dayReportsSelectors.dayReportsContent.problems.getProblemDescription().should('have.text', dayReportsData.problemDescription);
    dayReportsSelectors.dayReportsContent.comments.getCommentDescription().should('have.text', dayReportsData.commentDescription);
  });

});