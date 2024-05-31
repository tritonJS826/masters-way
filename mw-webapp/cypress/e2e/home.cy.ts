import pageData from "src/dictionary/HomePageContent.json"
import {homeSelectors} from "cypress/scopesSelectors/homeSelectors";

describe('Home page scope tests', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('HomePage_Open', () => {
    homeSelectors.welcomeBlock.getTitle().should('contain', pageData.title.en);
    homeSelectors.welcomeBlock.getStartButton().should('have.text', pageData.startForFreeButton.en);
  });

});