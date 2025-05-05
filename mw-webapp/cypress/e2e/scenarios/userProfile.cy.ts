import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";

beforeEach(() => {
    cy.resetGeneralDb();
    cy.login(testUserData.testUsers.studentJohn.loginLink); 
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
            .type(testUserData.testUsers.studentJohn.editedName);       
        headerSelectors.getHeader().click();

        cy.getFirstLetters(testUserData.testUsers.studentJohn.editedName).then((expectedAvatar: string) => {
            headerSelectors.getAvatar().should('have.text', expectedAvatar);
        });        

        userPersonalSelectors.descriptionSection.getAboutMe().dblclick();
        userPersonalSelectors.descriptionSection.getAboutMeInput()
            .type(testUserData.testUsers.studentJohn.aboutMeDescription);
        headerSelectors.getHeader().click();

        userPersonalSelectors.descriptionSection.getAddSkillButton().click();
        userPersonalSelectors.userSkillsBlock.skillsModalContent.getSkillInput().type(testUserData.testUsers.studentJohn.skill);
        userPersonalSelectors.userSkillsBlock.skillsModalContent.getCreateSkillButton().click();

        cy.logout();
        navigationMenuSelectors.menuItemLinks.getAllUsersItemLink().click();
        allUsersSelectors.card.getCardLink(testUserData.testUsers.studentJohn.editedName).contains(testUserData.testUsers.studentJohn.editedName).click();
        
        userPersonalSelectors.descriptionSection.getName().should('contain', testUserData.testUsers.studentJohn.editedName);
        userPersonalSelectors.descriptionSection.getAboutMe().should('contain', testUserData.testUsers.studentJohn.aboutMeDescription);
        userPersonalSelectors.userSkillsBlock.skillTag.getSkillTag()
            .should('be.visible')
            .and('have.text', testUserData.testUsers.studentJohn.skill); 
    });

});