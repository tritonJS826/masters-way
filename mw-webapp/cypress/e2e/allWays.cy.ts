import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import pageData from "cypress/fixtures/allWaysFixture.json"
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";

describe.skip('All Ways scope tests', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('NoAuth_AllWays_Open', () => {
    headerSelectors.link.getLogo().click();

    cy.url().should('include', pageData.endpoint);
    allWaysSelectors.titleContainer.getTitle().should('contain', pageData.waysTitle);
  });

});