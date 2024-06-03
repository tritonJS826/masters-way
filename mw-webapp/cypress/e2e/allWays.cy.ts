import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import pageData from "cypress/fixtures/allWaysFixture.json"
import pageDataDictionary from "src/dictionary/AllWaysPageContent.json"
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigatioMenuSelectors} from "cypress/scopesSelectors/navigatioMenuSelectors";

describe.skip('All Ways scope tests', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('NoAuth_AllWays_Open', () => {
    headerSelectors.getBurgerMenu().click();
    navigatioMenuSelectors.menuItemLinks.getAllWaysItemLink().click();

    cy.url().should('include', pageData.endpoint);
    allWaysSelectors.allWaysTable.getTitle().should('contain', pageDataDictionary.waysTable.leftTitle);
  });

});