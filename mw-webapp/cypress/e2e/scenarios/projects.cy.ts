import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {projectsSelectors} from "cypress/scopesSelectors/projectsSelectors";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import projectsData from "cypress/fixtures/projectsFixture.json"
import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import {dayReportsSelectors} from "cypress/scopesSelectors/dayReportsSelectors";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import dayReportsData from "cypress/fixtures/dayReportsFixture.json";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {LanguageService} from "src/service/LanguageService";

beforeEach(() => {
    cy.resetGeneralDb();
    cy.login(testUserData.testUsers.studentJonh.loginLink);
});

afterEach(() => {
    cy.clearAllStorage();
});

describe('Projects tests', () => {

    it('Scenario_AnyLoggedinUser_Project', () => {
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        cy.logout();
        cy.login(testUserData.testUsers.mentorMax.loginLink);

        projectsSelectors.getProjectsButton().click();
        projectsSelectors.getAddProjectsButton().click();

        projectsSelectors.getProjectTitle().should('have.text',projectsData.defaultProjectName);
        projectsSelectors.getProjectStatus().should('have.text',`${LanguageService.project.projectPrivacy.public.en}`);

        projectsSelectors.getProjectCardButton().click();

        cy.url().should('match', new RegExp(`\\/${projectsData.endpoint}\\/${testUserData.urlPattern}`));
        projectsSelectors.projectPageContent.infoBlock.getStatus().contains(`${LanguageService.project.projectPrivacy.public.en}`);
        const expectedAvatarMax = testUserData.testUsers.mentorMax.name.substring(0, 2).toUpperCase();

        projectsSelectors.projectPageContent.infoBlock.participantsBlock.getAvatar().should('have.text', expectedAvatarMax);

        projectsSelectors.projectPageContent.infoBlock.getTitle()
            .should('have.text',projectsData.defaultProjectName)
            .dblclick();
        projectsSelectors.projectPageContent.infoBlock.getTitleInput()
            .type('{selectall}')
            .type(projectsData.newProjectName)
            .type('{enter}');

        projectsSelectors.projectPageContent.infoBlock.getTitle().should('have.text', projectsData.newProjectName);
       
        cy.openAllUsersPage();
        allUsersSelectors.card.getCardLink(testUserData.testUsers.studentJonh.name).click();
        userPersonalSelectors.userActionMenu.getMenuButton().click();
        userPersonalSelectors.userActionMenu.projectItems.getProjectsItem().click();
        userPersonalSelectors.userActionMenu.projectItems.getAddToProjectItem().contains(`${LanguageService.user.userActions.addToProject.en} ${projectsData.newProjectName}`).click();

        projectsSelectors.projectPageContent.infoBlock.getTitle().should('have.text', projectsData.newProjectName);
        projectsSelectors.projectPageContent.infoBlock.getStatus().should('have.text', `${LanguageService.project.projectPrivacy.public.en}`);

        projectsSelectors.getProjectCardButton().click();

        projectsSelectors.projectPageContent.infoBlock.participantsBlock.getAvatar().should('have.length', 2);
        projectsSelectors.projectPageContent.infoBlock.participantsBlock.getAvatar().eq(1).should('have.text', expectedAvatarMax);
        const expectedAvatarJohn = testUserData.testUsers.studentJonh.name.substring(0, 2).toUpperCase();
        projectsSelectors.projectPageContent.infoBlock.participantsBlock.getAvatar().first().should('have.text', expectedAvatarJohn);

        userWaysSelectors.getCreateNewWayButton().click();
        dayReportsSelectors.getCreateNewDayReportButton().click();
        dayReportsSelectors.dayReportsContent.getAddButton().first().click();
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().dblclick();
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().dblclick();
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescriptionInput().type(dayReportsData.jobDoneDescription);
        headerSelectors.getHeader().click();
        dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJob().dblclick();
        dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJob().dblclick();
        dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJobInput().type(dayReportsData.timeSpentOnJob);
        headerSelectors.getHeader().click();
        dayReportsSelectors.dayReportsContent.getAddButton().eq(1).click();
        dayReportsSelectors.dayReportsContent.plans.getPlanDescription().dblclick()
        dayReportsSelectors.dayReportsContent.plans.getPlanDescriptionInput().type(dayReportsData.planDescription);
        headerSelectors.getHeader().click();
        dayReportsSelectors.dayReportsContent.plans.getEstimatedPlanTime().dblclick();
        dayReportsSelectors.dayReportsContent.plans.getEstimatedPlanTimeInput().type(dayReportsData.estimatedPlanTime);
        headerSelectors.getHeader().click();           
        dayReportsSelectors.dayReportsContent.getAddButton().eq(2).click();
        dayReportsSelectors.dayReportsContent.problems.getProblemDescription().dblclick()
        dayReportsSelectors.dayReportsContent.problems.getProblemDescriptionInput().type(dayReportsData.problemDescription);
        headerSelectors.getHeader().click();
        dayReportsSelectors.dayReportsContent.getAddButton().eq(3).click();
        dayReportsSelectors.dayReportsContent.comments.getCommentDescription().dblclick()
        dayReportsSelectors.dayReportsContent.comments.getCommentDescriptionInput().type(dayReportsData.commentDescription);
        headerSelectors.getHeader().click();
        // TODO: for now projects are available only for authorized users on the backend
        // so we should make not private projects available for all users (even not authorized)
        // after this fix we should uncomment the next line
        // TODO: #1779 
        // cy.logout();
        cy.openAllUsersPage();
        allUsersSelectors.card.getCardLink(testUserData.testUsers.mentorMax.name).click();
        projectsSelectors.getProjectsButton().click();

        projectsSelectors.projectPageContent.infoBlock.getTitle().should('have.text', projectsData.newProjectName);
        projectsSelectors.projectPageContent.infoBlock.getStatus().should('have.text', `${LanguageService.project.projectPrivacy.public.en}`);

        projectsSelectors.getProjectCardButton().click();
        allWaysSelectors.allWaysCard.getCardLink(testUserData.testUsers.mentorMax.wayTitle).should('exist');

        cy.login(testUserData.testUsers.mentorMax.loginLink);
        projectsSelectors.getProjectsButton().click();
        projectsSelectors.getProjectCardButton().click();
        projectsSelectors.projectPageContent.projectActionMenu.getMenuButton().click();
        projectsSelectors.projectPageContent.projectActionMenu.getMenuItem().contains(`${LanguageService.project.projectInfo.makePrivateButton.en}`).click();

        projectsSelectors.projectPageContent.infoBlock.getStatus().contains(`${LanguageService.project.projectPrivacy.private.en}`);

        cy.logout();
        
    });

});