import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import userPersonalData from "cypress/fixtures/userPersonalDataFixture.json"
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";

beforeEach(() => {
    cy.resetGeneralDb();
    cy.login(testUserData.testUsers.studentJonh.loginLink); 
});

afterEach(() => {
    cy.clearAllStorage();
});

describe('IsAuth User personal data scope tests', () => {

    it('IsAuth_UserPersonalData_EditUserName', () => {
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        userPersonalSelectors.descriptionSection.getName().dblclick();
    
        userPersonalSelectors.descriptionSection.getNameInput()
            .type('{selectall}')
            .type(userPersonalData.newUserName);
    
        headerSelectors.getHeader().click();

        userPersonalSelectors.descriptionSection.getName().should('contain', userPersonalData.newUserName);

        cy.getFirstLetters(userPersonalData.newUserName).then((expectedAvatar: string) => {
            headerSelectors.getAvatar().should('have.text', expectedAvatar);
        });

    });

    it('IsAuth_UserPersonalData_EditAboutSection', () => {
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        userPersonalSelectors.descriptionSection.getAboutMe().dblclick();
    
        userPersonalSelectors.descriptionSection.getAboutMeInput()
            .type(userPersonalData.aboutMeDescription);
    
        headerSelectors.getHeader().click();

        userPersonalSelectors.descriptionSection.getAboutMe().should('contain', userPersonalData.aboutMeDescription);

    });

    it('IsAuth_UserPersonalData_AddSkillTag', () => {
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        userPersonalSelectors.descriptionSection.getAddSkillButton().click();
        userPersonalSelectors.userSkillsBlock.skillsModalContent.getSkillInput().type(userPersonalData.skill);
        userPersonalSelectors.userSkillsBlock.skillsModalContent.getCreateSkillButton().click();

        userPersonalSelectors.userSkillsBlock.skillTag.getSkillTag()
            .should('be.visible')
            .and('have.text', userPersonalData.skill);
    });

    it('IsAuth_UserPersonalData_FindMentorButton', () => {
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        userPersonalSelectors.findMentor.getFindMentorButton().click();
        userPersonalSelectors.findMentor.getForm().should('exist');
        userPersonalSelectors.findMentor.getSkillsToLearnInput().type(userPersonalData.findMentorForm.skillsToLearn);
        userPersonalSelectors.findMentor.getCurrentExperienceInput().type(userPersonalData.findMentorForm.currentExperience);
        userPersonalSelectors.findMentor.getMentorDescriptionInput().type(userPersonalData.findMentorForm.mentorDescription);
        userPersonalSelectors.findMentor.getSubmitButton().click();

        userPersonalSelectors.findMentor.getForm().should('not.exist');
        userPersonalSelectors.findMentor.getRequestSent().should('have.text', userPersonalData.findMentorForm.requestSent)

        headerSelectors.getHeader().click({force: true});
        
        userPersonalSelectors.findMentor.getRequestSent().should('not.exist');
    });

});