import pageData from "../fixtures/homeFixture.json";
import {homeSelectors} from "cypress/scopesSelectors/homeSelectors";

describe('Home page scope tests', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('homePage_Open', () => {
    homeSelectors.pageTitle.getTitle().should('contain', pageData.title);
    homeSelectors.items.getStartBtn().should('have.text', pageData.btnTitle);
  
  });

});