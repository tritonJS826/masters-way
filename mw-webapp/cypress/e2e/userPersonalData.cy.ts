import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import userPersonalData from "cypress/fixtures/userPersonalDataFixture.json"
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";

const apiUrl = Cypress.env('API_BASE_PATH');

beforeEach(() => {
    cy.request('GET', `${apiUrl}/dev/reset-db`);
    cy.visit(testUserData.userLoginLink); 
});

afterEach(() => {
    cy.clearAllStorage();
});

function getFirstLetters(str: string): string {
    const words = str.trim().split(/\s+/);
    
    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    } else {
        return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    }
}

describe('IsAuth User personal data scope tests', () => {

    it('IsAuth_UserPersonalData_EditUserName', () => {
        userPersonalSelectors.descriptionSection.getName().dblclick();
    
        userPersonalSelectors.descriptionSection.getNameInput()
            .type('{selectall}')
            .type(userPersonalData.newUserName);
    
        headerSelectors.getHeader().click();

        userPersonalSelectors.descriptionSection.getName().should('contain', userPersonalData.newUserName);

        const expectedAvatar = getFirstLetters(userPersonalData.newUserName);

        headerSelectors.getAvatar().should('have.text', expectedAvatar);

    });

    it('IsAuth_UserPersonalData_EditAboutSection', () => {
        userPersonalSelectors.descriptionSection.getAboutMe().dblclick();
    
        userPersonalSelectors.descriptionSection.getAboutMeInput()
            .type(userPersonalData.aboutMeDescription);
    
        headerSelectors.getHeader().click();

        userPersonalSelectors.descriptionSection.getAboutMe().should('contain', userPersonalData.aboutMeDescription);
    });

});