import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {homeSelectors} from "cypress/scopesSelectors/homeSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import homePageContent from "src/dictionary/HomePageContent.json";
import {Theme} from "src/globalStore/ThemeStore";
import sideBarContent from "src/dictionary/Sidebar.json";
import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";

describe('NoAuth Header scope tests', () => {

    beforeEach(() => {
      cy.resetDb();
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
        cy.openAllWaysPage();
        cy.checkThemeColors(Theme.LIGHT);
    });

    it('NoAuth_Header_DarkThemeSwitchIcon', () => {
        cy.openAllWaysPage();
        headerSelectors.settings.getThemeSwitcher().click();
        headerSelectors.settings.getThemeSwitcher().click();

        cy.checkThemeColors(Theme.DARK);
    });

    it('NoAuth_Header_ObsidianThemeSwitchIcon', () => {
        cy.openAllWaysPage();
        headerSelectors.settings.getThemeSwitcher().click();

        cy.checkThemeColors(Theme.OBSIDIAN);
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
        navigationMenuSelectors.menuItemLinks.getPricingItemLink().should('exist');
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
        cy.resetDb();
        cy.login(testUserData.testUsers.studentJonh.loginLink);  
    });

    afterEach(() => {
        cy.clearAllStorage();
    });

  it('IsAuth_Header_UserNameLink', () => {
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        headerSelectors.getAvatar().click();

        cy.url().should('match', new RegExp(`\\/user\\/${testUserData.urlPattern}`));
        userPersonalSelectors.descriptionSection.getName().should('have.text', testUserData.testUsers.studentJonh.name);
    });

  it('IsAuth_Header_UserNameLinkOneWord', () => {
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        const expectedAvatar = testUserData.testUsers.studentJonh.name.substring(0, 2).toUpperCase();

        headerSelectors.getAvatar().should('have.text', expectedAvatar);
    });

  it('IsAuth_Header_NavigationBurgerMenu', () => {
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        headerSelectors.getBurgerMenu().click();
        
        navigationMenuSelectors.getNavigationMenu().should('exist');
        navigationMenuSelectors.menuItemLinks.getLogoItemLink().should('exist');
        navigationMenuSelectors.menuItemLinks.getHomeItemLink().should('exist');
        navigationMenuSelectors.menuItemLinks.getPersonalAreaItemLink().should('exist');
        navigationMenuSelectors.menuItemLinks.getAllUsersItemLink().should('exist');
        navigationMenuSelectors.menuItemLinks.getAllWaysItemLink().should('exist');
        navigationMenuSelectors.menuItemLinks.getAboutProjectItemLink().should('exist');
        navigationMenuSelectors.menuItemLinks.getPricingItemLink().should('exist');
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