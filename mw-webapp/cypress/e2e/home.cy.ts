import homePageContent from "src/dictionary/HomePageContent.json";
import {homeSelectors} from "cypress/scopesSelectors/homeSelectors";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import allWayPageData from "cypress/fixtures/allWaysFixture.json";
import allWaysPageContent from "src/dictionary/AllWaysPageContent.json";

describe('Home page scope tests', () => {

  beforeEach(() => {
    cy.resetGeneralDb();
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearAllStorage();
  });

  it('NoAuth_Homepage_Open', () => {
    homeSelectors.welcomeBlock.getTitle().should('contain', homePageContent.title.en);
    homeSelectors.welcomeBlock.getStartButton().should('have.text', homePageContent.startForFreeButton.en);
  });

  it('NoAuth_Homepage_ViewExistingWaysButton', () => {
    homeSelectors.welcomeBlock.getViewExistingWaysButton().click();
    cy.url().should('include', allWayPageData.endpoint);
    allWaysSelectors.allWaysTitles.getTitle().should('contain', allWaysPageContent.waysTable.leftTitle.en);
  });
});