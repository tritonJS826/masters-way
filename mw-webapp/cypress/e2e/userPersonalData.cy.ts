import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import userPersonalData from "cypress/fixtures/userPersonalDataFixture.json"
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {allWaysSelectors}  from "cypress/scopesSelectors/allWaysSelectors";
import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";
import ServeyModalsContent from "src/dictionary/SurveyModalsContent.json";
import {Theme, themedVariables} from "src/globalStore/ThemeStore";
import {Navigation} from "cypress/support/Navigation";

beforeEach(() => {
    cy.resetGeneralDb();
    cy.login(testUserData.testUsers.studentJonh.loginLink); 
});

afterEach(() => {
    cy.clearAllStorage();
});

function hexToRgb(hex: string): string {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(x => x + x).join('');
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgb(${r}, ${g}, ${b})`;
}

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

    it('IsAuth_UserPersonalData_RequestToFindMentorWindow', () => {
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        userPersonalSelectors.findMentor.getFindMentorButton().click();
        userPersonalSelectors.findMentor.getForm().should('exist');
        userPersonalSelectors.findMentor.getSkillsToLearnInput().type(userPersonalData.findMentorForm.skillsToLearn);
        userPersonalSelectors.findMentor.getCurrentExperienceInput().type(userPersonalData.findMentorForm.currentExperience);
        userPersonalSelectors.findMentor.getMentorDescriptionInput().type(userPersonalData.findMentorForm.mentorDescription);
        userPersonalSelectors.findMentor.getSubmitButton().click();

        userPersonalSelectors.findMentor.getForm().should('not.exist');
        userPersonalSelectors.findMentor.getRequestSent().should('have.text', ServeyModalsContent.findMentor.requestSent.en)

        headerSelectors.getHeader().click({force: true});
        
        userPersonalSelectors.findMentor.getRequestSent().should('not.exist');
    });

    it('IsAuth_UserPersonalData_MentorOption', () => {
        cy.login(testUserData.testUsers.mentorMax.loginLink);
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});

        userPersonalSelectors.descriptionSection.getMentorCheckbox().check();
        userPersonalSelectors.descriptionSection.getMentorCheckbox().should('be.checked');

        cy.logout();
        Navigation.openAllUsersPage();
        allUsersSelectors.card.getCardLink(testUserData.testUsers.mentorMax.name).within(() => {
            allUsersSelectors.card.getMentorFlag()
                .should('exist')
                .and('be.visible');
        });
        allWaysSelectors.filterViewBlock.getTableViewButton().click();
        allUsersSelectors.allUsersTable.getUserContact()
            .filter((_, el) => el.innerText.includes(testUserData.testUsers.mentorMax.email))
            .should('have.css', 'background-color', hexToRgb(themedVariables.attentionColor[Theme.LIGHT]));
    });

});