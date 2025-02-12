import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";
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
        userWaysSelectors.collectionBlock.getOwnWayCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.wayTitle).click();
        wayDescriptionSelectors.peopleBlock.getApplyAsMentorButton().click();

        wayDescriptionSelectors.peopleBlock.getApplyAsMentorButton().should('not.exist');
        wayDescriptionSelectors.peopleBlock.getMentorsOfWayText().should('have.text', wayDescriptionData.peopleBlock.mentorshipRequestHeader);
        cy.logout();

        cy.login(testUserData.testUsers.studentJonh.loginLink);
        userWaysSelectors.collectionBlock.getOwnWayCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.wayTitle).click();
        
        wayDescriptionSelectors.mentorRequestDialog.getMentorNameLink().should('have.text', testUserData.testUsers.mentorMax.name);
        
        wayDescriptionSelectors.mentorRequestDialog.getAcceptButton().click();

        wayDescriptionSelectors.peopleBlock.getMentorsOfWayText().find('h3').should('have.text', wayDescriptionData.peopleBlock.mentorOfWayText);
        wayDescriptionSelectors.peopleBlock.getWayMentorLink().should('have.text', testUserData.testUsers.mentorMax.name);

        cy.logout();
        navigationMenuSelectors.menuItemLinks.getAllWaysItemLink().click();
        allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
        allWaysSelectors.filterViewBlock.getDayReportsSelectOption(LanguageService.allWays.filterBlock.minDayReportsAmountOption0.en).click();
        allWaysSelectors.allWaysTable.getWayLink(testUserData.testUsers.studentJonh.wayTitle).first().click();
        
        wayDescriptionSelectors.peopleBlock.getMentorsOfWayText().find('h3').should('have.text', wayDescriptionData.peopleBlock.mentorOfWayText);
        wayDescriptionSelectors.peopleBlock.getWayMentorLink().should('have.text', testUserData.testUsers.mentorMax.name);

        cy.openAllUsersPage();
        allUsersSelectors.card.getCardLink(testUserData.testUsers.mentorMax.name).click();
        userWaysSelectors.collectionBlock.getWayAmountCollectionButton().eq(1).should('have.text', `${LanguageService.user.collections.ways.en}: 1`);
        userWaysSelectors.collectionBlock.getMentoringWayCollectionButton().click();
        allWaysSelectors.allWaysTable.getWayLink(testUserData.testUsers.studentJonh.wayTitle).should('exist').and('be.visible');
    });

    it('Scenario_MentorStudent_WayMentoring', () => {
        const mentorTimeSpentOnJob = '20', mentorEstimatedPlanTime = '14';

        cy.login(testUserData.testUsers.studentJonh.loginLink);
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        userWaysSelectors.getCreateNewWayButton().click();
        wayDescriptionSelectors.wayDashBoardLeft.getGoal()
            .dblclick()
            .type(testUserData.testUsers.studentJonh.goal);
        headerSelectors.getHeader().click();
        wayMetricsSelectors.metricButtons.getAddNewGoalMetricButton().click();
        wayMetricsSelectors.getMetricDescription().dblclick();
        wayMetricsSelectors.getMetricDescriptionInput().type(wayMetricsData.wayMetricDescriptions[0]);
        headerSelectors.getHeader().click();
        dayReportsSelectors.labels.getAdjustLabelsButton().click();
        dayReportsSelectors.labels.adjustLabelsDialog.getAddLabelButton().click();
        dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getInput().click().type(dayReportsData.labels.student);
        dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getOkButton().click();
        dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getCancelButton().click();
        dayReportsSelectors.getCreateNewDayReportButton().click();
        dayReportsSelectors.dayReportsContent.getAddButton().first().click();
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().dblclick();
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().dblclick();
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescriptionInput().type(dayReportsData.jobDoneDescription);
        headerSelectors.getHeader().click();
        dayReportsSelectors.labels.addLabel.getAddLabelLine('jobDone').click();
        dayReportsSelectors.labels.addLabel.getLabelToChoose().click();
        dayReportsSelectors.labels.addLabel.getSaveButton().click();
        dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJob().dblclick();
        dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJob().dblclick();
        dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJobInput().type(dayReportsData.timeSpentOnJob);
        headerSelectors.getHeader().click();
        dayReportsSelectors.dayReportsContent.getAddButton().eq(1).click();
        dayReportsSelectors.dayReportsContent.plans.getPlanDescription().dblclick()
        dayReportsSelectors.dayReportsContent.plans.getPlanDescriptionInput().type(dayReportsData.planDescription);
        headerSelectors.getHeader().click();
        dayReportsSelectors.labels.addLabel.getAddLabelLine('plan').click();
        dayReportsSelectors.labels.addLabel.getLabelToChoose().click();
        dayReportsSelectors.labels.addLabel.getSaveButton().click();
        dayReportsSelectors.dayReportsContent.plans.getEstimatedPlanTime().dblclick();
        dayReportsSelectors.dayReportsContent.plans.getEstimatedPlanTimeInput().type(dayReportsData.estimatedPlanTime);
        headerSelectors.getHeader().click();           
        dayReportsSelectors.dayReportsContent.getAddButton().eq(2).click();
        dayReportsSelectors.dayReportsContent.problems.getProblemDescription().dblclick();
        dayReportsSelectors.dayReportsContent.problems.getProblemDescriptionInput().type(dayReportsData.problemDescription);
        headerSelectors.getHeader().click();
        dayReportsSelectors.dayReportsContent.getAddButton().eq(3).click();
        dayReportsSelectors.dayReportsContent.comments.getCommentDescription().dblclick();
        dayReportsSelectors.dayReportsContent.comments.getCommentDescriptionInput().type(dayReportsData.commentDescription);
        headerSelectors.getHeader().click();
        cy.logout();
        cy.login(testUserData.testUsers.mentorMax.loginLink);
        cy.openAllUsersPage();
        allUsersSelectors.card.getCardLink(testUserData.testUsers.studentJonh.name)
            .contains(testUserData.testUsers.studentJonh.name)
            .click();
        userWaysSelectors.collectionBlock.getOwnWayCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.wayTitle).click();
        wayDescriptionSelectors.peopleBlock.getApplyAsMentorButton().click();
        cy.logout();
        cy.login(testUserData.testUsers.studentJonh.loginLink);
        userWaysSelectors.collectionBlock.getOwnWayCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.wayTitle).click();
        wayDescriptionSelectors.mentorRequestDialog.getAcceptButton().click();
        cy.logout();
        
        cy.login(testUserData.testUsers.mentorMax.loginLink);
        userWaysSelectors.collectionBlock.getMentoringWayCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.wayTitle).click();
        wayMetricsSelectors.getCompleteMetricCheckbox().check();

        wayMetricsSelectors.progressBar.getLeftLabel().should('have.text', wayMetricsData.progressBar["leftLabel100%"]);
        wayMetricsSelectors.progressBar.getRightLabel().should('have.text', wayMetricsData.progressBar["rightLabel1/1"]);

        wayMetricsSelectors.metricButtons.getAddNewGoalMetricButton().click();
        wayMetricsSelectors.getMetricDescription().eq(1).dblclick().type(wayMetricsData.mentorMetricDescriptions);
        headerSelectors.getHeader().click();

        wayMetricsSelectors.getMetricDescription().should('have.length', wayMetricsData.totalMetrics2);
        wayMetricsSelectors.getMetricDescription().eq(1).should('have.text', wayMetricsData.mentorMetricDescriptions);
        wayMetricsSelectors.progressBar.getLeftLabel().should('have.text', wayMetricsData.progressBar["leftLabel50%"]);
        wayMetricsSelectors.progressBar.getRightLabel().should('have.text', wayMetricsData.progressBar["rightLabel1/2"]);

        wayDescriptionSelectors.wayDashBoardLeft.getGoal().dblclick().type(' mentor edition');
        headerSelectors.getHeader().click();
        dayReportsSelectors.labels.getAdjustLabelsButton().click();
        dayReportsSelectors.labels.adjustLabelsDialog.getAddLabelButton().click();
        dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getInput().click().type(dayReportsData.labels.mentor);
        dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getOkButton().click();
        dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getCancelButton().click();

        dayReportsSelectors.dayReportsContent.getAddButton().first().click();
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().dblclick();
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().dblclick();
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescriptionInput().type(`Mentor ${dayReportsData.jobDoneDescription}!`);
        headerSelectors.getHeader().click();
        dayReportsSelectors.labels.addLabel.getAddLabelLine('jobDone').eq(1).click();
        dayReportsSelectors.labels.addLabel.getLabelToChoose().eq(1).click();

        dayReportsSelectors.labels.addLabel.getLabelToChoose().should('have.length', 2);

        dayReportsSelectors.labels.addLabel.getSaveButton().click();
        dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJob().eq(1).dblclick();
        dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJob().eq(1).dblclick();
        dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJobInput().type(mentorTimeSpentOnJob);
        headerSelectors.getHeader().click();
        dayReportsSelectors.dayReportsContent.getAddButton().eq(1).click();
        dayReportsSelectors.dayReportsContent.plans.getPlanDescription().eq(1).dblclick().type(`Mentor ${dayReportsData.planDescription}!`);
        headerSelectors.getHeader().click();
        dayReportsSelectors.labels.addLabel.getAddLabelLine('plan').eq(1).click();
        dayReportsSelectors.labels.addLabel.getLabelToChoose().first().click();
        dayReportsSelectors.labels.addLabel.getLabelToChoose().eq(1).click();
        dayReportsSelectors.labels.addLabel.getSaveButton().click();
        dayReportsSelectors.dayReportsContent.plans.getEstimatedPlanTime().eq(1).dblclick().type(mentorEstimatedPlanTime);
        headerSelectors.getHeader().click();
        dayReportsSelectors.dayReportsContent.getAddButton().eq(2).click();
        dayReportsSelectors.dayReportsContent.problems.getProblemDescription().eq(1).dblclick();
        dayReportsSelectors.dayReportsContent.problems.getProblemDescriptionInput().type(`Mentor ${dayReportsData.problemDescription}!`);
        headerSelectors.getHeader().click();
        dayReportsSelectors.dayReportsContent.getAddButton().eq(3).click();
        dayReportsSelectors.dayReportsContent.comments.getCommentDescription().eq(1).dblclick();
        dayReportsSelectors.dayReportsContent.comments.getCommentDescriptionInput().type(`Mentor ${dayReportsData.commentDescription}!`);
        headerSelectors.getHeader().click();
        cy.logout();
        headerSelectors.getHeader().click({force: true});

        wayDescriptionSelectors.wayDashBoardLeft.getGoal().should('have.text', `${testUserData.testUsers.studentJonh.goal} mentor edition`); 
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

        cy.login(testUserData.testUsers.studentJonh.loginLink);
        userWaysSelectors.collectionBlock.getOwnWayCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.wayTitle).click();
        wayDescriptionSelectors.wayActionMenu.getWayActionButton().click();
        wayDescriptionSelectors.wayActionMenu.getWayActionMenuItem().contains(wayPageContent.peopleBlock.makePrivateButton.en).click();

        userWaysSelectors.getPrivacyStatus().contains(wayPageContent.peopleBlock.wayPrivacy.private.en);

        cy.logout();
        cy.openAllWaysPage();

        allWaysSelectors.allWaysCard.getCardLink(testUserData.testUsers.studentJonh.wayTitle).should('not.exist');

        cy.openAllUsersPage();
        allUsersSelectors.card.getCardLink(testUserData.testUsers.studentJonh.name).click();
        userWaysSelectors.collectionBlock.getOwnWayCollectionButton().click();

        userWaysSelectors.collectionBlock.getOwnWayCollectionButton()
            .find(`[data-cy="${userWaysAccessIds.collectionBlock.amountCollectionButton}"]`)
            .should('have.text', `${LanguageService.user.collections.ways.en}: 1`);
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.wayTitle).should('not.exist');

        cy.openAllUsersPage();
        allUsersSelectors.card.getCardLink(testUserData.testUsers.mentorMax.name).click();
        userWaysSelectors.collectionBlock.getMentoringWayCollectionButton().click();

        userWaysSelectors.collectionBlock.getMentoringWayCollectionButton()
            .find(`[data-cy="${userWaysAccessIds.collectionBlock.amountCollectionButton}"]`)
            .should('have.text', `${LanguageService.user.collections.ways.en}: 1`);
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.wayTitle).should('not.exist');

        cy.login(testUserData.testUsers.mentorMax.loginLink);
        userWaysSelectors.collectionBlock.getMentoringWayCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.wayTitle).click();

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
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.wayTitle).should('not.exist');

        cy.logout();
        cy.login(testUserData.testUsers.studentJonh.loginLink);
        userWaysSelectors.collectionBlock.getOwnWayCollectionButton().click();
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.wayTitle).click();
        wayDescriptionSelectors.wayActionMenu.getWayActionButton().click();
        wayDescriptionSelectors.wayActionMenu.getWayActionMenuItem().contains(wayPageContent.wayActions.deleteTheWay.en).click();
        wayDescriptionSelectors.wayActionMenu.DeleteWayItem.dialog.getContent().contains(`${wayPageContent.wayActions.deleteWayQuestion.en} "${testUserData.testUsers.studentJonh.wayTitle}"?`)
        wayDescriptionSelectors.wayActionMenu.DeleteWayItem.dialog.getDeleteButton().click();

        userWaysSelectors.collectionBlock.getOwnWayCollectionButton()
            .find(`[data-cy="${userWaysAccessIds.collectionBlock.amountCollectionButton}"]`)
            .should('have.text', `${LanguageService.user.collections.ways.en}: 0`);
        userWaysSelectors.collectionBlock.getWayLink(testUserData.testUsers.studentJonh.wayTitle).should('not.exist');
    });

});