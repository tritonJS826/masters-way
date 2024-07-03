import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import allWaysPageContent from "src/dictionary/AllWaysPageContent.json";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {Symbols} from "src/utils/Symbols";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import testUserData from "cypress/fixtures/testUserDataFixture.json";

afterEach(() => {
  cy.clearAllStorage();
});

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
    let actualUserName: string;
    const targetTableHeader = allWaysPageContent.waysTable.columns.owner.en;
    const rowIndex = 0;

    allWaysSelectors.filterViewBlock.getTableViewButton().click();

    cy.verifyAllWaysTableCellContent(targetTableHeader, allWaysSelectors.allWaysTable.getOwnerLink(), rowIndex);

    allWaysSelectors.allWaysTable.getOwnerLink()
      .eq(rowIndex)
      .then (link => {
        actualUserName = link.text().trim();
        cy.wrap(link).click();
      })
      .then(() => {
        cy.url().should('match', new RegExp(testUserData.userUrlPattern));
        userPersonalSelectors.descriptionSection.getName().should('have.text', actualUserName);
      });
  });

});