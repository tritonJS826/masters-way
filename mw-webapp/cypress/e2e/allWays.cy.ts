import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import allWaysPageContent from "src/dictionary/AllWaysPageContent.json";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {Symbols} from "src/utils/Symbols";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import testWayData from "cypress/fixtures/testWayDataFixture.json";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";

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
    const owners: Record<string, string> = testWayData.owners;

    Object.keys(owners).forEach(expectedOwnerName => {
      allWaysSelectors.filterViewBlock.getTableViewButton().click();

      allWaysSelectors.allWaysTable.getOwnerLinkByName(expectedOwnerName).first().invoke('text').should('eq', expectedOwnerName);

      allWaysSelectors.allWaysTable.getOwnerLinkByName(expectedOwnerName).first().click();

      cy.url().should('include', `${owners[expectedOwnerName]}`);
      userPersonalSelectors.descriptionSection.getName().should('have.text', expectedOwnerName);
          
      cy.go('back');
    });
  });

  it('NoAuth_AllWaysTable_LinkToWay', () => {
    const ways: Record<string, string> = testWayData.ways;

    Object.keys(ways).forEach(expectedWayTitle => {
      allWaysSelectors.filterViewBlock.getTableViewButton().click();

      allWaysSelectors.allWaysTable.getWayLinkByName(expectedWayTitle).first().invoke('text').should('eq', expectedWayTitle);

      allWaysSelectors.allWaysTable.getWayLinkByName(expectedWayTitle).first().click();

      cy.url().should('include', `${ways[expectedWayTitle]}`);
      wayDescriptionSelectors.wayDashBoardLeft.getTitle().should('have.text', expectedWayTitle);
          
      cy.go('back');
    });
  });

  it('NoAuth_AllWaysTable_LinkToMentor', () => {
    const mentors: Record<string, string> = testWayData.mentors;

    Object.keys(mentors).forEach(expectedMentorName => {
      allWaysSelectors.filterViewBlock.getTableViewButton().click();

      allWaysSelectors.allWaysTable.getMentorLinkByName(expectedMentorName).first().invoke('text').should('eq', expectedMentorName);

      allWaysSelectors.allWaysTable.getMentorLinkByName(expectedMentorName).first().click();

      cy.url().should('include', `${mentors[expectedMentorName]}`);
      userPersonalSelectors.descriptionSection.getName().should('have.text', expectedMentorName);
          
      cy.go('back');
    });
  });

});