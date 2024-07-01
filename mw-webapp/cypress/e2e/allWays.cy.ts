import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import allWaysPageContent from "src/dictionary/AllWaysPageContent.json";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {Symbols} from "src/utils/Symbols";
import { userPersonalSelectors } from "cypress/scopesSelectors/userPersonalDataSelectors";

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
    allWaysSelectors.filterViewBlock.getTableViewButton().click();

    allWaysSelectors.allWaysTable.getTableBodyTr()
      .eq(0)
      .within(() => {
        allWaysSelectors.allWaysTable.getTableBodyTd()
          .eq(4)
          .then(() => {
            allWaysSelectors.allWaysTable.getOwnerLink()
              .then((link) => {
                const userName = link.text().trim();
                cy.wrap(link).click();
                cy.wrap(userName).as('actualUserName');    
              });
          });
      });

      cy.url().should('match', /\/user\/[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/);
      cy.get('@actualUserName').then((actualUserName) => {
        userPersonalSelectors.descriptionSection.getName().should('have.text', actualUserName);
      });
  });

});