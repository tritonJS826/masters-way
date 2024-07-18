import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {homeSelectors} from "cypress/scopesSelectors/homeSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import homePageContent from "src/dictionary/HomePageContent.json";
import {Theme} from "src/globalStore/ThemeStore";
import sideBarContent from "src/dictionary/Sidebar.json";
import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";

const apiUrl = Cypress.env('API_BASE_PATH');

describe('NoAuth Header scope tests', () => {

    beforeEach(() => {
      cy.request('GET', `${apiUrl}/dev/reset-db`);
      cy.visit('/');
    });
  
    afterEach(() => {
        cy.clearAllStorage();
    });

    it('NoAuth_Header_MasterWayIcon', () => {
        headerSelectors.getLogo().click();

        cy.url().should('eq', Cypress.config('baseUrl') + '/');
        homeSelectors.welcomeBlock.getTitle().should('contain', homePageContent.title.en);
    });

    it('NoAuth_Header_LightThemeSwitchIcon', () => {
        headerSelectors.settings.getThemeSwitcher().click();

        cy.checkThemeColors(Theme.LIGHT);
    });

    it('NoAuth_Header_DarkThemeSwitchIcon', () => {
        headerSelectors.settings.getThemeSwitcher().click();
        headerSelectors.settings.getThemeSwitcher().click();

        cy.checkThemeColors(Theme.DARK);
    });
  
    it('NoAuth_Header_LanguageSelect', () => {
        const languageCode = Object.keys(sideBarContent.language).map(key => key.toUpperCase());

        cy.wrap(headerSelectors.settings.language.languageMenuItems).should('have.length', languageCode.length);

        headerSelectors.settings.language.getSelect().click();

        languageCode.forEach((code, index) => {
            headerSelectors.settings.language.languageMenuItems[index]().should('have.text', code);
            headerSelectors.settings.language.languageMenuItems[index]().click();

            if (index < languageCode.length - 1) {
                headerSelectors.settings.language.getSelect().click();
            }
        });
    });

    it('NoAuth_Header_NavigationBurgerMenu', () => {
        headerSelectors.getBurgerMenu().click();
        
        navigationMenuSelectors.getNavigationMenu().should('exist');
        navigationMenuSelectors.menuItemLinks.getLogoItemLink().should('exist');
        navigationMenuSelectors.menuItemLinks.getHomeItemLink().should('exist');
        navigationMenuSelectors.menuItemLinks.getAllUsersItemLink().should('exist');
        navigationMenuSelectors.menuItemLinks.getAllWaysItemLink().should('exist');
        navigationMenuSelectors.menuItemLinks.getAboutProjectItemLink().should('exist');
        navigationMenuSelectors.getCloseButton().should('exist');
        navigationMenuSelectors.language.getText().should('have.text', sideBarContent.language.en);
        navigationMenuSelectors.language.getSelect().should('exist');
        navigationMenuSelectors.nightMode.getText().should('have.text', sideBarContent.nightMode.en);
        navigationMenuSelectors.nightMode.getSlider().should('exist');
        navigationMenuSelectors.socialMedia.getText().should('have.text', sideBarContent.socialMedia.en);
        navigationMenuSelectors.socialMedia.getLinkedinLink().should('exist');
        navigationMenuSelectors.socialMedia.getYoutubeLink().should('exist');
    });
});    

describe('IsAuth Header scope tests', () => {

    beforeEach(() => {
        cy.request('GET', `${apiUrl}/dev/reset-db`);
        cy.visit(testUserData.userLoginLink);  
    });

    afterEach(() => {
        cy.clearAllStorage();
    });

    it('IsAuth_Header_UserNameLink', () => {
        headerSelectors.getAvatar().click();

        cy.url().should('match', new RegExp(testUserData.userUrlPattern));
        userPersonalSelectors.descriptionSection.getName().should('have.text', testUserData.name);
    });

    it('IsAuth_Header_UserNameLinkOneWord', () => {
        const expectedAvatar = testUserData.name.substring(0, 2).toUpperCase();

        headerSelectors.getAvatar().should('have.text', expectedAvatar);
    });

    it('IsAuth_Header_NavigationBurgerMenu', () => {
        headerSelectors.getBurgerMenu().click();
        
        navigationMenuSelectors.getNavigationMenu().should('exist');
        navigationMenuSelectors.menuItemLinks.getLogoItemLink().should('exist');
        navigationMenuSelectors.menuItemLinks.getHomeItemLink().should('exist');
        navigationMenuSelectors.menuItemLinks.getPersonalAreaItemLink().should('exist');
        navigationMenuSelectors.menuItemLinks.getAllUsersItemLink().should('exist');
        navigationMenuSelectors.menuItemLinks.getAllWaysItemLink().should('exist');
        navigationMenuSelectors.menuItemLinks.getAboutProjectItemLink().should('exist');
        navigationMenuSelectors.menuItemLinks.getSettingsItemLink().should('exist');
        navigationMenuSelectors.getCloseButton().should('exist');
        navigationMenuSelectors.language.getText().should('have.text', sideBarContent.language.en);
        navigationMenuSelectors.language.getSelect().should('exist');
        navigationMenuSelectors.nightMode.getText().should('have.text', sideBarContent.nightMode.en);
        navigationMenuSelectors.nightMode.getSlider().should('exist');
        navigationMenuSelectors.socialMedia.getText().should('have.text', sideBarContent.socialMedia.en);
        navigationMenuSelectors.socialMedia.getLinkedinLink().should('exist');
        navigationMenuSelectors.socialMedia.getYoutubeLink().should('exist');
        navigationMenuSelectors.getLogoutButton().should('exist');
    });

});