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

describe('Navigation menu scope tests', () => {

    beforeEach(() => {
      cy.visit('/');
      headerSelectors.getBurgerMenu().click();
    });

    it('NoAuth_NavMenu_Light_MastersWayLogo', () => {
        navigationMenuSelectors.menuItemLinks.getLogoItemLink().click();

        cy.url().should('include', '/');
        homeSelectors.welcomeBlock.getTitle().should('contain', homePageContent.title.en);
    });

    it('NoAuth_NavMenu_Home', () => {
        navigationMenuSelectors.menuItemLinks.getHomeItemLink().click();

        cy.url().should('include', '/');
        homeSelectors.welcomeBlock.getTitle().should('contain', homePageContent.title.en);
    });
  
    it('NoAuth_NavMenu_AllUsers', () => {
        navigationMenuSelectors.menuItemLinks.getAllUsersItemLink().click();

        cy.url().should('include', allUsersPageData.endpoint);
        allUsersSelectors.allUsersTable.getTitle().should('contain', allUsersPageContent.usersTable.leftTitle.en);
    });

    it('NoAuth_NavMenu_AllWays', () => {
        navigationMenuSelectors.menuItemLinks.getAllWaysItemLink().click();

        cy.url().should('include', allWayPageData.endpoint);
        allWaysSelectors.allWaysTable.getTitle().should('contain', allWaysPageContent.waysTable.leftTitle.en);
    });

    it('NoAuth_NavMenu_About', () => {
        navigationMenuSelectors.menuItemLinks.getAboutProjectItemLink().click();

        cy.url().should('include', aboutProjectPageData.endpoint);
        aboutProjectSelectors.welcomeBlock.getTitle().should('contain', aboutProjectPageContent.mainTitle.en);
    });

    it('NoAuth_NavMenu_Close', () => {
        headerSelectors.getHeader().click({force: true});

        cy.url().should('include', '/');
        navigationMenuSelectors.menuItemLinks.getAboutProjectItemLink().should('not.exist');
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
  
  });