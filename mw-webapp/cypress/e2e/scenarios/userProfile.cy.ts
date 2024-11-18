import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";

beforeEach(() => {
    cy.resetGeneralDb();
    cy.login(testUserData.testUsers.studentJonh.loginLink); 
});

afterEach(() => {
    cy.clearAllStorage();
});

describe('User Profile tests', () => {

  it('Scenario_AnyUser_FillUserProfile', () => {
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        userPersonalSelectors.descriptionSection.getName().dblclick();
        userPersonalSelectors.descriptionSection.getNameInput()
            .type('{selectall}')
            .type(testUserData.testUsers.studentJonh.editedName);       
        headerSelectors.getHeader().click();

        cy.getFirstLetters(testUserData.testUsers.studentJonh.editedName).then((expectedAvatar: string) => {
            headerSelectors.getAvatar().should('have.text', expectedAvatar);
        });        

        userPersonalSelectors.descriptionSection.getAboutMe().dblclick();
        userPersonalSelectors.descriptionSection.getAboutMeInput()
            .type(testUserData.testUsers.studentJonh.aboutMeDescription);
        headerSelectors.getHeader().click();

        userPersonalSelectors.descriptionSection.getAddSkillButton().click();
        userPersonalSelectors.userSkillsBlock.skillsModalContent.getSkillInput().type(testUserData.testUsers.studentJonh.skill);
        userPersonalSelectors.userSkillsBlock.skillsModalContent.getCreateSkillButton().click();

        cy.logout();
        navigationMenuSelectors.menuItemLinks.getAllUsersItemLink().click();
        allUsersSelectors.card.getCardLink(testUserData.testUsers.studentJonh.editedName).contains(testUserData.testUsers.studentJonh.editedName).click();
        
        userPersonalSelectors.descriptionSection.getName().should('contain', testUserData.testUsers.studentJonh.editedName);
        userPersonalSelectors.descriptionSection.getAboutMe().should('contain', testUserData.testUsers.studentJonh.aboutMeDescription);
        userPersonalSelectors.userSkillsBlock.skillTag.getSkillTag()
            .should('be.visible')
            .and('have.text', testUserData.testUsers.studentJonh.skill); 
    });

});