import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import allUsersPageData from "cypress/fixtures/allUsersFixture.json";
import allUsersPageContent from "src/dictionary/AllUsersPageContent.json";
import allWayPageData from "cypress/fixtures/allWaysFixture.json";
import allWaysPageContent from "src/dictionary/AllWaysPageContent.json";
import aboutProjectPageContent from "src/dictionary/AboutProjectPageContent.json";
import pricingPageContent from "src/dictionary/PricingContent.json";
import partnershipPageContent from "src/dictionary/PartnershipPageContent.json";
import aboutProjectPageData from "cypress/fixtures/aboutProjectPageFixture.json";
import pricingPageData from "cypress/fixtures/pricingPageFixture.json";
import partnershipPageData from "cypress/fixtures/partnershipFixutures.json";
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
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import {pricingSelectors} from "cypress/scopesSelectors/pricingSelectors";
import {partnershipSelectors} from "cypress/scopesSelectors/partnershipSelectors";
import allTrainingsPageContent from "src/dictionary/AllTrainingsPageContent.json";
import {allTrainingsSelectors} from "cypress/scopesSelectors/allTrainingsSelectors";
import allTrainingsPageData from "cypress/fixtures/allTrainingsFixture.json";

describe('NoAuth Navigation menu scope tests', () => {

    beforeEach(() => {
        cy.resetGeneralDb();
        cy.visit('/');        
        headerSelectors.getBurgerMenu().click();
    });

    afterEach(() => {
        cy.clearAllStorage();
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
        allUsersSelectors.allUsersTitles.getTitle().should('contain', allUsersPageContent.usersTable.leftTitle.en);
    });

    it('NoAuth_NavMenu_AllTrainings', () => {
        navigationMenuSelectors.menuItemLinks.getAllTrainingsItemLink().click();

        navigationMenuSelectors.getNavigationMenu().should('not.exist');
        cy.url().should('include', allTrainingsPageData.endpoint);
        allTrainingsSelectors.allTrainingsTitles.getTitle().should('contain', allTrainingsPageContent.trainingsTable.leftTitle.en);
    });

    it('NoAuth_NavMenu_AllWays', () => {
        navigationMenuSelectors.menuItemLinks.getAllWaysItemLink().click();

        navigationMenuSelectors.getNavigationMenu().should('not.exist');
        cy.url().should('include', allWayPageData.endpoint);
        allWaysSelectors.allWaysTitles.getTitle().should('contain', allWaysPageContent.waysTable.leftTitle.en);
    });

    it('NoAuth_NavMenu_About', () => {
        navigationMenuSelectors.menuItemLinks.getAboutProjectItemLink().click();

        navigationMenuSelectors.getNavigationMenu().should('not.exist');
        cy.url().should('include', aboutProjectPageData.endpoint);
        aboutProjectSelectors.welcomeBlock.getTitle().should('contain', aboutProjectPageContent.mainTitle.en);
    });
  
    it('NoAuth_NavMenu_Partnership', () => {
        navigationMenuSelectors.menuItemLinks.getPartnershipItemLink().click();
  
        navigationMenuSelectors.getNavigationMenu().should('not.exist');
        cy.url().should('include', partnershipPageData.endpoint);
        partnershipSelectors.mainBlock.getTitle().should('contain', partnershipPageContent.partnershipMainBlock.title.en);
    });

    it('NoAuth_NavMenu_Pricing', () => {
        navigationMenuSelectors.menuItemLinks.getPricingItemLink().click();

        navigationMenuSelectors.getNavigationMenu().should('not.exist');
        cy.url().should('include', pricingPageData.endpoint);
        pricingSelectors.pricingBlock.getTitle().should('contain', pricingPageContent.pricingBlock.title.en);
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

        cy.wrap(navigationMenuSelectors.language.languageMenuItems).should('have.length', languageCode.length);

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
        navigationMenuSelectors.nightMode.getSlider().check({ force: true });
        navigationMenuSelectors.nightMode.getText().should('have.text', sideBarContent.nightMode.en);
        navigationMenuSelectors.nightMode.getSlider().check({force: true}).should("be.checked");

        cy.checkThemeColors(Theme.DARK);
    }); 
    
    it('NoAuth_NavMenu_LightMode', () => {
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
        cy.resetGeneralDb();
        cy.login(testUserData.testUsers.studentJonh.loginLink); 
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        headerSelectors.getBurgerMenu().click();
    });

    afterEach(() => {
        cy.clearAllStorage();
    });

    it('IsAuth_NavMenu_PersonalArea', () => {
        navigationMenuSelectors.menuItemLinks.getPersonalAreaItemLink().click();
        
        cy.url().should('match', new RegExp(`\\/user\\/${testUserData.urlPattern}`));
        userPersonalSelectors.descriptionSection.getName().should('have.text', testUserData.testUsers.studentJonh.name);
    }); 

    it('IsAuth_NavMenu_Settings', () => {
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