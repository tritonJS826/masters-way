import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {projectsSelectors} from "cypress/scopesSelectors/projectsSelectors";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import projectsData from "cypress/fixtures/projectsFixture.json"
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import {dayReportsSelectors} from "cypress/scopesSelectors/dayReportsSelectors";
import dayReportsData from "cypress/fixtures/dayReportsFixture.json";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {LanguageService} from "src/service/LanguageService";
import {Navigation} from "cypress/support/Navigation";
import {WayPage} from "cypress/support/pages/WayPage";

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

        cy.url().should('match', new RegExp(`\\${projectsData.endpoint}\\/${testUserData.urlPattern}`));
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
       
        Navigation
            .openAllUsersPage()
            .openUserPersonalAreaPageByClickingCard(testUserData.testUsers.studentJonh.name);
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
        WayPage
            .addDayReport({
                reportIndex:0,
                jobDoneDescription: dayReportsData.jobDoneDescription,
                timeSpentOnJob: dayReportsData.timeSpentOnJob,
                planDescription: dayReportsData.planDescription,
                estimatedPlanTime: dayReportsData.estimatedPlanTime,
                problemDescription: dayReportsData.problemDescription,
                commentDescription: dayReportsData.commentDescription
            });
        // TODO: for now projects are available only for authorized users on the backend
        // so we should make not private projects available for all users (even not authorized)
        // after this fix we should uncomment the next line
        // TODO: #1779 
        // cy.logout();
        Navigation
            .openAllUsersPage()
            .openUserPersonalAreaPageByClickingCard(testUserData.testUsers.mentorMax.name);
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