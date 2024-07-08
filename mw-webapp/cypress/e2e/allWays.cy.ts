import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import allWaysPageContent from "src/dictionary/AllWaysPageContent.json";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {Symbols} from "src/utils/Symbols";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {allWaysAccessIds} from "cypress/accessIds/allWaysAccessIds";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import testWayData from "cypress/fixtures/testWayDataFixture.json";

afterEach(() => {
  cy.clearAllStorage();
});

function getLinkTextAndClick(
  selector: Cypress.Chainable<JQuery<HTMLElement>>, 
  rowIndex: number, 
  tableHeaderIndex: number
): Cypress.Chainable<string> {

  return selector
    .eq(rowIndex)
    .then(link => {
      cy.wrap(link)
        .parents(`[data-cy="${allWaysAccessIds.allWaysTable.tableBodyTd}"]`)
        .invoke('index')
        .should('eq', tableHeaderIndex);

      const linkText = link.text().trim();
      cy.wrap(link).click();
      
      return cy.wrap(linkText);
    });      
}

describe('NoAuth All Ways scope tests', () => {

  beforeEach(() => {
    cy.visit('/');
    headerSelectors.getBurgerMenu().click();
    navigationMenuSelectors.menuItemLinks.getAllWaysItemLink().click();
  });

  it('NoAuth_AllWays_SelectTableView', () => {
    const tableHeadersEn = Object.values(allWaysPageContent.waysTable.columns).map(column => column.en);
    tableHeadersEn.push(Symbols.STAR);

    allWaysSelectors.filterViewBlock.getTableViewButton().click();

    allWaysSelectors.allWaysTable.getTable().should('exist');

    allWaysSelectors.allWaysTable.getTableTh().each((el, index) => {
      cy.wrap(el).contains(tableHeadersEn[index])      
    });
  });

  it('NoAuth_AllWaysTable_LinkToOwner', () => {
    const rowIndex = 0;
    const ownerHeaderIndex = 4;

    allWaysSelectors.filterViewBlock.getTableViewButton().click();

    getLinkTextAndClick(allWaysSelectors.allWaysTable.getOwnerLink(), rowIndex, ownerHeaderIndex)
      .then(userName => {
        cy.url().should('match', new RegExp(testUserData.userUrlPattern));
        userPersonalSelectors.descriptionSection.getName().should('have.text', userName);
    });
  });

  it('NoAuth_AllWaysTable_LinkToWay', () => {
    const rowIndex = 0;
    const descriptionHeaderIndex = 3;

    allWaysSelectors.filterViewBlock.getTableViewButton().click();

    getLinkTextAndClick(allWaysSelectors.allWaysTable.getWayLink(), rowIndex, descriptionHeaderIndex)
      .then(wayTitle => {
        cy.url().should('match', new RegExp(testWayData.wayUrlPattern));
        wayDescriptionSelectors.wayDashBoardLeft.getTitle().should('have.text', wayTitle);
    });
  });

});