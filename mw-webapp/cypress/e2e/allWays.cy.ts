import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import allWaysPageData from "cypress/fixtures/allWaysFixture.json";
import allWaysPageContent from "src/dictionary/AllWaysPageContent.json";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";

describe('All Ways scope tests', () => {

  beforeEach(() => {
    cy.visit('/');
    headerSelectors.getBurgerMenu().click();
    navigationMenuSelectors.menuItemLinks.getAllWaysItemLink().click();
  });

  afterEach(() => {
    cy.clearAllStorage();
  });

  it('NoAuth_AllWays_SelectTableView', () => {
    const tableHeadersEn = Object.values(allWaysPageContent.waysTable.columns).map(column => column.en);
    tableHeadersEn.push(allWaysPageData.starSimbol);

    allWaysSelectors.filterViewBlock.getTableViewButton().click();

    allWaysSelectors.allWaysTable.getTable().find('thead tr th div div:first-child').each(($el, index) => {
      cy.wrap($el).invoke('text').then((text) => {
      expect(text.trim()).equal(tableHeadersEn[index]);
      });
    });
  });
});