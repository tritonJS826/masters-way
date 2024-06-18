import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import allUsersPageData from "cypress/fixtures/allUsersFixture.json";
import allUsersPageContent from "src/dictionary/AllUsersPageContent.json";
import allWayPageData from "cypress/fixtures/allWaysFixture.json";
import allWaysPageContent from "src/dictionary/AllWaysPageContent.json";
import aboutProjectPageContent from "src/dictionary/AboutProjectPageContent.json";
import aboutProjectPageData from "cypress/fixtures/aboutProjectPageFixture.json";
import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {aboutProjectSelectors} from "cypress/scopesSelectors/aboutProjectSelectors";
import {homeSelectors} from "cypress/scopesSelectors/homeSelectors";
import homePageContent from "src/dictionary/HomePageContent.json";
import sideBarContent from "src/dictionary/Sidebar.json";
import navigationMenuFixture from "cypress/fixtures/navigationMenuFixture.json";
import {Theme} from "src/globalStore/ThemeStore";
import settingsData from "cypress/fixtures/settingsFixture.json"
import {settingsSelectors} from "cypress/scopesSelectors/settingsSelectors";
import settingsPageContent from "src/dictionary/SettingsPageContent.json";
import testUserData from "cypress/fixtures/testUserDataFixture.json";

afterEach(() => {
    cy.clearAllStorage();
});

describe('NoAuth Navigation menu scope tests', () => {

    beforeEach(() => {
        cy.visit('/');        
        headerSelectors.getBurgerMenu().click();
    });

    it('NoAuth_NavMenu_MastersWayLogo', () => {
        navigationMenuSelectors.menuItemLinks.getLogoItemLink().click();

        navigationMenuSelectors.getNavigationMenu().should('not.exist');

        cy.url().should('eq', Cypress.config('baseUrl') + '/');
        homeSelectors.welcomeBlock.getTitle().should('contain', homePageContent.title.en);
    });

    it('NoAuth_NavMenu_Home', () => {
        navigationMenuSelectors.menuItemLinks.getHomeItemLink().click();

        navigationMenuSelectors.getNavigationMenu().should('not.exist');
        cy.url().should('eq', Cypress.config('baseUrl') + '/');
        homeSelectors.welcomeBlock.getTitle().should('contain', homePageContent.title.en);
    });
  
    it('NoAuth_NavMenu_AllUsers', () => {
        navigationMenuSelectors.menuItemLinks.getAllUsersItemLink().click();

        navigationMenuSelectors.getNavigationMenu().should('not.exist');
        cy.url().should('include', allUsersPageData.endpoint);
        allUsersSelectors.allUsersTable.getTitle().should('contain', allUsersPageContent.usersTable.leftTitle.en);
    });

    it('NoAuth_NavMenu_AllWays', () => {
        navigationMenuSelectors.menuItemLinks.getAllWaysItemLink().click();

        navigationMenuSelectors.getNavigationMenu().should('not.exist');
        cy.url().should('include', allWayPageData.endpoint);
        allWaysSelectors.allWaysTable.getTitle().should('contain', allWaysPageContent.waysTable.leftTitle.en);
    });

    it('NoAuth_NavMenu_About', () => {
        navigationMenuSelectors.menuItemLinks.getAboutProjectItemLink().click();

        navigationMenuSelectors.getNavigationMenu().should('not.exist');
        cy.url().should('include', aboutProjectPageData.endpoint);
        aboutProjectSelectors.welcomeBlock.getTitle().should('contain', aboutProjectPageContent.mainTitle.en);
    });

    it('NoAuth_NavMenu_Close', () => {
        headerSelectors.getHeader().click({force: true});

        cy.url().should('eq', Cypress.config('baseUrl') + '/');
        navigationMenuSelectors.getNavigationMenu().should('not.exist');
    });

    it('NoAuth_NavMenu_CloseButton', () => {
        navigationMenuSelectors.getCloseButton().click();

        cy.url().should('eq', Cypress.config('baseUrl') + '/');
        navigationMenuSelectors.getNavigationMenu().should('not.exist');
    });

    it('NoAuth_NavMenu_Language', () => {
        const languageCode = Object.keys(sideBarContent.language).map(key => key.toUpperCase());
        const languageText = Object.values(sideBarContent.language);

        navigationMenuSelectors.language.getSelect().click();

        languageCode.forEach((code, index) => {
            navigationMenuSelectors.language.languageMenuItems[index]().should('have.text', code);
            navigationMenuSelectors.language.languageMenuItems[index]().click();
    
            navigationMenuSelectors.language.getText().should('have.text', languageText[index]);

            if (index < languageText.length - 1) {
                navigationMenuSelectors.language.getSelect().click();
            }
        });
    });
  
    it('NoAuth_NavMenu_DarkMode', () => {
        navigationMenuSelectors.nightMode.getText().should('have.text', sideBarContent.nightMode.en);
        navigationMenuSelectors.nightMode.getSlider().check({force: true}).should("be.checked");

        cy.checkThemeColors(Theme.DARK);
    }); 
    
    it('NoAuth_NavMenu_LightMode', () => {
        navigationMenuSelectors.nightMode.getSlider().check({force: true});

        navigationMenuSelectors.nightMode.getText().should('have.text', sideBarContent.nightMode.en);
        navigationMenuSelectors.nightMode.getSlider().uncheck({force: true}).should("not.be.checked");
        cy.checkThemeColors(Theme.LIGHT);
    });

    it('NoAuth_NavMenu_LinkedinLink', () => {
        navigationMenuSelectors.socialMedia.getText().should('have.text', sideBarContent.socialMedia.en);

        cy.checkLinkAttributes(navigationMenuSelectors.socialMedia.getLinkedinLink(), navigationMenuFixture.linkedinLink);
        cy.checkLinkStatus(navigationMenuSelectors.socialMedia.getLinkedinLink(), navigationMenuFixture.linkedinLink);
    }); 

    it('NoAuth_NavMenu_YoutubeLink', () => {
        navigationMenuSelectors.socialMedia.getText().should('have.text', sideBarContent.socialMedia.en);

        cy.checkLinkAttributes(navigationMenuSelectors.socialMedia.getYoutubeLink(), navigationMenuFixture.youtubeLink);
        cy.checkLinkStatus(navigationMenuSelectors.socialMedia.getYoutubeLink(), navigationMenuFixture.youtubeLink);                             
    }); 
  });

  describe('IsAuth Navigation menu scope tests', () => {

    beforeEach(() => {
        cy.visit(testUserData.userLoginLink);    
        headerSelectors.getBurgerMenu().click();
    });

    it('IsAuth_NavMenu_PersonalArea', () => {
        navigationMenuSelectors.menuItemLinks.getSettingsItemLink().click();
        
        cy.url().should('include', settingsData.endpoint);
        settingsSelectors.getTitle().should('contain', settingsPageContent.title.en);
    }); 

    it('IsAuth_NavMenu_LogoutButton', () => {
        navigationMenuSelectors.getLogoutButton().click();
        
        navigationMenuSelectors.getLogoutButton().should('not.exist');
        headerSelectors.getloginButton().should('exist');
    }); 
});