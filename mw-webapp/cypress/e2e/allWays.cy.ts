import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import allWaysPageData from "cypress/fixtures/allWaysFixture.json"
import allWaysPageContent from "src/dictionary/AllWaysPageContent.json"
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigatioMenuSelectors} from "cypress/scopesSelectors/navigatioMenuSelectors";

describe('All Ways scope tests', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('NoAuth_AllWays_Open', () => {
    headerSelectors.getBurgerMenu().click();
    navigatioMenuSelectors.menuItemLinks.getAllWaysItemLink().click();

    cy.url().should('include', allWaysPageData.endpoint);
    allWaysSelectors.allWaysTable.getTitle().should('contain', allWaysPageContent.waysTable.leftTitle.en);
  });

});