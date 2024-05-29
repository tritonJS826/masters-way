import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import pageData from "../fixtures/allWaysFixture.json"
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";

describe.skip('All Ways scope tests', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('NoAuth_AllWays_Open', () => {
    headerSelectors.items.getLogoBtn().click();

    cy.url().should('include', pageData.endpoint);
    allWaysSelectors.titles.getAllWaysTitle().should('contain', pageData.waysTitle);
  });

});