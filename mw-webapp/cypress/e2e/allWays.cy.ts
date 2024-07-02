import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import allWaysPageContent from "src/dictionary/AllWaysPageContent.json";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {Symbols} from "src/utils/Symbols";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";

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
    let targetTableHeaderIndex: number;
    let linkColumnIndex;
    const targetTableHeader = allWaysPageContent.waysTable.columns.owner.en;

    allWaysSelectors.filterViewBlock.getTableViewButton().click();


    allWaysSelectors.allWaysTable.getTableTh().each((th, index) => {
      const headerText = th.text().trim();
      if (headerText === targetTableHeader) {
        targetTableHeaderIndex = index;
        return false;
      }
    });

    allWaysSelectors.allWaysTable.getOwnerLink()
      .first()
      .then (link => {
        actualUserName = link.text().trim();
        cy.wrap(link).click();

        cy.wrap(link).parents('td').then(td => {
          linkColumnIndex = td.index();
          assert.equal(linkColumnIndex, targetTableHeaderIndex);
        });
      })
      .then(() => {
        cy.url().should('match', /\/user\/[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/);
        userPersonalSelectors.descriptionSection.getName().should('have.text', actualUserName);
      });
  });

});