import homePageContent from "src/dictionary/HomePageContent.json";
import {homeSelectors} from "cypress/scopesSelectors/homeSelectors";

describe('Home page scope tests', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('NoAuth_Homepage_Open', () => {
    homeSelectors.welcomeBlock.getTitle().should('contain', homePageContent.title.en);
    homeSelectors.welcomeBlock.getStartButton().should('have.text', homePageContent.startForFreeButton.en);
  });

});